<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";
import Navbar from "~/components/navbar/Navbar.vue";

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore); // Use storeToRefs for reactivity
</script>

<template>
    <div v-if="isAuthenticated">
        <Navbar />
        <div class="container p-4 md:p-6 lg:p-8 mx-auto">
            <slot />
        </div>
    </div>
    <div v-else class="">
        <slot />
    </div>
</template>

<style scoped>
.container {
    max-width: 1100px;
}
</style>
