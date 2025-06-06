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
				class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold">
				{{ index + 1 }}
			</h2>
			<h2 class="mt-2 text-lg font-medium">
				{{ question.question }}
			</h2>
			<audio v-if="question.audioURL" controls>
				<source
					:src="question.audioURL"
					type="audio/mp3" />
			</audio>
			<NuxtImg
				v-if="question.imageURL"
				:src="question.imageURL" />
			<p v-if="question.content" class="mt-2">
				{{ question.content }}
			</p>
		</div>
		<div class="space-y-4">
			<h2
				v-if="
					question.options &&
					question.options.length > 0
				"
				class="mt-2 text-lg font-medium">
				Keywords:
			</h2>
			<ul class="list-disc pl-5">
				<li
					v-for="(
						option, optionIndex
					) in question.options"
					:key="optionIndex">
					{{ option }}
				</li>
			</ul>
			<div class="mt-4">
				<AudioRecorder
					@answer="
						(answer) =>
							handleAnswerSelect(
								question._id,
								answer
							)
					" />
			</div>
			<p
				v-if="validationError"
				class="text-red-500 text-sm mt-1">
				{{ validationError }}
			</p>
		</div>
	</div>
</template>
