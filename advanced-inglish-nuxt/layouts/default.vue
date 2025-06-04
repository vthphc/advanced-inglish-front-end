<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
import Navbar from "~/components/navbar/Navbar.vue";

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore);
</script>

<template>
    <div v-if="!isAuthenticated">
        <NuxtLayout name="loading" />
    </div>
    <div v-else>
        <Navbar />
        <div class="container p-4 md:p-6 lg:p-8 mx-auto">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 1000px;
}
</style>
