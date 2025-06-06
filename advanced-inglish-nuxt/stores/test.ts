import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import type { PopulatedTest } from "~/utils/types/test";

export const useTestStore = defineStore(
	"test",
	() => {
		// State
		const currentTest = ref<PopulatedTest | null>(null);
		const selectedParts = ref<string[]>([]);
		const selectedLessons = ref<any[]>([]);
		const selectedTestType = ref<string>();

		// Getters
		const getCurrentTest = computed(() => currentTest.value);
		const getSelectedParts = computed(() => selectedParts.value);
		const getSelectedLessons = computed(
			() => selectedLessons.value
		);
		const getSelectedTestType = computed(
			() => selectedTestType.value
		);

		// Actions
		const setSelectedTestType = (type: string) => {
			selectedTestType.value = type;
			updateSelectedLessons();
		};
		const setCurrentTest = (test: PopulatedTest) => {
			currentTest.value = test;
			updateSelectedLessons();
		};

		const setSelectedParts = (parts: string[]) => {
			selectedParts.value = parts;
			updateSelectedLessons();
		};

		const clearCurrentTest = () => {
			currentTest.value = null;
			selectedParts.value = [];
			selectedLessons.value = [];
		};

		function updateSelectedLessons() {
			if (!currentTest.value) {
				selectedLessons.value = [];
				return;
			}

			selectedLessons.value = selectedParts.value
				.map((selectedTitle) =>
					currentTest.value?.lessonList.find(
						(lesson) =>
							lesson.title ===
							selectedTitle
					)
				)
				.filter(Boolean);
		}

		return {
			// State
			currentTest,
			selectedParts,
			selectedLessons,
			// Getters
			getCurrentTest,
			getSelectedParts,
			getSelectedLessons,
			getSelectedTestType,
			// Actions
			setCurrentTest,
			setSelectedParts,
			clearCurrentTest,
			setSelectedTestType,
		};
	},
	{
		persist: {
			storage: piniaPluginPersistedstate.localStorage(),
		},
	}
);
