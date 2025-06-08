<script setup lang="ts">
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
</script>

<template>
	<div class="mb-8" :data-question="`${index}`">
		<div class="mb-4">
			<h2
				class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold">
				{{ index + 1 }}
			</h2>
			<h2 class="mt-2 text-lg font-medium">
				{{ question.question.question }}
			</h2>
			<audio v-if="question.question.audioURL" controls>
				<source
					:src="question.question.audioURL"
					type="audio/mp3" />
			</audio>
			<NuxtImg
				v-if="question.question.imageURL"
				:src="question.question.imageURL" />
			<p>{{ question.question.content }}</p>
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
							question.question
								.correctAnswer,
				}">
				<input
					type="radio"
					:name="`question-${question.question._id}`"
					:value="option"
					class="mr-3 accent-primary"
					:checked="
						option ===
						question.selectedAnswer
					"
					disabled />
				<span>{{ option }}</span>
			</label>
		</div>
		<div class="my-4 flex flex-row">
			<Button @click="showAnswer = !showAnswer"
				>Hiện kết quả</Button
			>
			<p
				v-show="showAnswer"
				class="mx-8 text-success font-semibold place-self-center">
				Đáp án đúng:
				{{ question.question.correctAnswer }}
			</p>
		</div>
	</div>
</template>
