<script setup lang="ts">
interface Question {
    _id: string;
    question: string;
    content?: string;
    audioURL?: string;
    imageURL?: string;
    options: string[];
    type: string;
}

interface Props {
    question: Question;
    index: number;
    selectedAnswer?: string;
    validationError?: string;
}

const props = defineProps<Props>();
const emit = defineEmits<{
    (e: "answer", questionId: string, answer: string): void;
}>();

const handleAnswerSelect = (questionId: string, answer: string) => {
    emit("answer", questionId, answer);
};
</script>

<template>
    <div class="mb-8">
        <div class="mb-4">
            <h2
                class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold"
            >
                {{ index + 1 }}
            </h2>
            <h2 class="mt-2 text-lg font-medium">
                {{ question.question }}
            </h2>
            <audio v-if="question.audioURL" controls>
                <source :src="question.audioURL" type="audio/mp3" />
            </audio>
            <NuxtImg
                v-if="question.imageURL"
                :src="question.imageURL"
            ></NuxtImg>
            <p>{{ question.content }}</p>
        </div>
        <div class="space-y-2">
            <label
                v-for="(option, optionIndex) in question.options"
                :key="optionIndex"
                class="flex items-center p-3 rounded-lg border border-gray-200 hover:border-primary cursor-pointer transition-colors"
                :class="{
                    'border-primary bg-primary/5': selectedAnswer === option,
                }"
            >
                <input
                    type="radio"
                    :name="`question-${question._id}`"
                    :value="option"
                    class="mr-3 accent-primary"
                    :checked="selectedAnswer === option"
                    @change="handleAnswerSelect(question._id, option)"
                />
                <span>{{ option }}</span>
            </label>
            <p v-if="validationError" class="text-red-500 text-sm mt-1">
                {{ validationError }}
            </p>
        </div>
    </div>
</template>
