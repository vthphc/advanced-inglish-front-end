import { defineStore } from "pinia";
import type { PopulatedLesson } from "~/utils/types/lesson";

export const useHistoryStore = defineStore("history", {
    state: () => ({
        lessons: [] as PopulatedLesson[],
        isLoading: false,
        error: null as string | null,
    }),

    getters: {
        getLessons: (state) => state.lessons,
        isLoading: (state) => state.isLoading,
        getError: (state) => state.error,
    },

    actions: {
        setLoading(status: boolean) {
            this.isLoading = status;
        },

        setError(error: string | null) {
            this.error = error;
        },
    },
});
