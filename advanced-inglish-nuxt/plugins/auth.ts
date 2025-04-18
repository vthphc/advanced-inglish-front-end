import { useAuth } from "@/composables/auth/useAuth";
export default defineNuxtPlugin(async (nuxtApp) => {
  const { initializeAuth } = useAuth();
  await initializeAuth();
});
