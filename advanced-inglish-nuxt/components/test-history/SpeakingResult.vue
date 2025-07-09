<script setup lang="ts">
	import { Button } from "~/components/ui/buttons";
	import { CircleHelp } from "lucide-vue-next";
	import AiTranscription from "./AiTranscription.vue";
	import { useAuthStore } from "~/stores/auth";

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
	const authStore = useAuthStore();

	const isPremium = computed(
		() => authStore.user?.subscription.status === "premium"
	);
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
						Your Recording:
					</h3>
					<audio
						v-if="question.selectedAnswer"
						controls
						class="w-full">
						<source
							:src="
								question.selectedAnswer
							"
							type="audio/mp3" />
					</audio>
				</div>
			</div>
		</div>
		<div class="my-4 space-x-4 flex flex-row">
			<Button
				:disabled="!isPremium"
				@click="showAnswer = !showAnswer"
				>AI Transcription</Button
			>
			<div class="relative place-self-center">
				<Button
					variant="ghost"
					class="place-self-center h-8 w-8 hover:text-white hover:bg-primary rounded-full p-0 m-0 text-primary"
					@mouseenter="showTooltip = true"
					@mouseleave="showTooltip = false"
					><CircleHelp
				/></Button>
				<div
					v-show="showTooltip"
					class="absolute z-50 px-2 py-1 text-sm text-white bg-gray-900 rounded-md whitespace-nowrap -top-8 left-1/2 transform -translate-x-1/2">
					Tính năng Premium: Click để AI
					transcribe audio của bạn
				</div>
			</div>
			<AiTranscription
				:audio-url="question.selectedAnswer"
				:is-open="showAnswer"
				:topic="question.question.question"
				@update:is-open="showAnswer = $event" />
		</div>
	</div>
</template>

<style scoped>
	.tooltip {
		transition: opacity 0s;
	}
</style>
