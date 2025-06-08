import { useAuthStore } from "~/stores/auth"; // Import the Pinia store
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware((to) => {
    // Only run middleware on client-side
    if (import.meta.server) return;

    // Get the auth store instance inside the middleware
    const authStore = useAuthStore();
    const { isAuthenticated } = storeToRefs(authStore);

    // Define public routes that don't require authentication
    const publicRoutes = ["/", "/login", "/register"];

    // Check if the current route is exactly matching any public route or starts with verify-email
    const isPublicRoute =
        publicRoutes.some((route) => to.path === route) ||
        to.path.startsWith("/verify-email");

    // If the route is not public and user is not authenticated, redirect to login
    if (!isPublicRoute && !isAuthenticated.value) {
        return navigateTo({
            path: "/login",
            query: { redirect: to.fullPath },
        });
    }

    // If user is authenticated and tries to access login/register, redirect to home
    if (
        (to.path === "/login" || to.path === "/register") &&
        isAuthenticated.value
    ) {
        return navigateTo("/");
    }
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
