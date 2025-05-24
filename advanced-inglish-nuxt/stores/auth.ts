import { defineStore } from "pinia";
import type { User, LoginResponse, AuthResponse } from "~/utils/types/user";
import { useApi } from "~/composables/api/useApi";

interface LoginCredentials {
	email: string;
	password: string;
	[key: string]: string;
}

interface RegisterData {
	name: string;
	email: string;
	password: string;
	dob: string;
	gender: string;
}

export const useAuthStore = defineStore("auth", {
	// Equivalent to the useState variables in the composable
	state: () => ({
		user: null as User | null,
		token: null as string | null,
		isAuthenticated: false,
		message: null as string | null,
	}),

	getters: {
		// Optional: Getter for read-only access if needed elsewhere
		getToken: (state) => state.token,
		getUser: (state) => state.user,
		getIsAuthenticated: (state) => state.isAuthenticated,
		getMessage: (state) => state.message,
	},

	actions: {
		// --- Helper Functions (Internal) ---
		_getTokenFromStorage(): string | null {
			if (import.meta.client) {
				return (
					localStorage.getItem("accessToken") ||
					null
				);
			}
			return null;
		},

		_setTokenToStorage(value: string | null): void {
			if (import.meta.client) {
				if (value) {
					localStorage.setItem(
						"accessToken",
						value
					);
				} else {
					localStorage.removeItem("accessToken");
				}
			}
		},

		// --- Core Actions ---
		async login(credentials: LoginCredentials): Promise<void> {
			try {
				const api = useApi(); // Get API instance inside the action
				const response = await api.post<LoginResponse>(
					"/auth/login",
					credentials
				);

				if (response) {
					// Check if account is unverified
					if (response.isVerified === false) {
						this.message = response.message;
						// Store userId for potential redirect to verification
						if (response.userId) {
							if (
								import.meta
									.client
							) {
								localStorage.setItem(
									"pendingUserId",
									response.userId
								);
							}
						}
						// Don't set authenticated for unverified users
						this.isAuthenticated = false;
						throw new Error(
							response.message ||
								"Account not verified. Please check your email."
						);
					}
					if (response.accessToken) {
						this.token =
							response.accessToken;
						this._setTokenToStorage(
							this.token
						);

						// Fetch complete user data after getting the token
						await this.getCurrentUser();
					} else if (response.user) {
						// If no token but user data is provided, use that
						this.user = response.user;
					}

					this.message = response.message;
					this.isAuthenticated = true;

					// Optionally store refresh token if your API provides it
					if (response.refreshToken) {
						if (import.meta.client) {
							localStorage.setItem(
								"refreshToken",
								response.refreshToken
							);
						}
					}
				}
			} catch (err) {
				console.error("Login error:", err);
				// Reset state on error? Or let the caller handle it?
				// this.logout(); // Uncomment if you want to auto-logout on login failure
				throw err; // Re-throw error for the component to handle
			}
		},

		async register(userData: RegisterData): Promise<void> {
			try {
				const api = useApi();
				const response = await api.post<LoginResponse>(
					"/auth/register",
					userData
				);

				if (response) {
					// // Registration response doesn't include tokens, just store the user data and message
					// if (response.user) {
					// 	this.user = response.user;
					// }
					// this.message = response.message;
					// User is not authenticated yet, they need to login separately
					this.isAuthenticated = false;
					this.token = null;
				}
			} catch (err) {
				console.error("Registration error:", err);
				throw err; // Re-throw for component handling
			}
		},

		logout(): void {
			this.token = null;
			this._setTokenToStorage(null);
			this.user = null;
			this.isAuthenticated = false;
			this.message = null;

			// Remove refresh token if stored
			if (import.meta.client) {
				localStorage.removeItem("refreshToken");
			}
			// Potentially redirect here or let the component handle redirection
			navigateTo("/login");
		},

		async getCurrentUser(): Promise<User | null> {
			try {
				// Get token from storage
				const token = this._getTokenFromStorage();

				if (!token) {
					return null; // No token available, return null
				}

				const api = useApi();
				// Fetch current user data
				const userData = await api.get<AuthResponse>(
					"/auth/me"
				);

				if (userData) {
					console.log(
						"Current user data fetched successfully:",
						userData
					);
					// Update store state
					this.user = userData.user || null;
					this.isAuthenticated = true;
					return userData.user || null;
				}

				return null;
			} catch (err) {
				console.error(
					"Error fetching current user:",
					err
				);
				this.isAuthenticated = false;
				return null;
			}
		},

		async initializeAuth(): Promise<void> {
			// Sync token from storage first
			this.token = this._getTokenFromStorage();

			if (this.token) {
				try {
					const api = useApi();
					// Verify token by fetching user data
					const userData = await api.get<AuthResponse>(
						"/auth/me"
					);

					if (userData) {
						console.log(
							"Auth initialized with user data:",
							userData.user
						);
						this.user = userData.user || null;
						this.isAuthenticated = true;
					} else {
						// Token might be valid but user fetch failed? Or token invalid?
						this.logout(); // Logout if user data can't be fetched
					}
				} catch (err) {
					console.error(
						"Auth initialization error:",
						err
					);
					// Assume token is invalid if /auth/me fails
					// this.logout();
				}
			} else {
				// Ensure state is clean if no token found
				this.logout();
			}
		},
	},

	// Optional: Enable persistence using pinia-plugin-persistedstate
	// You'll need to install and configure the plugin first
	// persist: true,
	// OR more granular control:
	/*
  persist: {
    storage: persistedState.localStorage, // or sessionStorage
    paths: ['token', 'user', 'isAuthenticated'], // Specify which state parts to persist
  }
  */
});

// --- Usage Example in a Plugin (for auto-initialization) ---
/*
// plugins/auth-init.client.ts
import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin(async (nuxtApp) => {
  if (process.client) {
    const authStore = useAuthStore();
    // Initialize auth state when the app loads on the client
    await authStore.initializeAuth();
  }
});
*/

// --- Usage Example in a Component ---
/*
<script setup lang="ts">
import { useAuthStore } from '~/stores/auth';

const authStore = useAuthStore();

// Access state: authStore.isAuthenticated, authStore.user, authStore.token
// Call actions: authStore.login(...), authStore.logout(), etc.

// Example login call
async function handleLogin() {
  try {
    await authStore.login({ username: 'test', password: 'password' });
    // Redirect or show success message
  } catch (error) {
    // Show error message
  }
}
</script>
*/
