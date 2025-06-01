// stores/testStore.js
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { z } from "zod";
import { mainFakeData } from "~/utils/fakeData/tests/testBank/main_fake_data";

export const useTestStore = defineStore("test", () => {
	// State
	const activeTab = ref<number>(1);
	const selectedQuestion = ref<string | null>(null);
	const validationErrors = ref<Record<string, string>>({});
	const hasErrors = ref(false);
	const partRefs = ref<Record<number, any>>({});
	const showResults = ref(false);
	const testResults = ref<{
		correctAnswers: number;
		totalQuestions: number;
	}>({
		correctAnswers: 0,
		totalQuestions: 0,
	});

	// Getters
	const getTestById = (id: string) => {
		return mainFakeData.find((item) => item.uid === id);
	};

	const getSelectedLessons = (
		testId: string,
		selectedParts: number[]
	) => {
		const test = getTestById(testId);
		return (
			test?.lessonsList.filter((lesson) =>
				selectedParts.includes(lesson.partNumber)
			) || []
		);
	};

	// Actions
	const setActiveTab = (tab: number) => {
		activeTab.value = tab;
	};

	const setSelectedQuestion = (questionId: string | null) => {
		selectedQuestion.value = questionId;
	};

	const setPartRef = (partNumber: number, ref: any) => {
		partRefs.value[partNumber] = ref;
	};

	const isQuestionAnswered = (
		questionId: string,
		selectedLessons: any[]
	) => {
		for (const lesson of selectedLessons) {
			const partRef = partRefs.value[lesson.partNumber];
			if (partRef && partRef.formState[questionId]) {
				return true;
			}
		}
		return false;
	};

	const validateForm = (selectedLessons: any[]) => {
		try {
			// Reset error state
			validationErrors.value = {};
			hasErrors.value = false;

			// Validate all questions are answered
			const allFormState = selectedLessons.reduce(
				(acc, lesson) => {
					const partRef =
						partRefs.value[
							lesson.partNumber
						];
					if (partRef) {
						return {
							...acc,
							...partRef.formState,
						};
					}
					return acc;
				},
				{}
			);

			// Create validation schema
			const validationSchema = selectedLessons.reduce(
				(acc, lesson) => {
					lesson.questions.forEach(
						(question: any) => {
							acc[question.id] = z
								.string()
								.min(
									1,
									"Please select an answer"
								);
						}
					);
					return acc;
				},
				{}
			);

			// Validate form state
			const result = z
				.object(validationSchema)
				.safeParse(allFormState);

			if (!result.success) {
				hasErrors.value = true;
				result.error.errors.forEach((error) => {
					const path = error.path[0] as string;
					validationErrors.value[path] =
						error.message;
				});
				return { success: false };
			}

			// Count correct answers
			let correctCount = 0;
			let totalQuestions = 0;
			selectedLessons.forEach((lesson) => {
				lesson.questions.forEach((question: any) => {
					totalQuestions++;
					if (
						allFormState[question.id] ===
						question.answer
					) {
						correctCount++;
					}
				});
			});

			// Set test results
			testResults.value = {
				correctAnswers: correctCount,
				totalQuestions,
			};

			return { success: true };
		} catch (error) {
			console.error("Validation error:", error);
			hasErrors.value = true;
			return { success: false };
		}
	};

	const resetTest = () => {
		validationErrors.value = {};
		hasErrors.value = false;
		partRefs.value = {};
		showResults.value = false;
		testResults.value = {
			correctAnswers: 0,
			totalQuestions: 0,
		};
		navigateTo("/tests");
	};

	const hideResults = () => {
		showResults.value = false;
	};

	return {
		// State
		activeTab,
		selectedQuestion,
		validationErrors,
		hasErrors,
		partRefs,
		showResults,
		testResults,

		// Getters
		getTestById,
		getSelectedLessons,

		// Actions
		setActiveTab,
		setSelectedQuestion,
		setPartRef,
		isQuestionAnswered,
		validateForm,
		resetTest,
		hideResults,
	};
});
