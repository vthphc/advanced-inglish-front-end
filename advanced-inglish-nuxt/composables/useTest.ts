import { useTestStore } from "~/stores/testStore";

export const useTest = () => {
	const testStore = useTestStore();
	const route = useRoute();

	const parseSelectedParts = (parts: string) => {
		return parts
			.split(",")
			.map((part) => parseInt(part.replace("Part ", "")));
	};

	const scrollToQuestion = (questionId: string) => {
		testStore.setSelectedQuestion(questionId);
		const element = document.getElementById(questionId);
		if (element) {
			element.scrollIntoView({
				behavior: "smooth",
				block: "start",
			});
		}
	};

	const handleSubmit = async (selectedLessons: any[]) => {
		const result = testStore.validateForm(selectedLessons);

		if (result.success) {
			// TODO: Handle successful submission
			console.log("Form data:", result.data);
			return true;
		} else {
			// Find the first part with an error and switch to it
			const firstErrorPart = selectedLessons.find((lesson) =>
				lesson.questions.some(
					(q: any) =>
						testStore.validationErrors[q.id]
				)
			);
			if (firstErrorPart) {
				testStore.setActiveTab(
					firstErrorPart.partNumber
				);
			}
			return false;
		}
	};

	return {
		testStore,
		parseSelectedParts,
		scrollToQuestion,
		handleSubmit,
	};
};
