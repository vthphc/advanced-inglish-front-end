<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

// Handle logout on page load
onMounted(() => {
    authStore.logout();
});
</script>

<template>
    <div class="flex items-center justify-center min-h-screen">
        <p class="text-lg">Đang đăng xuất...</p>
    </div>
</template>
