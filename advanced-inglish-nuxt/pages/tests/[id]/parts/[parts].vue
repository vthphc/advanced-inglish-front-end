<script setup lang="ts">
	import Button from "~/components/ui/buttons/Button.vue";
	import { onBeforeRouteLeave } from "vue-router";
	import { onMounted, onBeforeUnmount, ref } from "vue";
	import { useTestStore } from "~/stores/test";
	import { useAuthStore } from "~/stores/auth";
	import TestResults from "~/components/tests/TestResults.vue";
	import ReadingListeningQuestion from "~/components/tests/reading_listening/ReadingListeningQuestion.vue";
	import WritingQuestion from "~/components/tests/writing/WritingQuestion.vue";
	import WritingInstructions from "~/components/tests/writing/WritingInstructions.vue";
	import { Card } from "~/components/ui/card";
	import { z } from "zod";
	import { useApi } from "~/composables/api/useApi";
	import {
		Dialog,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogFooter,
	} from "~/components/ui/dialog";

	definePageMeta({
		layout: "test",
	});

	const route = useRoute();
	const { id, parts } = route.params as { id: string; parts: string };

	const testStore = useTestStore();
	const authStore = useAuthStore();
	const selectedLessons = testStore.selectedLessons;
	const currentLessonIndex = ref(0);
	const currentPartName = ref(selectedLessons[0]?.title);
	console.log("currentPartName:  ", currentPartName);

	// Track selected answers
	const selectedAnswers = ref<Record<string, string>>({});

	// Define validation schema
	const formSchema = z.object({
		answers: z.record(z.string(), z.string().optional()),
	});

	type FormData = z.infer<typeof formSchema>;

	const toast = useToast();

	// Track validation errors
	const validationErrors = ref<Record<string, string>>({});
	const api = useApi();

	// Add after other refs
	const showSuccessDialog = ref(false);

	// Handle form submission
	async function onSubmit() {
		try {
			// Reset validation errors
			validationErrors.value = {};

			// Check if all questions are answered
			const totalQuestions = selectedLessons.reduce(
				(count, lesson) =>
					count + lesson.questionsList.length,
				0
			);
			const answeredQuestions = Object.keys(
				selectedAnswers.value
			).length;

			if (answeredQuestions < totalQuestions) {
				toast.add({
					title: "Chưa hoàn thành",
					description:
						"Vui lòng trả lời tất cả các câu hỏi trước khi nộp bài!",
					color: "warning",
				});
				return;
			}

			// Format data for submission
			const submissionData = {
				userId: authStore.user?._id,
				lessons: selectedLessons.map((lesson: any) => ({
					lessonId: lesson._id,
					questions: lesson.questionsList
						.map((question: any) => {
							const selectedAnswer =
								selectedAnswers
									.value[
									question
										._id
								];
							if (
								selectedAnswer !==
								undefined
							) {
								return {
									questionId: question._id,
									selectedAnswer:
										selectedAnswer,
									questionType:
										question.type,
								};
							} else {
								return null;
							}
						})
						.filter(
							(question: any) =>
								question !==
								null
						),
				})),
			};

			// Check if any answers were selected
			const totalAnsweredQuestions =
				submissionData.lessons.reduce(
					(count, lesson) =>
						count + lesson.questions.length,
					0
				);

			if (totalAnsweredQuestions === 0) {
				toast.add({
					title: "Error",
					description:
						"Hãy chọn ít nhất một câu trả lời!",
					color: "error",
				});
				return;
			}

			try {
				const response = await api.post(
					`/tests/${id}/submit`,
					submissionData
				);
				console.log("Submission successful:", response);
				showSuccessDialog.value = true;
			} catch (apiError) {
				console.error(
					"API submission error:",
					apiError
				);
				toast.add({
					title: "Lỗi",
					description:
						"Có lỗi xảy ra khi nộp bài. Vui lòng thử lại!",
					color: "error",
				});
			}
		} catch (err) {
			console.error("Validation error:", err);
			if (err instanceof z.ZodError) {
				validationErrors.value = err.errors.reduce(
					(acc, error) => {
						const path = error
							.path[1] as string;
						acc[path] = error.message;
						return acc;
					},
					{} as Record<string, string>
				);
			}
		}
	}

	// Handle lesson selection
	function selectLesson(index: number, partName: string) {
		currentLessonIndex.value = index;
		currentPartName.value = partName;
	}

	// Check if a question has been answered
	function isQuestionAnswered(questionId: string): boolean {
		return selectedAnswers.value[questionId] !== undefined;
	}

	// Handle answer selection
	function handleAnswerSelect(questionId: string, answer: string) {
		selectedAnswers.value[questionId] = answer;
	}

	// Handle route navigation
	onBeforeRouteLeave((to, from, next) => {
		if (
			window.confirm(
				"Bạn có chắc chắn muốn rời khỏi trang? Tiến trình làm bài của bạn có thể bị mất."
			)
		) {
			next();
		} else {
			next(false);
		}
	});

	// Handle page refresh
	const handleBeforeUnload = (e: BeforeUnloadEvent) => {
		e.preventDefault();
		e.returnValue =
			"Bạn có chắc chắn muốn tải lại trang? Tiến trình làm bài của bạn có thể bị mất.";
	};

	onMounted(() => {
		window.addEventListener("beforeunload", handleBeforeUnload);
		console.log("[parts].vue selected lessons: ", selectedLessons);
	});

	onBeforeUnmount(() => {
		window.removeEventListener("beforeunload", handleBeforeUnload);
	});
