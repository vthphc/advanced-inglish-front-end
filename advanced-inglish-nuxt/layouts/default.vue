<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
import Navbar from "~/components/navbar/Navbar.vue";
import Footer from "~/components/footer/Footer.vue";
const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
</script>

<template>
    <div v-if="!isAuthenticated">
        <NuxtLayout name="loading" />
    </div>
    <div v-else>
        <Navbar />
        <div class="container min-h-screen p-4 md:p-6 lg:p-8 mx-auto mb-8">
            <slot />
        </div>
        <Footer />
    </div>
</template>

<style scoped>
.container {
    max-width: 1000px;
}
</style>
