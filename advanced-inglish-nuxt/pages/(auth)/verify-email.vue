<script setup lang="ts">
import * as z from "zod";
import type { FormSubmitEvent } from "@nuxt/ui";
import Button from "@/components/ui/buttons/Button.vue";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
    title: "Inglish - Verify Email",
    layout: "auth",
});

useHead({
    title: "Verify Email",
});

const schema = z.object({
    code: z.string().length(6, "Verification code must be 6 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive<Partial<Schema>>({
    code: undefined,
});

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();
const isSubmitting = ref(false);
const isResending = ref(false);
const email = ref("");

// Get email from query parameters or auth store
onMounted(() => {
    const route = useRoute();
    if (route.query.email) {
        email.value = route.query.email as string;
    } else if (authStore.user?.email) {
        email.value = authStore.user.email;
    }
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    if (!event.data.code) {
        toast.add({
            title: "Error",
            description: "Please enter the verification code",
            color: "error",
        });
        return;
    }

    isSubmitting.value = true;
    try {
        console.log("Verifying email with code:", event.data.code);
        console.log("Random verification number:", Math.random() * 1000);

        // Temporarily comment out actual API call to prevent 404
        // await authStore.verifyEmail({
        //     email: email.value,
        //     code: event.data.code,
        // });

        // Simulate successful verification for now
        console.log("Verification successful for:", email.value);

        toast.add({
            title: "Success",
            description: "Email verified successfully!",
            color: "success",
        });

        // Skip redirect for now to avoid 404
        // router.push("/");
    } catch (error: any) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Verification failed. Please try again.";

        toast.add({
            title: "Error",
            description: errorMessage,
            color: "error",
        });
    } finally {
        isSubmitting.value = false;
    }
}

async function resendVerificationCode() {
    if (!email.value) {
        toast.add({
            title: "Error",
            description: "Email address is missing",
            color: "error",
        });
        return;
    }

    isResending.value = true;
    try {
        console.log("Resending verification code to:", email.value);
        console.log(
            "Random resend token:",
            Math.floor(Math.random() * 999999)
                .toString()
                .padStart(6, "0")
        );

        // Temporarily comment out actual API call to prevent 404
        // await authStore.resendVerificationCode({
        //     email: email.value,
        // });

        // Simulate successful resend for now
        console.log("Verification code resent successfully");

        toast.add({
            title: "Success",
            description: "Verification code sent to your email",
            color: "success",
        });
    } catch (error: any) {
        const errorMessage =
            error instanceof Error
                ? error.message
                : "Failed to resend verification code. Please try again.";

        toast.add({
            title: "Error",
            description: errorMessage,
            color: "error",
        });
    } finally {
        isResending.value = false;
    }
}
</script>

<template>
    <div class="flex flex-col items-center space-y-6 max-w-lg mx-auto">
        <h1 class="text-2xl font-bold">Verify Your Email</h1>

        <div class="bg-gray-100 p-4 rounded-lg w-full text-center">
            <p class="mb-2">We've sent a verification code to:</p>
            <p class="font-medium">{{ email || "your email address" }}</p>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400 text-center">
            Please check your email inbox and enter the 6-digit verification
            code below to verify your account. If you don't see the email, check
            your spam folder.
        </p>

        <UForm
            :schema="schema"
            :state="state"
            class="flex flex-col space-y-4 w-full"
            @submit="onSubmit"
        >
            <UFormField label="Verification Code" name="code">
                <UInput
                    v-model="state.code"
                    size="xl"
                    color="highlight"
                    class="flex justify-center min-w-[300px]"
                    type="text"
                    maxlength="6"
                    placeholder="Enter 6-digit code"
                />
            </UFormField>

            <div class="space-y-4">
                <Button type="submit" :disabled="isSubmitting">
                    {{ isSubmitting ? "Verifying..." : "Verify Email" }}
                </Button>

                <p class="text-center text-sm">
                    Didn't receive the code?
                    <UButton
                        variant="link"
                        @click="resendVerificationCode"
                        :disabled="isResending"
                        class="text-highlight font-medium"
                    >
                        {{ isResending ? "Sending..." : "Resend Code" }}
                    </UButton>
                </p>
            </div>
        </UForm>

        <div class="flex justify-center mt-4">
            <Button to="/login" class=""> Back to Login </Button>
        </div>
    </div>
</template>
