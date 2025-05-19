import { ref, computed } from "vue";
import type { User, AuthResponse } from "~/utils/types/user";
import { useApi } from "~/composables/api/useApi";

interface LoginCredentials {
    username: string;
    password: string;
    [key: string]: any;
}

export function useAuth() {
    // Get API utility
    const api = useApi();

    // Reactive state for authentication
    const isAuthenticated = useState<boolean>(
        "auth.isAuthenticated",
        () => false
    );
    const user = useState<User | null>("auth.user", () => null);
    const token = useState<string | null>("auth.token", () => null);

    // Helper to access localStorage safely (client-side only)
    const getTokenFromStorage = (): string | null => {
        if (import.meta.client) {
            return localStorage.getItem("accessToken") || null;
        }
        return null;
    };

    const setTokenToStorage = (value: string | null): void => {
        if (import.meta.client) {
            if (value) {
                localStorage.setItem("accessToken", value);
            } else {
                localStorage.removeItem("accessToken");
            }
        }
    };

    // Sync token with localStorage
    token.value = getTokenFromStorage();

    // Login function
    async function login(credentials: LoginCredentials): Promise<void> {
        try {
            const response = await api.post<AuthResponse>(
                "/auth/login",
                credentials
            );

            // Process the auth response
            if (response) {
                token.value = response.accessToken;
                setTokenToStorage(token.value);
                console.log("Login data response: ", response);

                // Extract user data from response
                const userData: User = {
                    id: response.id,
                    username: response.username,
                    email: response.email,
                    firstName: response.firstName,
                    lastName: response.lastName,
                    gender: response.gender,
                    image: response.image,
                };

                user.value = userData;
                isAuthenticated.value = true;
            }
        } catch (err) {
            console.error("Login error:", err);
            throw err;
        }
    }

    // Logout function
    function logout(): void {
        token.value = null;
        setTokenToStorage(null);
        user.value = null;
        isAuthenticated.value = false;
    }

    // Initialize auth state (e.g., on app load)
    async function initializeAuth(): Promise<void> {
        const storedToken = getTokenFromStorage();
        if (storedToken) {
            try {
                // Verify token with the server
                const userData = await api.get<User>("/auth/me");

                if (userData) {
                    token.value = storedToken;
                    user.value = userData;
                    isAuthenticated.value = true;
                }
            } catch (err) {
                console.error("Auth initialization error:", err);
                // logout(); // Clear invalid token
            }
        }
    }

    // Get current authenticated user
    async function getCurrentUser(): Promise<User | null> {
        try {
            const userData = await api.get<User>("/auth/me");
            if (userData) {
                user.value = userData;
                isAuthenticated.value = true;
                console.log("Current user data: ", userData);
                return userData;
            }
            return null;
        } catch (err) {
            console.error("Error fetching current user:", err);
            return null;
        }
    }

    return {
        isAuthenticated,
        user,
        token: computed(() => token.value), // Read-only token
        login,
        logout,
        initializeAuth,
        getCurrentUser,
    };
}
