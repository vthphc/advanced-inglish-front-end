<script setup lang="ts">
	import { useTestStore } from "~/stores/testStore";
	import { useRoute } from "vue-router";
	import Button from "~/components/ui/buttons/Button.vue";

	definePageMeta({
		layout: "test",
	});

	const route = useRoute();
	const { id } = route.params as { id: string };
	const testStore = useTestStore();

	const test = testStore.getTestById(id);
	const score = computed(() => {
		return Math.round(
			(testStore.testResults.correctAnswers /
				testStore.testResults.totalQuestions) *
				100
		);
	});

	const getScoreColor = computed(() => {
		if (score.value >= 80) return "text-green-500";
		if (score.value >= 60) return "text-yellow-500";
		return "text-red-500";
	});

	const getScoreMessage = computed(() => {
		if (score.value >= 80) return "Excellent! Great job!";
		if (score.value >= 60) return "Good effort! Keep practicing!";
		return "Keep studying! You can do better!";
	});
</script>

<template>
	<div class="container mx-auto p-4">
		<div class="max-w-2xl mx-auto">
			<div class="bg-white rounded-lg shadow-xl p-8">
				<h1 class="text-3xl font-bold text-center mb-2">
					{{ test?.title || "Test Results" }}
				</h1>

				<div class="text-center mb-8">
					<div
						class="text-7xl font-bold mb-4"
						:class="getScoreColor">
						{{ score }}%
					</div>
					<p class="text-xl text-gray-600 mb-2">
						{{
							testStore.testResults
								.correctAnswers
						}}
						out of
						{{
							testStore.testResults
								.totalQuestions
						}}
						correct
					</p>
					<p
						class="text-lg font-medium"
						:class="getScoreColor">
						{{ getScoreMessage }}
					</p>
				</div>

				<div class="space-y-6 mb-8">
					<div class="bg-gray-50 rounded-lg p-6">
						<h2
							class="text-xl font-semibold mb-4">
							Detailed Results
						</h2>
						<div class="space-y-4">
							<div
								class="flex justify-between items-center">
								<span
									class="text-gray-600"
									>Score</span
								>
								<span
									class="font-medium"
									:class="
										getScoreColor
									"
									>{{
										score
									}}%</span
								>
							</div>
							<div
								class="flex justify-between items-center">
								<span
									class="text-gray-600"
									>Correct
									Answers</span
								>
								<span
									class="font-medium"
									>{{
										testStore
											.testResults
											.correctAnswers
									}}</span
								>
							</div>
							<div
								class="flex justify-between items-center">
								<span
									class="text-gray-600"
									>Total
									Questions</span
								>
								<span
									class="font-medium"
									>{{
										testStore
											.testResults
											.totalQuestions
									}}</span
								>
							</div>
						</div>
					</div>
				</div>

				<div class="flex justify-center space-x-4">
					<NuxtLink :to="`/tests/${id}`">
						<Button>Back to Tests</Button>
					</NuxtLink>
				</div>
			</div>
		</div>
	</div>
</template>
