import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { PopulatedTest } from "~/utils/types/test";

export const useTestStore = defineStore("test", () => {
	// State
	const currentTest = ref<PopulatedTest | null>(null);
	const selectedParts = ref<string[]>([]);

	// Getters
	const getCurrentTest = computed(() => currentTest.value);
	const getSelectedParts = computed(() => selectedParts.value);

	// Actions
	const setCurrentTest = (test: PopulatedTest) => {
		currentTest.value = test;
	};

	const setSelectedParts = (parts: string[]) => {
		selectedParts.value = parts;
	};

	const clearCurrentTest = () => {
		currentTest.value = null;
		selectedParts.value = [];
	};

	function getSelectedLessonIds() {
		if (!currentTest.value) return [];

		return selectedParts.value
			.map((selectedTitle) => {
				const lesson =
					currentTest.value?.lessonList.find(
						(lesson) =>
							lesson.title ===
							selectedTitle
					);
				return lesson?._id;
			})
			.filter((id): id is string => id !== undefined);
	}

	return {
		// State
		currentTest,
		selectedParts,
		// Getters
		getCurrentTest,
		getSelectedParts,
		// Actions
		setCurrentTest,
		setSelectedParts,
		clearCurrentTest,
		getSelectedLessonIds,
	};
});
