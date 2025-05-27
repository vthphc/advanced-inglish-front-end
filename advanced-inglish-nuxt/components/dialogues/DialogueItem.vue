<script setup lang="ts">
import type { PropType } from "vue";
import type { Dialogue } from "~/utils/types/dialogue";
import DialogueInfo from "./DialogueInfo.vue";
import { Trash2 } from "lucide-vue-next";
import { useApi } from "~/composables/api/useApi";
import {
    Dialog,
    DialogScrollContent,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/buttons";

const props = defineProps({
    dialogue: {
        type: Object as PropType<Dialogue>,
        required: true,
    },
});

const emit = defineEmits<{
    (e: "deleted", id: string): void;
}>();

const api = useApi();
const toast = useToast();
const isDeleting = ref(false);
const showDeleteDialog = ref(false);

// Helper to format date
const formattedDate = computed(() => {
    if (!props.dialogue.createdAt) return "";
    const date = new Date(props.dialogue.createdAt);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
});

// Get preview of dialogue
const dialoguePreview = computed(() => {
    if (!props.dialogue.dialogue.length) return "";
    return props.dialogue.dialogue[0].line;
});

const handleDelete = async () => {
    try {
        isDeleting.value = true;
        await api.delete(`/dialogues/${props.dialogue._id}`);
        toast.add({
            title: "Success",
            description: "Dialogue deleted successfully!",
            color: "success",
        });
        emit("deleted", props.dialogue._id);
        showDeleteDialog.value = false;
    } catch (error) {
        console.error("Error deleting dialogue:", error);
        toast.add({
            title: "Error",
            description: "Failed to delete dialogue. Please try again.",
            color: "error",
        });
    } finally {
        isDeleting.value = false;
    }
};
</script>

<template>
    <Dialog>
        <DialogTrigger>
            <li
                class="flex flex-col p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer relative group"
            >
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold text-primary">
                        {{ dialogue.topic }}
                    </h3>
                    <span
                        class="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full"
                    >
                        Dialogue
                    </span>
                </div>
                <div class="mb-2">
                    <p class="text-left text-sm text-gray-700 line-clamp-2">
                        {{ dialoguePreview }}
                    </p>
                </div>
                <div
                    class="flex flex-1 justify-between items-end text-xs text-gray-400"
                >
                    <span>{{ dialogue.dialogue.length }} lines</span>
                    <div class="flex items-center gap-2">
                        <span>{{ formattedDate }}</span>
                        <button
                            @click.stop="showDeleteDialog = true"
                            class="cursor-pointer p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete dialogue"
                        >
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <!-- Dialogue Info Dialog -->
                <DialogScrollContent class="sm:max-w-[625px]">
                    <DialogueInfo :dialogue="dialogue" />
                </DialogScrollContent>
            </li>
        </DialogTrigger>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog v-model:open="showDeleteDialog">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Dialogue</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this dialogue? This action
                    cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter class="flex gap-2 justify-end">
                <Button
                    class="rounded-md"
                    @click="showDeleteDialog = false"
                    :disabled="isDeleting"
                >
                    Cancel
                </Button>
                <Button
                    variant="destructive"
                    @click="handleDelete"
                    :loading="isDeleting"
                >
                    Delete
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>
