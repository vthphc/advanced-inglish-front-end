import { defineStore } from "pinia";
import { ref, computed } from "vue";
import type { PopulatedTest } from "~/utils/types/test";

export const useTestStore = defineStore("test", () => {
    // State
    const currentTest = ref<PopulatedTest | null>(null);

    // Getters
    const getCurrentTest = computed(() => currentTest.value);

    // Actions
    const setCurrentTest = (test: PopulatedTest) => {
        currentTest.value = test;
    };

    const clearCurrentTest = () => {
        currentTest.value = null;
    };

    return {
        // State
        currentTest,
        // Getters
        getCurrentTest,
        // Actions
        setCurrentTest,
        clearCurrentTest,
    };
});
