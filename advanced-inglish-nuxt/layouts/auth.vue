<script setup lang="ts">
import { House } from "lucide-vue-next";
import Button from "~/components/ui/buttons/Button.vue";

const route = useRoute();
const isRegisterPage = computed(() => route.path === "/register");
</script>

<template>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <NuxtLink to="/">
            <Button class="absolute top-0 left-0 m-8">
                <House />
            </Button>
        </NuxtLink>
        <NuxtLink v-if="isRegisterPage" to="/login">
            <Button class="absolute top-0 right-0 m-8"> Đăng nhập </Button>
        </NuxtLink>
        <NuxtLink v-else to="/register">
            <Button class="absolute top-0 right-0 m-8"> Đăng ký </Button>
        </NuxtLink>
        <slot />
    </div>
</template>
