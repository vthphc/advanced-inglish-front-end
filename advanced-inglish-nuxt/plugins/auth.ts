// import { useAuth } from "@/composables/auth/useAuth";
// export default defineNuxtPlugin(async (nuxtApp) => {
//     const { initializeAuth } = useAuth();
//     await initializeAuth();
// });

import { useAuthStore } from "~/stores/auth";

export default defineNuxtPlugin(async (nuxtApp) => {
	if (import.meta.client) {
		const authStore = useAuthStore();
		// Initialize auth state when the app loads on the client
		await authStore.initializeAuth();
	}
});
