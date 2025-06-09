<script setup lang="ts">
import { useApi } from "~/composables/api/useApi";
import { onMounted, nextTick } from "vue";
import { Button } from "~/components/ui/buttons";
import { Card } from "~/components/ui/card";
import { useRoute, useRouter } from "vue-router";
import ReadingListeningResult from "~/components/test-history/ReadingListeningResult.vue";
import WritingResult from "~/components/test-history/WritingResult.vue";
import SpeakingResult from "~/components/test-history/SpeakingResult.vue";

interface Question {
    question: {
        _id: string;
        question: string;
        content?: string;
        audioURL?: string;
        imageURL?: string;
        options: string[];
        correctAnswer: string;
        type: string;
    };
    selectedAnswer: string;
}

interface Lesson {
    lesson: {
        _id: string;
        title: string;
    };
    questions: Question[];
}

interface TestData {
    takenTest: {
        lessons: Lesson[];
    };
}

const route = useRoute();
const router = useRouter();
const testId = route.params.id;
const api = useApi();

const testData = ref<TestData | null>(null);
const error = ref<Error | null>(null);
const pending = ref(true);
const lessonIds = ref<{ title: string }[] | null>(null);
const currentLessonIndex = ref(0);

onMounted(async () => {
    try {
        testData.value = await api.get(`/auth/taken-test/${testId}`);
        console.log("Raw test data:", testData.value);
        if (testData.value?.takenTest?.lessons) {
            lessonIds.value = testData.value.takenTest.lessons.map(
                (item: Lesson) => item.lesson
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

function scrollToQuestion(lessonIndex: number, questionIndex: number) {
    currentLessonIndex.value = lessonIndex;
    nextTick(() => {
        const questionElement = document.querySelector(
            `[data-question="${lessonIndex}-${questionIndex}"]`
        );
        if (questionElement) {
            questionElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
}

function scrollToTop(lessonIndex: number) {
    currentLessonIndex.value = lessonIndex;
    nextTick(() => {
        const lessonElement = document.querySelector(
            `[data-lesson="${lessonIndex}"]`
        );
        if (lessonElement) {
            lessonElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
}

function getTestType(lesson: Lesson) {
    console.log("Type of question: ", lesson.questions[0]?.question?.type);
    return lesson.questions[0]?.question?.type || null;
}
</script>

<template>
    <div class="">
        <div v-if="pending">Loading...</div>
        <div v-else-if="error">Error loading test data</div>
        <div v-else-if="testData" class="flex-1 rounded-md shadow-md p-4">
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
                        <template
                            v-if="
                                getTestType(lesson) === 'Reading' ||
                                getTestType(lesson) === 'Listening'
                            "
                        >
                            <ReadingListeningResult
                                v-for="(question, qIndex) in lesson.questions"
                                :key="qIndex"
                                :question="question"
                                :index="qIndex"
                            />
                        </template>
                        <template v-else-if="getTestType(lesson) === 'Writing'">
                            <WritingResult
                                v-for="(question, qIndex) in lesson.questions"
                                :key="qIndex"
                                :question="question"
                                :index="qIndex"
                            />
                        </template>
                        <template
                            v-else-if="getTestType(lesson) === 'Speaking'"
                        >
                            <SpeakingResult
                                v-for="(question, qIndex) in lesson.questions"
                                :key="qIndex"
                                :question="question"
                                :index="qIndex"
                            />
                        </template>
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
                    <div class="mt-4 pt-4 border-t">
                        <Button
                            @click="router.push('/account/test-history')"
                            class="w-full"
                            >Quay lại</Button
                        >
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
