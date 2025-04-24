import { defineStore } from "pinia";
import type { User, AuthResponse } from "~/utils/types/user";
import { useApi } from "~/composables/api/useApi";

interface LoginCredentials {
    username: string;
    password: string;
    [key: string]: any;
}

export const useAuthStore = defineStore("auth", {
    // Equivalent to the useState variables in the composable
    state: () => ({
        user: null as User | null,
        token: null as string | null,
        isAuthenticated: false,
    }),

    getters: {
        // Optional: Getter for read-only access if needed elsewhere
        getToken: (state) => state.token,
        getUser: (state) => state.user,
        getIsAuthenticated: (state) => state.isAuthenticated,
    },

    actions: {
        // --- Helper Functions (Internal) ---
        _getTokenFromStorage(): string | null {
            if (import.meta.client) {
                return localStorage.getItem("accessToken") || null;
            }
            return null;
        },

        _setTokenToStorage(value: string | null): void {
            if (import.meta.client) {
                if (value) {
                    localStorage.setItem("accessToken", value);
                } else {
                    localStorage.removeItem("accessToken");
                }
            }
        },

        // --- Core Actions ---
        async login(credentials: LoginCredentials): Promise<void> {
            try {
                const api = useApi(); // Get API instance inside the action
                const response = await api.post<AuthResponse>(
                    "/auth/login",
                    credentials
                );

                if (response) {
                    this.token = response.accessToken;
                    this._setTokenToStorage(this.token);

                    // Extract user data from response
                    this.user = {
                        id: response.id,
                        username: response.username,
                        email: response.email,
                        firstName: response.firstName,
                        lastName: response.lastName,
                        gender: response.gender,
                        image: response.image,
                    };

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

        logout(): void {
            this.token = null;
            this._setTokenToStorage(null);
            this.user = null;
            this.isAuthenticated = false;

            // Remove refresh token if stored
            if (import.meta.client) {
                localStorage.removeItem("refreshToken");
            }
            // Potentially redirect here or let the component handle redirection
            navigateTo("/login");
        },

        async initializeAuth(): Promise<void> {
            // Sync token from storage first
            this.token = this._getTokenFromStorage();

            if (this.token) {
                try {
                    const api = useApi();
                    // Verify token by fetching user data
                    const userData = await api.get<User>("/auth/me");

                    if (userData) {
                        this.user = userData;
                        this.isAuthenticated = true;
                    } else {
                        // Token might be valid but user fetch failed? Or token invalid?
                        this.logout(); // Logout if user data can't be fetched
                    }
                } catch (err) {
                    console.error("Auth initialization error:", err);
                    // Assume token is invalid if /auth/me fails
                    this.logout();
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
