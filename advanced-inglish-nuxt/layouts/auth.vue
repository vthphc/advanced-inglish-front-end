<script setup lang="ts">
import { House } from "lucide-vue-next";
import Button from "~/components/ui/buttons/Button.vue";

const route = useRoute();
const isRegisterPage = computed(() => route.path === "/register");
</script>

<template>
    <div class="flex flex-col justify-center items-center min-h-screen">
        <Button to="/" class="absolute top-0 left-0 m-8">
            <House />
        </Button>
        <Button
            v-if="isRegisterPage"
            to="/login"
            class="absolute top-0 right-0 m-8"
        >
            Login
        </Button>
        <Button v-else to="/register" class="absolute top-0 right-0 m-8">
            Register
        </Button>
        <slot />
    </div>
</template>
