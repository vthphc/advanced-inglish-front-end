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
        .min(1, "Chủ đề là bắt buộc")
        .min(2, "Chủ đề phải có ít nhất 2 ký tự"),
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
        error.value = "Không thể tải danh sách thẻ học. Vui lòng thử lại sau.";
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
            title: "Thành công",
            description: "Đã tạo thẻ học thành công!",
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
            title: "Lỗi",
            description: "Không thể tạo thẻ học. Vui lòng thử lại.",
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
                Thẻ Học Của Tôi
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
                    Chưa có thẻ học nào. Hãy bắt đầu tạo một số thẻ học!
                </p>
            </div>

            <!-- Flashcards list -->
            <div
                v-else
                class="bg-white shadow-md overflow-hidden sm:rounded-lg p-4"
            >
                <ul
                    role="list"
                    class="divide-y gap-y-4 space-y-4 md:space-y-0 divide-gray-200 md:grid md:grid-cols-4 md:gap-x-4"
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
                    aria-label="Thêm thẻ học mới"
                >
                    <Plus class="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tạo Thẻ Học Mới</DialogTitle>
                    <UForm
                        :schema="formSchema"
                        :state="formState"
                        class="space-y-4 w-full"
                        @submit="onSubmit"
                    >
                        <UFormField label="Chủ đề" name="topic" required>
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
                            Tạo
                        </UButton>
                    </UForm>
                    <DialogDescription>
                        Tạo một thẻ học mới để bắt đầu luyện tập tiếng Anh của
                        bạn.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
</template>
