<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { Button } from "~/components/ui/buttons";
import AiExplanation from "./AiExplanation.vue";

interface Question {
    question: {
        _id: string;
        question: string;
        content?: string;
        audioURL?: string;
        imageURL?: string;
        options: string[];
        correctAnswer: string;
    };
    selectedAnswer: string;
}

interface Props {
    question: Question;
    index: number;
}

const props = defineProps<Props>();
const showAnswer = ref(false);
const showTooltip = ref(false);
const showExplanation = ref(false);
const authStore = useAuthStore();
const isPremium = computed(
    () => authStore.user?.subscription.status === "premium"
);
</script>

<template>
    <div class="mb-8" :data-question="`${index}`">
        <div class="mb-4">
            <h2
                class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold"
            >
                {{ index + 1 }}
            </h2>
            <h2 class="mt-2 text-lg font-medium">
                {{ question.question.question }}
            </h2>
            <audio v-if="question.question.audioURL" controls>
                <source :src="question.question.audioURL" type="audio/mp3" />
            </audio>
            <NuxtImg
                v-if="question.question.imageURL"
                :src="question.question.imageURL"
            />
            <p>{{ question.question.content }}</p>
        </div>
        <div class="space-y-2">
            <label
                v-for="(option, optionIndex) in question.question.options"
                :key="optionIndex"
                class="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary cursor-pointer transition-colors"
                :class="{
                    'border-success bg-success/5':
                        option === question.question.correctAnswer,
                    'border-error bg-error/5':
                        option === question.selectedAnswer &&
                        option !== question.question.correctAnswer,
                }"
            >
                <input
                    type="radio"
                    :name="`question-${question.question._id}`"
                    :value="option"
                    class="mr-3 accent-primary"
                    :checked="option === question.selectedAnswer"
                    disabled
                />
                <span>{{ option }}</span>
            </label>
        </div>
        <div class="my-4 space-x-4 flex flex-row">
            <Button @click="showAnswer = !showAnswer">Hiện kết quả</Button>
            <p
                v-show="showAnswer"
                class="mx-8 text-success font-semibold place-self-center"
            >
                Đáp án đúng:
                {{ question.question.correctAnswer }}
            </p>
            <Button
                v-if="isPremium"
                variant="ghost"
                class="shadow-sm hover:text-gold shadow-gold"
                title="Tìm câu trả lời được trợ cấp bới AI"
                @click="showExplanation = true"
                >AI Explanation</Button
            >
            <div v-else class="flex items-center gap-2">
                <Button
                    title="Tính năng chỉ dành cho Premium"
                    variant="ghost"
                    disabled
                    class="opacity-50"
                    >AI Explanation</Button
                >
                <p class="text-sm text-gray-500">Premium feature</p>
            </div>
        </div>
        <AiExplanation
            :question-id="question.question._id"
            :is-open="showExplanation"
            @update:is-open="showExplanation = $event"
        />
    </div>
</template>
