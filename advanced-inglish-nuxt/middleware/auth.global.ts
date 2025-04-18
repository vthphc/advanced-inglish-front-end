import { useAuth } from "~/composables/auth/useAuth";
export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuthenticated } = useAuth();

  if (
    !isAuthenticated.value &&
    to.path !== "/login" &&
    to.path !== "/register" &&
    to.path !== "/"
  ) {
    return navigateTo("/login");
  }
});
