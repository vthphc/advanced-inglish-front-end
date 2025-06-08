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
		</div>
		<div class="space-y-4">
			<h2
				v-if="
					question.question.options &&
					question.question.options.length > 0
				"
				class="mt-2 text-lg font-medium">
				Keywords:
			</h2>
			<ul class="list-disc pl-5">
				<li
					v-for="(option, optionIndex) in question
						.question.options"
					:key="optionIndex">
					{{ option }}
				</li>
			</ul>
			<div class="mt-4">
				<div
					class="p-4 border border-gray-200 rounded-lg bg-gray-50">
					<h3 class="font-medium mb-2">
						Your Answer:
					</h3>
					<p class="whitespace-pre-wrap">
						{{ question.selectedAnswer }}
					</p>
				</div>
			</div>
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
