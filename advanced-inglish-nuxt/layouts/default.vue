<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia";

const authStore = useAuthStore();
const { isAuthenticated } = storeToRefs(authStore); // Use storeToRefs for reactivity
</script>

<template>
    <div v-if="isAuthenticated" class="">
        <h1>Default Layout</h1>
        <slot />
    </div>
    <div v-else class="">
        <slot />
    </div>
</template>
