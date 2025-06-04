<script setup lang="ts">
import { Button } from "~/components/ui/buttons";
import type { TakenTest } from "~/utils/types/test";

const props = defineProps<{
    test: TakenTest;
    testTitle?: string;
}>();

const emit = defineEmits<{
    (e: "action-click", title: string, id: string): void;
}>();

// Format date for display
const formatDate = (date: string): string => {
    const d = new Date(date);
    return d.toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};

// Calculate total questions
const totalQuestions = computed(() => {
    return props.test.lessons.reduce((total, lesson) => {
        return total + lesson.questions.length;
    }, 0);
});

// Handle action click
const handleActionClick = () => {
    emit("action-click", props.testTitle || "Test", props.test._id);
};
</script>

<template>
    <li
        class="relative bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow"
    >
        <div class="flex flex-col space-y-2">
            <!-- Test Title -->
            <h3 class="text-lg font-semibold text-gray-900">
                {{ testTitle || "Test" }}
            </h3>

            <!-- Score -->
            <div class="flex items-center space-x-2">
                <span class="text-sm font-medium text-gray-500">Score:</span>
                <span
                    :class="[
                        'text-lg font-bold',
                        test.score >= 70
                            ? 'text-green-600'
                            : test.score >= 50
                            ? 'text-yellow-600'
                            : 'text-red-600',
                    ]"
                >
                    {{ test.score }}%
                </span>
            </div>

            <!-- Date and Questions -->
            <div class="flex flex-col space-y-1">
                <p class="text-sm text-gray-500">
                    Taken on: {{ formatDate(test.takenAt) }}
                </p>
                <p class="text-sm text-gray-500">
                    Total Questions: {{ totalQuestions }}
                </p>
            </div>

            <!-- Action Button -->
            <Button @click="handleActionClick"> View Details </Button>
        </div>
    </li>
</template>
