<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useApi } from "~/composables/api/useApi";

const route = useRoute();
const api = useApi();
const isLoading = ref(true);
const message = ref("...Loading");

definePageMeta({ title: "Inglish", layout: "auth" });

onMounted(async () => {
    try {
        const id = route.params.id as string;
        console.log("Starting email verification for ID:", id);

        if (!id) {
            throw new Error("No verification ID provided");
        }

        const response = await api.put(`/auth/verify-email/${id}`, {});
        console.log("Verification response:", response);

        message.value = "Successfully verified, now you can login!";
    } catch (error) {
        console.error("Email verification error:", error);
        message.value =
            error instanceof Error
                ? `Failed to verify email: ${error.message}`
                : "Failed to verify email. Please try again or contact support.";
    } finally {
        isLoading.value = false;
    }
});
</script>

<template>
    <div class="">
        <h1>Verify Email</h1>
        <p>{{ message }}</p>
    </div>
</template>
