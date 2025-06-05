<script setup lang="ts">
import { useApi } from "~/composables/api/useApi";
import { onMounted, nextTick } from "vue";
import { useHistoryStore } from "~/stores/history-details";
import { Button } from "~/components/ui/buttons";
import { Card } from "~/components/ui/card";

const route = useRoute();
const history = useHistoryStore();
const testId = route.params.id;
const api = useApi();

const testData = ref<any>(null);
const error = ref<Error | null>(null);
const pending = ref(true);
const lessonIds = ref<any>(null);
const currentLessonIndex = ref(0);
const showAnswers = ref<{ [key: string]: boolean }>({});

onMounted(async () => {
    try {
        testData.value = await api.get(`/auth/taken-test/${testId}`);
        console.log("Raw test data:", testData.value);
        if (testData.value.takenTest?.lessons) {
            lessonIds.value = testData.value.takenTest.lessons.map(
                (item: { lesson: any }) => item.lesson
            );
        } else {
            console.log("No lessons found in the response");
        }
    } catch (e) {
        error.value = e as Error;
        console.error("Error fetching test data:", e);
    } finally {
        pending.value = false;
    }
});

function selectLesson(index: number) {
    currentLessonIndex.value = index;
}

function toggleAnswer(questionId: string) {
    showAnswers.value[questionId] = !showAnswers.value[questionId];
}

function scrollToQuestion(lessonIndex: number, questionIndex: number) {
    // First switch to the correct lesson
    currentLessonIndex.value = lessonIndex;

    // Wait for the DOM to update with the new lesson
    nextTick(() => {
        // Find the question element
        const questionElement = document.querySelector(
            `[data-question="${lessonIndex}-${questionIndex}"]`
        );
        if (questionElement) {
            // Scroll the question into view with smooth behavior
            questionElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
}

function scrollToTop(lessonIndex: number) {
    // Switch to the correct lesson
    currentLessonIndex.value = lessonIndex;

    // Wait for the DOM to update with the new lesson
    nextTick(() => {
        // Find the lesson container
        const lessonElement = document.querySelector(
            `[data-lesson="${lessonIndex}"]`
        );
        if (lessonElement) {
            // Scroll to the top of the lesson with smooth behavior
            lessonElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
}
</script>

<template>
    <div class="">
        <div v-if="pending">Loading...</div>
        <div v-else-if="error">Error loading test data</div>
        <div v-else class="flex-1 rounded-md shadow-md p-4">
            <!-- Test data will be displayed here -->
            <div class="flex space-x-2 mb-4 border-b">
                <button
                    v-for="(lesson, index) in lessonIds"
                    :key="index"
                    type="button"
                    class="px-4 py-2"
                    :class="{
                        'border-b-2 border-primary text-primary font-bold':
                            currentLessonIndex === index,
                        'text-gray-500': currentLessonIndex !== index,
                    }"
                    @click="selectLesson(index)"
                >
                    {{ lesson.title }}
                </button>
            </div>

            <div class="flex flex-col lg:flex-row gap-4">
                <div class="flex-1">
                    <div
                        v-for="(lesson, index) in testData.takenTest.lessons"
                        :key="index"
                        v-show="currentLessonIndex === index"
                        :data-lesson="index"
                    >
                        <div
                            class="mb-8"
                            v-for="(question, index) in lesson.questions"
                            :key="index"
                            :data-question="`${currentLessonIndex}-${index}`"
                        >
                            <div class="mb-4">
                                <h2
                                    class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold"
                                >
                                    {{ index + 1 }}
                                </h2>
                                <h2 class="mt-2 text-lg font-medium">
                                    {{ question.question.question }}
                                </h2>
                                <audio controls>
                                    <source
                                        :src="question.question.audioURL"
                                        type="audio/mp3"
                                    />
                                </audio>
                                <NuxtImg
                                    :src="question.question.imageURL"
                                ></NuxtImg>
                                <p>{{ question.content }}</p>
                            </div>
                            <div class="space-y-2">
                                <label
                                    v-for="(option, optionIndex) in question
                                        .question.options"
                                    :key="optionIndex"
                                    class="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary cursor-pointer transition-colors"
                                    :class="{
                                        'border-success bg-success/5':
                                            option ===
                                            question.question.correctAnswer,
                                        'border-error bg-error/5':
                                            option ===
                                                question.selectedAnswer &&
                                            option !==
                                                question.question.correctAnswer,
                                    }"
                                >
                                    <input
                                        type="radio"
                                        :name="`question-${question.question._id}`"
                                        :value="option"
                                        class="mr-3 accent-primary"
                                        :checked="
                                            option === question.selectedAnswer
                                        "
                                        disabled
                                    />
                                    <span>{{ option }}</span>
                                </label>
                            </div>
                            <div class="my-4 flex flex-row">
                                <Button
                                    @click="toggleAnswer(question.question._id)"
                                    >Hiện kết quả</Button
                                >
                                <p
                                    v-show="showAnswers[question.question._id]"
                                    class="mx-8 text-success font-semibold place-self-center"
                                >
                                    Đáp án đúng:
                                    {{ question.question.correctAnswer }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Side Panel -->
                <div
                    class="lg:w-64 bg-gray-50 p-4 rounded-lg lg:sticky lg:top-4 lg:h-fit flex flex-col"
                >
                    <div class="space-y-4 flex-1">
                        <Card
                            v-for="(lesson, lessonIndex) in testData.takenTest
                                .lessons"
                            :key="lessonIndex"
                        >
                            <Card
                                type="button"
                                @click="scrollToTop(lessonIndex)"
                                class="p-4 hover:cursor-pointer opacity-50"
                                :class="{
                                    'bg-primary hover:bg-primary opacity-100':
                                        currentLessonIndex === lessonIndex,
                                }"
                            >
                                <div class="font-medium mb-2">
                                    {{ lesson.lesson.title }}
                                </div>
                                <div class="grid grid-cols-5 gap-1">
                                    <button
                                        v-for="(
                                            question, questionIndex
                                        ) in lesson.questions"
                                        :key="questionIndex"
                                        type="button"
                                        class="w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors"
                                        :class="{
                                            'bg-success text-white':
                                                question.selectedAnswer ===
                                                question.question.correctAnswer,
                                            'bg-error text-white':
                                                question.selectedAnswer !==
                                                question.question.correctAnswer,
                                        }"
                                        @click="
                                            scrollToQuestion(
                                                lessonIndex,
                                                questionIndex
                                            )
                                        "
                                    >
                                        {{ questionIndex + 1 }}
                                    </button>
                                </div>
                            </Card>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
