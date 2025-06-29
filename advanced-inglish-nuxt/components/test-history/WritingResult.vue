<script setup lang="ts">
	import { Button } from "@/components/ui/buttons";
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
		aiReview?: {
			content: string;
			structure: string;
			grammar: string;
			vocabulary: string;
			suggestions: string;
			overallScore: number;
		};
	}

	interface Props {
		question: Question;
		index: number;
	}

	const props = defineProps<Props>();
	const showAnswer = ref(false);
	const showAIReview = ref(false);
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
		<div class="my-4 flex flex-col gap-2">
			<div class="flex gap-2">
				<Button @click="showAnswer = !showAnswer">
					Hiện kết quả
				</Button>
				<Button
					v-if="question.aiReview"
					variant="ghost"
					@click="showAIReview = !showAIReview">
					{{
						showAIReview
							? "Ẩn AI Review"
							: "Hiện AI Review"
					}}
				</Button>
			</div>
			<p
				v-show="showAnswer"
				class="my-2 text-success font-semibold place-self-center">
				Đáp án đúng:
				{{ question.question.correctAnswer }}
			</p>
		</div>

		<!-- AI Review Section -->
		<div
			v-if="question.aiReview && showAIReview"
			class="mt-6 p-6 bg-blue-50 border border-blue-200 rounded-lg">
			<h3 class="text-xl font-bold text-blue-800 mb-4">
				AI Review
			</h3>

			<!-- Overall Score -->
			<div class="mb-4">
				<div class="flex items-center gap-2 mb-2">
					<span
						class="font-semibold text-blue-700"
						>Overall Score:</span
					>
					<div class="flex items-center gap-1">
						<span
							class="text-lg font-bold"
							:class="{
								'text-red-600':
									question
										.aiReview
										.overallScore <=
									2,
								'text-yellow-600':
									question
										.aiReview
										.overallScore >
										2 &&
									question
										.aiReview
										.overallScore <=
										4,
								'text-green-600':
									question
										.aiReview
										.overallScore >
									4,
							}">
							{{
								question
									.aiReview
									.overallScore
							}}/10
						</span>
					</div>
				</div>
			</div>

			<!-- Review Categories -->
			<div class="space-y-4">
				<div
					class="bg-white p-4 rounded-lg border border-blue-100">
					<h4
						class="font-semibold text-blue-700 mb-2">
						Content Analysis
					</h4>
					<p
						class="text-gray-700 text-sm leading-relaxed">
						{{ question.aiReview.content }}
					</p>
				</div>

				<div
					class="bg-white p-4 rounded-lg border border-blue-100">
					<h4
						class="font-semibold text-blue-700 mb-2">
						Structure
					</h4>
					<p
						class="text-gray-700 text-sm leading-relaxed">
						{{
							question.aiReview
								.structure
						}}
					</p>
				</div>

				<div
					class="bg-white p-4 rounded-lg border border-blue-100">
					<h4
						class="font-semibold text-blue-700 mb-2">
						Grammar
					</h4>
					<p
						class="text-gray-700 text-sm leading-relaxed">
						{{ question.aiReview.grammar }}
					</p>
				</div>

				<div
					class="bg-white p-4 rounded-lg border border-blue-100">
					<h4
						class="font-semibold text-blue-700 mb-2">
						Vocabulary
					</h4>
					<p
						class="text-gray-700 text-sm leading-relaxed">
						{{
							question.aiReview
								.vocabulary
						}}
					</p>
				</div>

				<div
					class="bg-white p-4 rounded-lg border border-blue-100">
					<h4
						class="font-semibold text-blue-700 mb-2">
						Suggestions for Improvement
					</h4>
					<p
						class="text-gray-700 text-sm leading-relaxed">
						{{
							question.aiReview
								.suggestions
						}}
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
