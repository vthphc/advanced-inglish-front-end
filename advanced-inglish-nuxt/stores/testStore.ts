// stores/testStore.js
import { defineStore } from "pinia";

export const useTestStore = defineStore("test", {
    state: () => ({
        answers: {
            reading: {},
            listening: {},
            writing: {},
        },
        testId: null,
        startTime: null,
        // Optional: Track visited/completed status if needed later
        // sectionsStatus: { reading: false, listening: false, writing: false },
    }),
    actions: {
        updateAnswers(section, sectionAnswers) {
            if (this.answers[section] !== undefined) {
                // Use current state as base and merge new answers
                this.answers[section] = {
                    ...this.answers[section],
                    ...sectionAnswers,
                };
                console.log(
                    `Updated ${section} answers in store:`,
                    this.answers[section]
                );
            }
        },
        getAllAnswers() {
            return this.answers;
        },
        startTest(testId) {
            // Only reset if it's truly a new test instance
            if (this.testId !== testId || !this.startTime) {
                this.testId = testId;
                this.startTime = new Date();
                this.answers = {
                    reading: {},
                    listening: {},
                    writing: {},
                };
                console.log(`Test ${testId} started/reset.`);
            } else {
                console.log(`Resuming test ${testId}.`);
            }
        },
        resetTestState() {
            this.$reset();
            console.log("Test store reset.");
        },
    },
    persist: {
        // Make sure persistence is enabled if you want answers saved across refreshes
        storage: piniaPluginPersistedstate.localStorage(),
    },
});