</script>

<template>
	<div class="flex flex-col lg:flex-row gap-4">
		<Dialog v-model:open="showSuccessDialog">
			<DialogContent>
				<DialogHeader>
					<DialogTitle
						class="text-primary font-semibold"
						>Nộp bài thành
						công!</DialogTitle
					>
					<DialogDescription>
						Bài kiểm tra của bạn đã được nộp
						thành công. Bạn có muốn xem kết
						quả ngay bây giờ không?
					</DialogDescription>
				</DialogHeader>
				<DialogFooter class="sm:justify-start">
					<Button
						type="button"
						@click="
							navigateTo(
								`/account/test-history`
							)
						">
						Xem kết quả
					</Button>
					<Button
						type="button"
						variant="ghost"
						@click="navigateTo('/tests')">
						Quay lại danh sách bài kiểm tra
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
		<form
			class="flex-1 rounded-md shadow-md p-4"
			@submit.prevent="onSubmit">
			<div class="flex space-x-2 mb-4 border-b">
				<button
					v-for="(
						lesson, index
					) in selectedLessons"
					:key="index"
					type="button"
					class="px-4 py-2"
					:class="{
						'border-b-2 border-primary text-primary font-bold':
							currentLessonIndex ===
							index,
						'text-gray-500':
							currentLessonIndex !==
							index,
					}"
					@click="
						selectLesson(
							index,
							lesson.title
						)
					">
					{{ lesson.title }}
				</button>
			</div>
			<div class="flex flex-col lg:flex-row gap-4">
				<div
					v-if="
						testStore.getSelectedTestType ===
						'ReadingListening'
					"
					class="flex-1">
					<div
						v-for="(
							lesson, index
						) in selectedLessons"
						v-show="
							currentLessonIndex ===
							index
						"
						:key="index">
						<ReadingListeningQuestion
							v-for="(
								question, qIndex
							) in lesson.questionsList"
							:key="qIndex"
							:question="question"
							:index="qIndex"
							:selected-answer="
								selectedAnswers[
									question
										._id
								]
							"
							:validation-error="
								validationErrors[
									question
										._id
								]
							"
							@answer="
								handleAnswerSelect
							" />
					</div>
				</div>
				<div
					v-if="
						testStore.getSelectedTestType ===
						'Writing'
					"
					class="flex-1">
					<div
						v-for="(
							lesson, index
						) in selectedLessons"
						v-show="
							currentLessonIndex ===
							index
						"
						:key="index">
						<WritingInstructions
							:part="
								currentPartName
							" />
						<WritingQuestion
							v-for="(
								question, qIndex
							) in lesson.questionsList"
							:key="qIndex"
							:question="question"
							:index="qIndex"
							:selected-answer="
								selectedAnswers[
									question
										._id
								]
							"
							:validation-error="
								validationErrors[
									question
										._id
								]
							"
							@answer="
								handleAnswerSelect
							" />
					</div>
				</div>

				<!-- Side Panel -->
				<div
					class="lg:w-64 bg-gray-50 p-4 rounded-lg lg:sticky lg:top-4 lg:h-fit flex flex-col">
					<div class="space-y-4 flex-1">
						<Card
							v-for="(
								lesson,
								lessonIndex
							) in selectedLessons"
							:key="lessonIndex">
							<Card
								type="button"
								class="p-4 hover:cursor-pointer"
								:class="{
									'bg-primary hover:bg-primary':
										currentLessonIndex ===
										lessonIndex,
								}"
								@click="
									selectLesson(
										lessonIndex,
										lesson.title
									)
								">
								<div
									class="font-medium mb-2">
									{{
										lesson.title
									}}
								</div>
								<div
									class="grid grid-cols-5 gap-1">
									<button
										v-for="(
											question,
											questionIndex
										) in lesson.questionsList"
										:key="
											questionIndex
										"
										type="button"
										class="w-8 h-8 flex items-center justify-center rounded-full text-sm transition-colors"
										:class="{
											'bg-highlight text-white':
												isQuestionAnswered(
													question._id
												),
											'bg-gray-100 text-black':
												!isQuestionAnswered(
													question._id
												),
										}">
										{{
											questionIndex +
											1
										}}
									</button>
								</div>
							</Card>
						</Card>
					</div>
					<div class="mt-4 pt-4 border-t">
						<Button
							type="submit"
							class="w-full"
							>Nộp bài</Button
						>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>
