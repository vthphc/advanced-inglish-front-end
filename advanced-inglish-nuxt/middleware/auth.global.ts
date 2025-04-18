import { useAuth } from "~/composables/auth/useAuth";

export default defineNuxtRouteMiddleware((to) => {
  const { isAuthenticated } = useAuth();

  // Check if route requires authentication
  if (to.meta.requiresAuth && !isAuthenticated.value) {
    // Store original destination for redirect after login
    return navigateTo({
      path: "/login",
      query: { redirect: to.fullPath },
    });
  }
});

//Note: This middleware checks if the route requires authentication and if the user is authenticated. If not, it redirects to the login page and stores the original destination in the query parameters for redirection after successful login.
/*How to implement: Go to pages that need protection and add the following code to the top of the script section:
 <script setup>
definePageMeta({
  requiresAuth: true
})
</script>*/
