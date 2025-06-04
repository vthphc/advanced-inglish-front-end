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

        // Getters
        const getCurrentTest = computed(() => currentTest.value);
        const getSelectedParts = computed(() => selectedParts.value);
        const getSelectedLessons = computed(() => selectedLessons.value);

        // Actions
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
                        (lesson) => lesson.title === selectedTitle
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
            // Actions
            setCurrentTest,
            setSelectedParts,
            clearCurrentTest,
        };
    },
    {
        persist: {
            storage: piniaPluginPersistedstate.localStorage(),
        },
    }
);
