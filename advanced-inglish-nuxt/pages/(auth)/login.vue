<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
// Import the store directly
import { useAuthStore } from "~/stores/auth";
import { storeToRefs } from "pinia"; // Keep storeToRefs if you need reactive refs elsewhere

// Get authentication store and actions
const authStore = useAuthStore();
// You can get actions directly: const { login: storeLogin } = authStore;
// Or call them via authStore.login

// Use storeToRefs ONLY if you need reactive refs to state/getters in THIS component's template/computed props
// For just calling actions and checking state after await, direct access is fine.
const { isAuthenticated } = storeToRefs(authStore); // Keep if needed for template reactivity

const loading = ref(false);
const error = ref<string | null>(null);
const router = useRouter();
const route = useRoute(); // Import useRoute to get query params

definePageMeta({
    title: "Inglish - Login",
    layout: "auth",
});

useHead({
    title: "Login", // Updates reactively
});

const schema = z.object({
    email: z.string(), //.email("Invalid email"),
    password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const formState = reactive<Partial<Schema>>({
    email: undefined,
    password: undefined,
});

const toast = useToast();
async function onSubmit(event: FormSubmitEvent<Schema>) {
    loading.value = true;
    error.value = null;
    // console.log("Form values:", formState.email);

    try {
        // Basic validation (Zod handles more complex cases via UForm)
        if (!formState.email || !formState.password) {
            error.value = "Email and password are required.";
            loading.value = false; // Stop loading on basic validation failure
            return;
        }

        // Call the login action from the Pinia store
        await authStore.login({
            email: formState.email, // The API expects username
            password: formState.password,
        });

        // If await authStore.login completes without throwing, assume success
        toast.add({
            title: "Success",
            description: "You have successfully logged in.",
            // Removed color: 'success' as it might not be a valid UToast option, check docs
        });

        // Redirect logic: Check for redirect query param or default to '/'
        const redirectPath = (route.query.redirect as string) || "/";
        // Use replace: true if you don't want the login page in the history
        await router.push(redirectPath);
    } catch (err: any) {
        // Use the error message from the store action if available, or a generic one
        error.value =
            err?.message ||
            "Failed to login. Please check credentials or try again.";
        console.error("Login Submit Error:", err);

        toast.add({
            title: "Login Error",
            description: error.value || undefined,
            color: "error", // Use Nuxt UI color names
        });
    } finally {
        loading.value = false;
    }
}
</script>

<!-- Template remains the same -->
<template>
    <UForm
        :schema="schema"
        :state="formState"
        class="space-y-4 *:my-2 flex flex-col"
        @submit="onSubmit"
    >
        <UFormField label="Email" name="email" required>
            <UInput v-model="formState.email" size="xl" color="highlight" />
        </UFormField>

        <UFormField label="Password" name="password" required>
            <UInput
                v-model="formState.password"
                size="xl"
                color="highlight"
                type="password"
            />
        </UFormField>

        <UButton
            class="cursor-pointer w-full justify-center text-center py-2 px-4 bg-primary text-white hover:bg-white hover:text-primary border-2 hover:border-primary rounded-2xl mt-8"
            type="submit"
            :loading="loading"
            block
            size="xl"
        >
            Đăng nhập
        </UButton>

        <UAlert
            v-if="error"
            icon="i-heroicons-exclamation-triangle"
            color="error"
            variant="soft"
            :title="error"
            :close-button="{
                icon: 'i-heroicons-x-mark-20-solid',
                color: 'red',
                variant: 'link',
                padded: false,
            }"
            @close="error = null"
            class="mt-4"
        />

        <USeparator size="md" label="Hoặc đăng nhập qua" />

        <div>
            <button
                class="cursor-pointer flex w-full items-center justify-center gap-3 rounded-2xl bg-white hover:bg-gray-100 border-gray-300 hover:border-gray-300 border-2 py-2 px-4 text-sm font-semibold leading-6 text-gray-900 transition-all duration-300"
                type="button"
            >
                <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                    <!-- SVG content remains the same -->
                    <path
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        fill="#4285F4"
                    />
                    <path
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        fill="#34A853"
                    />
                    <path
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        fill="#FBBC05"
                    />
                    <path
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        fill="#EA4335"
                    />
                    <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                Google
            </button>
        </div>
    </UForm>
</template>
