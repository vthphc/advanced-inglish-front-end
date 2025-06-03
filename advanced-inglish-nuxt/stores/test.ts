import { defineStore } from "pinia";
import type { PopulatedTest } from "~/utils/types/test";

export const useTestStore = defineStore("test", {
    state: () => ({
        currentTest: null as PopulatedTest | null,
    }),
    actions: {
        setCurrentTest(test: PopulatedTest) {
            this.currentTest = test;
        },
        clearCurrentTest() {
            this.currentTest = null;
        },
    },
});
