<script setup lang="ts">
import type { Dialogue } from "~/utils/types/dialogue";
import {
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose,
} from "~/components/ui/dialog";

const props = defineProps<{
    dialogue: Dialogue;
}>();

const formattedDate = computed(() => {
    if (!props.dialogue.createdAt) return "";
    const date = new Date(props.dialogue.createdAt);
    return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
});
</script>

<template>
    <DialogHeader>
        <DialogTitle class="text-2xl font-bold text-primary">
            {{ dialogue.topic }}
        </DialogTitle>
        <DialogDescription class="text-sm text-gray-500">
            Created on {{ formattedDate }}
        </DialogDescription>
    </DialogHeader>

    <div class="space-y-4 py-4 overflow-y-auto">
        <!-- Dialogue Content -->
        <div class="space-y-4">
            <div
                v-for="(line, index) in dialogue.dialogue"
                :key="index"
                class="flex gap-4 p-3 rounded-lg"
                :class="line.speaker === 'A' ? 'bg-blue-50' : 'bg-gray-50'"
            >
                <div
                    class="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-bold"
                    :class="
                        line.speaker === 'A'
                            ? 'bg-primary text-white'
                            : 'bg-gray-500 text-white'
                    "
                >
                    {{ line.speaker }}
                </div>
                <p class="text-sm text-gray-700 flex-1">
                    {{ line.line }}
                </p>
            </div>
        </div>

        <!-- Feedback Section -->
        <div v-if="dialogue.feedback" class="mt-4 p-3 bg-yellow-50 rounded-lg">
            <h4 class="text-sm font-medium text-gray-700 mb-1">Feedback:</h4>
            <p class="text-sm text-gray-600">
                {{ dialogue.feedback }}
            </p>
        </div>
    </div>

    <DialogFooter>
        <DialogClose />
    </DialogFooter>
</template>
