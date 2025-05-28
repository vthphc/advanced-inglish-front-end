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

			// Create form schema dynamically based on questions
			const formSchema = z.object(
				selectedLessons.reduce((acc, lesson) => {
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
				}, {} as Record<string, z.ZodString>)
			);

			// Collect all form states from child components
			const allFormState = selectedLessons.reduce(
				(acc, lesson) => {
					const partRef =
						partRefs.value[
							lesson.partNumber
						];
					if (partRef) {
						Object.assign(
							acc,
							partRef.formState
						);
					}
					return acc;
				},
				{} as Record<string, string>
			);

			// Validate all form states
			formSchema.parse(allFormState);
			return { success: true, data: allFormState };
		} catch (error) {
			if (error instanceof z.ZodError) {
				hasErrors.value = true;
				validationErrors.value = error.errors.reduce(
					(acc, err) => {
						acc[err.path[0]] = err.message;
						return acc;
					},
					{} as Record<string, string>
				);
			}
			return { success: false, error };
		}
	};

	return {
		// State
		activeTab,
		selectedQuestion,
		validationErrors,
		hasErrors,
		partRefs,

		// Getters
		getTestById,
		getSelectedLessons,

		// Actions
		setActiveTab,
		setSelectedQuestion,
		setPartRef,
		isQuestionAnswered,
		validateForm,
	};
});
