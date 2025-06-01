<script setup lang="ts">
	import { defineProps, defineExpose } from "vue";

	interface Question {
		id: string;
		question: string;
		options: string[];
		answer: string;
		audioURL?: string;
		imageURL?: string;
	}

	interface Props {
		partNumber: number;
		questions: Question[];
		validationErrors?: Record<string, string>;
	}

	const props = defineProps<Props>();
	const formRef = ref<HTMLFormElement | null>(null);
	const formState = reactive<Record<string, string>>({});

	// Audio handling
	const currentAudio = ref<HTMLAudioElement | null>(null);

	function playAudio(url: string) {
		if (currentAudio.value) {
			currentAudio.value.pause();
		}
		currentAudio.value = new Audio(url);
		currentAudio.value.play();
	}

	// Expose methods and state to parent
	defineExpose({
		formRef,
		formState,
		validate: () => {
			return formRef.value?.checkValidity() ?? false;
		},
	});
</script>

<template>
	<form ref="formRef" class="space-y-4">
		<div
			v-for="(question, index) in questions"
			:key="question.id"
			:id="question.id"
			class="border-b-2 border-primary pb-4">
			<div class="flex items-center gap-4 mb-4">
				<button
					v-if="question.audioURL"
					type="button"
					@click="playAudio(question.audioURL!)"
					class="bg-primary text-white px-3 py-1 rounded hover:bg-primary/70 transition-colors duration-200">
					Play Audio
				</button>
				<img
					v-if="question.imageURL"
					:src="question.imageURL"
					:alt="question.question"
					class="max-w-xs rounded" />
			</div>
			<div class="flex items-start gap-4 mb-2">
				<span
					class="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white font-bold">
					{{ index + 1 }}
				</span>
				<p class="font-medium">
					{{ question.question }}
				</p>
			</div>
			<div class="space-y-2 ml-12">
				<div
					v-for="option in question.options"
					:key="option"
					class="flex items-center">
					<input
						type="radio"
						:name="question.id"
						:value="option"
						v-model="formState[question.id]"
						required
						class="mr-2 accent-primary" />
					<label>{{ option }}</label>
				</div>
				<p
					v-if="validationErrors?.[question.id]"
					class="text-red-500 text-sm mt-1">
					{{ validationErrors[question.id] }}
				</p>
			</div>
		</div>
	</form>
</template>
