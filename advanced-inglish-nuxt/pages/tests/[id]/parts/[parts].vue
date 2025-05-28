<script setup lang="ts">
	import Button from "~/components/ui/buttons/Button.vue";
	import ReadingPart from "~/components/tests/reading/ReadingPart.vue";
	import ListeningPart from "~/components/tests/listening/ListeningPart.vue";
	import { useTest } from "~/composables/useTest";

	const route = useRoute();
	const { id, parts } = route.params as { id: string; parts: string };

	const {
		testStore,
		parseSelectedParts,
		scrollToQuestion,
		handleSubmit,
	} = useTest();

	const selectedParts = parseSelectedParts(parts);
	const selectedLessons = testStore.getSelectedLessons(id, selectedParts);

	// Handle form submission
	async function onSubmit() {
		await handleSubmit(selectedLessons);
	}
</script>

<template>
	<div class="container mx-auto p-4">
		<h1 class="text-3xl font-bold mb-4">
			{{
				testStore.getTestById(id)?.title ||
				"No test found"
			}}
		</h1>

		<form @submit.prevent="onSubmit">
			<!-- Error Alert -->
			<div
				v-if="testStore.hasErrors"
				class="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
				<p class="font-bold">
					Please answer all questions before
					submitting.
				</p>
			</div>

			<div class="flex gap-6">
				<!-- Question Navigation -->
				<div class="w-64 flex-shrink-0">
					<div
						v-for="lesson in selectedLessons"
						:key="lesson.partNumber"
						class="mb-6">
						<h3 class="font-semibold mb-2">
							Part
							{{ lesson.partNumber }}
						</h3>
						<div
							class="grid grid-cols-4 gap-2">
							<button
								v-for="(
									question,
									index
								) in lesson.questions"
								:key="
									question.id
								"
								type="button"
								@click="
									scrollToQuestion(
										question.id
									)
								"
								class="w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors"
								:class="{
									'bg-blue-500 text-white':
										testStore.isQuestionAnswered(
											question.id,
											selectedLessons
										),
									'bg-gray-200 text-gray-700 hover:bg-gray-300':
										!testStore.isQuestionAnswered(
											question.id,
											selectedLessons
										),
									'border-2 border-red-500':
										testStore
											.validationErrors[
											question
												.id
										],
								}">
								{{ index + 1 }}
							</button>
						</div>
					</div>
				</div>

				<!-- Main Content -->
				<div class="flex-grow">
					<!-- Tabs -->
					<div
						class="flex space-x-2 mb-4 border-b">
						<button
							v-for="part in selectedParts"
							:key="part"
							type="button"
							@click="
								testStore.setActiveTab(
									part
								)
							"
							class="px-4 py-2"
							:class="{
								'border-b-2 border-blue-500':
									testStore.activeTab ===
									part,
								'text-gray-500':
									testStore.activeTab !==
									part,
							}">
							Part {{ part }}
						</button>
					</div>

					<!-- Tab Content -->
					<div class="space-y-6">
						<div
							v-for="lesson in selectedLessons"
							:key="lesson.partNumber"
							v-show="
								testStore.activeTab ===
								lesson.partNumber
							"
							class="border rounded-lg p-4">
							<h2
								class="text-xl font-semibold mb-2">
								Part
								{{
									lesson.partNumber
								}}
								-
								{{
									lesson.type
								}}
							</h2>

							<!-- Dynamic component based on type -->
							<component
								:is="
									lesson.type ===
									'Reading'
										? ReadingPart
										: ListeningPart
								"
								:ref="
									(
										el
									) => {
										if (
											el
										) {
											testStore.setPartRef(
												lesson.partNumber,
												el
											);
										}
									}
								"
								:part-number="
									lesson.partNumber
								"
								:questions="
									lesson.questions
								"
								:validation-errors="
									testStore.validationErrors
								" />
						</div>
					</div>
				</div>
			</div>

			<!-- Submit Button -->
			<div class="mt-6">
				<Button type="submit">Submit Test</Button>
			</div>
		</form>
	</div>
</template>

<style scoped>
	.container {
		max-width: 1200px;
	}
</style>
