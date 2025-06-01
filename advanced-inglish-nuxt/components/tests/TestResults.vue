<script setup lang="ts">
	import { ref } from "vue";

	interface Props {
		correctAnswers: number;
		totalQuestions: number;
		isVisible: boolean;
	}

	const props = defineProps<Props>();

	const score = computed(() => {
		return Math.round(
			(props.correctAnswers / props.totalQuestions) * 100
		);
	});

	const getScoreColor = computed(() => {
		if (score.value >= 80) return "text-green-500";
		if (score.value >= 60) return "text-yellow-500";
		return "text-red-500";
	});
</script>

<template>
	<Transition
		enter-active-class="transition duration-300 ease-out"
		enter-from-class="transform scale-95 opacity-0"
		enter-to-class="transform scale-100 opacity-100"
		leave-active-class="transition duration-200 ease-in"
		leave-from-class="transform scale-100 opacity-100"
		leave-to-class="transform scale-95 opacity-0">
		<div
			v-if="isVisible"
			class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
			<div
				class="bg-white rounded-lg p-8 max-w-md w-full mx-4 shadow-xl">
				<h2 class="text-2xl font-bold text-center mb-6">
					Test Results
				</h2>

				<div class="text-center mb-6">
					<div
						class="text-6xl font-bold mb-2"
						:class="getScoreColor">
						{{ score }}%
					</div>
					<p class="text-gray-600">
						{{ correctAnswers }} out of
						{{ totalQuestions }} correct
					</p>
				</div>

				<div class="space-y-4">
					<div
						class="flex justify-between items-center">
						<span class="text-gray-600"
							>Score</span
						>
						<span
							class="font-medium"
							:class="getScoreColor"
							>{{ score }}%</span
						>
					</div>
					<div
						class="flex justify-between items-center">
						<span class="text-gray-600"
							>Correct Answers</span
						>
						<span class="font-medium">{{
							correctAnswers
						}}</span>
					</div>
					<div
						class="flex justify-between items-center">
						<span class="text-gray-600"
							>Total Questions</span
						>
						<span class="font-medium">{{
							totalQuestions
						}}</span>
					</div>
				</div>

				<div class="mt-8 flex justify-center">
					<button
						@click="$emit('close')"
						class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors">
						Close
					</button>
				</div>
			</div>
		</div>
	</Transition>
</template>
