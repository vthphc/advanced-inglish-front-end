import { useAuthStore } from "~/stores/auth"; // Import the Pinia store

export default defineNuxtRouteMiddleware((to) => {
    // Get the auth store instance inside the middleware
    // Note: Pinia stores are singletons, so this gets the existing instance
    const authStore = useAuthStore();

    // Check if route requires authentication using the store's state
    if (to.meta.requiresAuth && !authStore.isAuthenticated) {
        // Store original destination for redirect after login
        return navigateTo({
            path: "/login",
            query: { redirect: to.fullPath },
        });
    }

    // Optional: Add logic for authenticated users trying to access guest-only pages (like login/register)
    // if (to.meta.guestOnly && authStore.isAuthenticated) {
    //   return navigateTo('/'); // Redirect to home or dashboard
    // }
});

//Note: This middleware checks if the route requires authentication and if the user is authenticated via the Pinia store. If not, it redirects to the login page and stores the original destination in the query parameters for redirection after successful login.
/*How to implement: Go to pages that need protection and add the following code to the top of the script section:
 <script setup>
definePageMeta({
  requiresAuth: true
})
</script>*/

/* Optional: For guest-only pages (e.g., login, register):
 <script setup>
definePageMeta({
  guestOnly: true
})
</script>*/

//Old implementation of middleware
// import { useAuth } from "~/composables/auth/useAuth";

// export default defineNuxtRouteMiddleware((to) => {
//   const { isAuthenticated } = useAuth();

//   // Check if route requires authentication
//   if (to.meta.requiresAuth && !isAuthenticated.value) {
//     // Store original destination for redirect after login
//     return navigateTo({
//       path: "/login",
//       query: { redirect: to.fullPath },
//     });
//   }
// });
