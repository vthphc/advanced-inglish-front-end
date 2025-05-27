<script setup lang="ts">
import type { PropType } from "vue";
import type { Flashcard } from "~/utils/types/flashcard";
import FlashcardInfo from "./FlashcardInfo.vue";
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
    flashcard: {
        type: Object as PropType<Flashcard>,
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

const playAudio = (audioURL: string | null) => {
    if (!audioURL) return;
    const audio = new Audio(audioURL);
    audio.play().catch((error) => console.error("Error playing audio:", error));
};

// Helper to format date if needed
const formattedDate = computed(() => {
    if (!props.flashcard.createdAt) return "";
    const date = new Date(props.flashcard.createdAt);
    // Use options for DD/MM/YY format
    return date.toLocaleDateString("en-GB", {
        // en-GB locale often defaults to DD/MM/YYYY
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
});

const handleDelete = async () => {
    try {
        isDeleting.value = true;
        await api.delete(`/flashcards/${props.flashcard._id}`);
        toast.add({
            title: "Success",
            description: "Flashcard deleted successfully!",
            color: "success",
        });
        emit("deleted", props.flashcard._id);
        showDeleteDialog.value = false;
    } catch (error) {
        console.error("Error deleting flashcard:", error);
        toast.add({
            title: "Error",
            description: "Failed to delete flashcard. Please try again.",
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
                class="flex flex-col p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
                <div class="flex justify-between items-start mb-2">
                    <h3 class="text-lg font-semibold text-primary">
                        {{ flashcard.word }}
                    </h3>
                    <span
                        class="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full capitalize"
                        >{{ flashcard.category }}</span
                    >
                </div>
                <div class="mb-2">
                    <p class="text-left text-sm text-gray-700 line-clamp-2">
                        {{ flashcard.definition }}
                    </p>
                    <p
                        v-if="flashcard.example"
                        class="text-left text-sm text-gray-500 italic mt-1 line-clamp-2"
                    >
                        <span class="font-bold not-italic">Example:</span>
                        "{{ flashcard.example }}"
                    </p>
                </div>
                <div
                    v-if="flashcard.phonetics && flashcard.phonetics.length > 0"
                    class="flex items-center gap-2 mb-2"
                >
                    <span
                        v-for="(phonetic, index) in flashcard.phonetics"
                        :key="index"
                        class="text-sm text-gray-600"
                    >
                        {{ phonetic.text }}
                        <!-- Optional: Add button to play audio -->
                        <button
                            v-if="phonetic.audio"
                            class="ml-1 text-blue-500 hover:text-blue-700"
                            @click.stop="playAudio(phonetic.audio)"
                        >
                            🔊
                        </button>
                    </span>
                </div>
                <div
                    class="flex flex-1 justify-between items-end text-xs text-gray-400"
                >
                    <span>Topic: {{ flashcard.topic }}</span>
                    <div class="flex items-center gap-2">
                        <span>{{ formattedDate }}</span>
                        <button
                            @click.stop="showDeleteDialog = true"
                            class="cursor-pointer p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                            title="Delete flashcard"
                        >
                            <Trash2 class="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <DialogScrollContent class="sm:max-w-[500px]">
                    <FlashcardInfo :flashcard="flashcard" />
                </DialogScrollContent>
            </li>
        </DialogTrigger>
    </Dialog>

    <!-- Delete Confirmation Dialog -->
    <Dialog v-model:open="showDeleteDialog">
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Delete Flashcard</DialogTitle>
                <DialogDescription>
                    Are you sure you want to delete this flashcard? This action
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
