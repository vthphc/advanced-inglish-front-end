<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useApi } from "~/composables/api/useApi";
import type { Flashcard } from "~/utils/types/flashcard";
import FlashcardItem from "~/components/flashcards/listing/FlashcardItem.vue";
import { Plus } from "lucide-vue-next";
import { Button } from "~/components/ui/buttons";
import LoadingSpinner from "~/components/LoadingSpinner.vue";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "~/components/ui/dialog";
import { z } from "zod";
import { reactive } from "vue";
import type { FormSubmitEvent } from "@nuxt/ui";
import { UForm, UFormField, UInput, UTextarea, UButton } from "#components";

const authStore = useAuthStore();
const api = useApi();
const toast = useToast();

// State for flashcards
const flashcards = ref<Flashcard[]>([]);
const isLoading = ref(true);
const isSubmitting = ref(false);
const error = ref<string | null>(null);

const formSchema = z.object({
    topic: z
        .string()
        .min(1, "Topic is required")
        .min(2, "Topic must be at least 2 characters"),
});

type FormData = z.infer<typeof formSchema>;

const formState = reactive<FormData>({
    topic: "",
});

// Fetch flashcards for the current user
const fetchFlashcards = async () => {
    try {
        isLoading.value = true;
        error.value = null;

        if (!authStore.user?._id) {
            throw new Error("User not authenticated");
        }
        const response = await api.get<Flashcard[]>(
            `/flashcards/user/${authStore.user._id}`
        );
        console.log("API Response:", response);
        flashcards.value = response;
    } catch (err) {
        console.error("Error fetching flashcards:", err);
        error.value = "Failed to load flashcards. Please try again later.";
    } finally {
        isLoading.value = false;
    }
};

// Fetch flashcards when component mounts
onMounted(() => {
    fetchFlashcards();
});

// Add this function to handle flashcard deletion
const handleFlashcardDeleted = (id: string) => {
    flashcards.value = flashcards.value.filter(
        (flashcard) => flashcard._id !== id
    );
};

async function onSubmit(event: FormSubmitEvent<FormData>) {
    try {
        isSubmitting.value = true;
        if (!authStore.user?._id) {
            throw new Error("User not authenticated");
        }

        console.log("Form's topic: ", formState.topic);

        const response = await api.post("/flashcards/generate", {
            topic: formState.topic,
            userId: authStore.user._id,
        });

        // Show success toast
        toast.add({
            title: "Success",
            description: "Flashcard created successfully!",
            color: "success",
        });

        // Close the dialog and refresh the flashcards list
        const dialog = document.querySelector('[role="dialog"]');
        if (dialog) {
            dialog.remove();
        }
        await fetchFlashcards();
    } catch (err) {
        console.error("Error creating flashcard:", err);
        toast.add({
            title: "Error",
            description: "Failed to create flashcard. Please try again.",
            color: "error",
        });
    } finally {
        isSubmitting.value = false;
    }
}
</script>

<template>
    <div class="relative min-h-screen">
        <div class="">
            <h1
                class="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-300 pb-3 text-primary"
            >
                My Flashcards
            </h1>

            <!-- Loading state -->
            <div v-if="isLoading" class="flex justify-center items-center py-8">
                <LoadingSpinner />
            </div>

            <!-- Error state -->
            <div
                v-else-if="error"
                class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
                role="alert"
            >
                <span class="block sm:inline">{{ error }}</span>
            </div>

            <!-- Empty state -->
            <div v-else-if="!flashcards.length" class="text-center py-8">
                <p class="text-gray-500">
                    No flashcards found. Start creating some!
                </p>
            </div>

            <!-- Flashcards list -->
            <div
                v-else
                class="bg-white shadow-md overflow-hidden sm:rounded-lg p-4"
            >
                <ul
                    role="list"
                    class="divide-y gap-y-4 divide-gray-200 md:grid md:grid-cols-4 md:gap-x-4"
                >
                    <FlashcardItem
                        v-for="flashcard in flashcards"
                        :key="flashcard._id"
                        :flashcard="flashcard"
                        @deleted="handleFlashcardDeleted"
                    />
                </ul>
            </div>
        </div>

        <!-- Floating Action Button -->
        <Dialog>
            <DialogTrigger>
                <Button
                    class="cursor-pointer fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center"
                    aria-label="Add new flashcard"
                >
                    <Plus class="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create New Flashcard</DialogTitle>
                    <UForm
                        :schema="formSchema"
                        :state="formState"
                        class="space-y-4 w-full"
                        @submit="onSubmit"
                    >
                        <UFormField label="Topic" name="topic" required>
                            <UInput
                                class="w-full"
                                v-model="formState.topic"
                                size="lg"
                            />
                        </UFormField>

                        <UButton
                            class="cursor-pointer w-full justify-center text-center py-2 px-4 bg-primary text-white hover:bg-white hover:text-primary border-2 hover:border-primary rounded-2xl mt-8"
                            type="submit"
                            :loading="isSubmitting"
                            block
                            size="xl"
                        >
                            Create
                        </UButton>
                    </UForm>
                    <DialogDescription>
                        Create a new flashcard to start practicing your English.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
