<script setup lang="ts">
import Button from "~/components/ui/buttons/Button.vue";
import ReadingPart from "~/components/tests/reading/ReadingPart.vue";
import ListeningPart from "~/components/tests/listening/ListeningPart.vue";
import { useTest } from "~/composables/useTest";
import { onBeforeRouteLeave } from "vue-router";
import { onMounted, onBeforeUnmount } from "vue";
import { useTestStore } from "~/stores/testStore";
import TestResults from "~/components/tests/TestResults.vue";

definePageMeta({
    layout: "test",
});

const route = useRoute();
const { id, parts } = route.params as { id: string; parts: string };

const testStore = useTestStore();

const { parseSelectedParts, scrollToQuestion, handleSubmit } = useTest();

const selectedParts = parseSelectedParts(parts);
const selectedLessons = testStore.getSelectedLessons(id, selectedParts);

// Handle form submission
async function onSubmit() {
    const success = await handleSubmit(selectedLessons);
    if (success) {
        navigateTo(`/tests/${id}/results`);
    }
}

// Handle route navigation
onBeforeRouteLeave((to, from, next) => {
    if (
        window.confirm(
            "Bạn có chắc chắn muốn rời khỏi trang? Tiến trình làm bài của bạn có thể bị mất."
        )
    ) {
        next();
    } else {
        next(false);
    }
});

// Handle page refresh
const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue =
        "Bạn có chắc chắn muốn tải lại trang? Tiến trình làm bài của bạn có thể bị mất.";
};

onMounted(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
});

onBeforeUnmount(() => {
    window.removeEventListener("beforeunload", handleBeforeUnload);
});
</script>

<template>
    <div class="container mx-auto p-4">
        <h1 class="text-3xl font-bold mb-4">
            {{ testStore.getTestById(id)?.title || "No test found" }}
        </h1>

        <form @submit.prevent="onSubmit">
            <!-- Error Alert -->
            <div
                v-if="testStore.hasErrors"
                class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded"
            >
                <p class="font-bold">
                    Please answer all questions before submitting.
                </p>
            </div>

            <div class="flex flex-col lg:flex-row gap-6">
                <!-- Question Navigation -->
                <div
                    class="w-full lg:w-64 flex-shrink-0 order-2 lg:order-2 bg-white rounded-lg shadow-md p-4 h-fit lg:sticky lg:top-4 md:sticky md:bottom-4"
                >
                    <div
                        v-for="lesson in selectedLessons"
                        :key="lesson.partNumber"
                        class="mb-6"
                    >
                        <h3 class="font-bold text-primary mb-2">
                            Part
                            {{ lesson.partNumber }}
                        </h3>
                        <div class="grid grid-cols-6 md:grid-cols-5 gap-2">
                            <button
                                v-for="(question, index) in lesson.questions"
                                :key="question.id"
                                type="button"
                                class="cursor-pointer w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors"
                                :class="{
                                    'bg-primary text-white':
                                        testStore.isQuestionAnswered(
                                            question.id,
                                            selectedLessons
                                        ),
                                    'bg-gray-200 text-gray-700 hover:bg-gray-300':
                                        !testStore.isQuestionAnswered(
                                            question.id,
                                            selectedLessons
                                        ),
                                    'border-2 border-red-500':
                                        testStore.validationErrors[question.id],
                                }"
                                @click="scrollToQuestion(question.id)"
                            >
                                {{ index + 1 }}
                            </button>
                        </div>
                    </div>
                    <!-- Submit Button -->
                    <div class="mt-6">
                        <Button type="submit">NỘP BÀI</Button>
                    </div>
                </div>

                <!-- Main Content -->
                <div
                    class="flex-grow order-1 lg:order-1 rounded-lg shadow-md p-4"
                >
                    <!-- Tabs -->
                    <div class="flex space-x-2 mb-4 border-b">
                        <button
                            v-for="part in selectedParts"
                            :key="part"
                            type="button"
                            class="px-4 py-2"
                            :class="{
                                'border-b-2 border-primary text-primary font-bold':
                                    testStore.activeTab === part,
                                'text-gray-500': testStore.activeTab !== part,
                            }"
                            @click="testStore.setActiveTab(part)"
                        >
                            Part {{ part }}
                        </button>
                    </div>

                    <!-- Tab Content -->
                    <div class="space-y-6">
                        <div
                            v-for="lesson in selectedLessons"
                            v-show="testStore.activeTab === lesson.partNumber"
                            :key="lesson.partNumber"
                            class="rounded-lg p-4"
                        >
                            <h2 class="text-2xl font-bold text-primary mb-2">
                                Part
                                {{ lesson.partNumber }}
                                -
                                {{ lesson.type }}
                            </h2>

                            <!-- Dynamic component based on type -->
                            <component
                                :is="
                                    lesson.type === 'Reading'
                                        ? ReadingPart
                                        : ListeningPart
                                "
                                :ref="
                                    (el) => {
                                        if (el) {
                                            testStore.setPartRef(
                                                lesson.partNumber,
                                                el
                                            );
                                        }
                                    }
                                "
                                :part-number="lesson.partNumber"
                                :questions="lesson.questions"
                                :validation-errors="testStore.validationErrors"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>

        <TestResults
            :correct-answers="testStore.testResults.correctAnswers"
            :total-questions="testStore.testResults.totalQuestions"
            :is-visible="testStore.showResults"
            @close="testStore.hideResults"
        />
    </div>
</template>
