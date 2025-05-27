<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { useApi } from "~/composables/api/useApi";
import type { Dialogue } from "~/utils/types/dialogue";
import DialogueItem from "~/components/dialogues/DialogueItem.vue";
import { Plus } from "lucide-vue-next";
import { Button } from "~/components/ui/buttons";
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
import LoadingSpinner from "~/components/LoadingSpinner.vue";

const authStore = useAuthStore();
const api = useApi();
const toast = useToast();

// State for dialogues
const dialogues = ref<Dialogue[]>([]);
const isLoading = ref(true);
const isSubmitting = ref(false);
const error = ref<string | null>(null);

const formSchema = z.object({
    topic: z
        .string()
        .min(1, "Chủ đề là bắt buộc")
        .min(3, "Chủ đề phải có ít nhất 3 ký tự"),
    context: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

const formState = reactive<FormData>({
    topic: "",
    context: "",
});

// Fetch dialogues for the current user
const fetchDialogues = async () => {
    try {
        isLoading.value = true;
        error.value = null;

        if (!authStore.user?._id) {
            throw new Error("User not authenticated");
        }
        console.log(authStore.user._id);
        const response = await api.get<Dialogue[]>(
            `/dialogues/user/${authStore.user._id}`
        );
        console.log("API Response:", response);
        dialogues.value = response;
    } catch (err) {
        console.error("Error fetching dialogues:", err);
        error.value =
            "Không thể tải danh sách đối thoại. Vui lòng thử lại sau.";
    } finally {
        isLoading.value = false;
    }
};

// Fetch dialogues when component mounts
onMounted(() => {
    fetchDialogues();
});

async function onSubmit(event: FormSubmitEvent<FormData>) {
    try {
        isSubmitting.value = true;
        if (!authStore.user?._id) {
            throw new Error("User not authenticated");
        }

        const response = await api.post("/dialogues/generate/", {
            ...formState,
            userId: authStore.user._id,
        });

        // Show success toast
        toast.add({
            title: "Thành công",
            description: "Đã tạo đối thoại thành công!",
            color: "success",
        });

        // Close the dialog and refresh the dialogues list
        const dialog = document.querySelector('[role="dialog"]');
        if (dialog) {
            dialog.remove();
        }
        await fetchDialogues();
    } catch (err) {
        console.error("Error creating dialogue:", err);
        // TODO: Add error handling UI feedback
    } finally {
        isSubmitting.value = false;
    }
}

// Add this function in the script section, after fetchDialogues
const handleDialogueDeleted = (id: string) => {
    dialogues.value = dialogues.value.filter((dialogue) => dialogue._id !== id);
};
</script>

<template>
    <div class="">
        <h1
            class="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-300 pb-3 text-primary"
        >
            Đối Thoại Của Tôi
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
        <div v-else-if="!dialogues.length" class="text-center py-8">
            <p class="text-gray-500">
                Chưa có đối thoại nào. Hãy bắt đầu tạo một số đối thoại!
            </p>
        </div>

        <!-- Dialogues list -->
        <div
            v-else
            class="bg-white shadow-md overflow-hidden sm:rounded-lg p-4"
        >
            <ul
                role="list"
                class="divide-y gap-y-4 space-y-4 md:space-y-0 divide-gray-200 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-4"
            >
                <DialogueItem
                    v-for="dialogue in dialogues"
                    :key="dialogue._id"
                    :dialogue="dialogue"
                    @deleted="handleDialogueDeleted"
                />
            </ul>
        </div>
        <Dialog>
            <DialogTrigger>
                <Button
                    class="cursor-pointer fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center"
                    aria-label="Thêm đối thoại mới"
                >
                    <Plus class="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tạo Đối Thoại Mới</DialogTitle>
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

                        <UFormField label="Ngữ cảnh (Tùy chọn)" name="context">
                            <UTextarea
                                class="w-full"
                                v-model="formState.context"
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
                        Tạo một đối thoại mới để bắt đầu luyện tập tiếng Anh của
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
