<script setup lang="ts">
import type { PropType } from "vue";

interface Phonetic {
    text: string;
    audioURL: string;
}

const props = defineProps({
    // topic: Corresponds to Flashcard.topic
    topic: {
        type: String,
        required: true,
    },
    // word: Corresponds to Flashcard.word
    word: {
        type: String,
        required: true,
    },
    // definition: Corresponds to Flashcard.definition
    definition: {
        type: String,
        required: true,
    },
    // example: Corresponds to Flashcard.example (optional)
    example: {
        type: String,
        required: false, // Optional field
        default: undefined,
    },
    // category: Corresponds to Flashcard.category
    category: {
        type: String,
        required: true,
        // Validator to ensure the category is one of the predefined types
        // validator: (value: string) => CATEGORIES.includes(value),
    },
    // phonetics: Corresponds to Flashcard.phonetics (array of Phonetic objects)
    phonetics: {
        type: Array as PropType<Phonetic[]>, // Use PropType for complex types
        required: true,
        // Basic validator to check if it's an array (more complex validation possible)
        // validator: (value: Phonetic[]) =>
        //     Array.isArray(value) &&
        //     value.every(
        //         (p) =>
        //             typeof p.text === "string" && typeof p.audioURL === "string"
        //     ),
    },
    // createdAt: Corresponds to Flashcard.createdAt
    // Often passed as String or Number (timestamp) for simplicity in props
    createdAt: {
        type: [Date, String, Number] as PropType<Date | string | number>,
        required: true,
    },
    // Optional: Add other props if needed, e.g., for interaction state
    // isActive: {
    //     type: Boolean,
    //     default: false,
    // }
});
const playAudio = (audioURL: string) => {
    const audio = new Audio(audioURL);
    audio.play().catch((error) => console.error("Error playing audio:", error));
};

// Helper to format date if needed
const formattedDate = computed(() => {
    if (!props.createdAt) return "";
    const date = new Date(props.createdAt);
    // Use options for DD/MM/YY format
    return date.toLocaleDateString("en-GB", {
        // en-GB locale often defaults to DD/MM/YYYY
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
});
</script>

<template>
    <li
        class="flex flex-col p-4 border rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200"
    >
        <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-semibold text-primary">{{ props.word }}</h3>
            <span
                class="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full capitalize"
                >{{ props.category }}</span
            >
        </div>
        <div class="mb-2">
            <p class="text-sm text-gray-700">{{ props.definition }}</p>
            <p v-if="props.example" class="text-sm text-gray-500 italic mt-1">
                e.g., "{{ props.example }}"
            </p>
        </div>
        <div
            v-if="props.phonetics && props.phonetics.length > 0"
            class="flex items-center gap-2 mb-2"
        >
            <span
                v-for="(phonetic, index) in props.phonetics"
                :key="index"
                class="text-sm text-gray-600"
            >
                {{ phonetic.text }}
                <!-- Optional: Add button to play audio -->
                <button
                    @click="playAudio(phonetic.audioURL)"
                    class="ml-1 text-blue-500 hover:text-blue-700"
                >
                    🔊
                </button>
            </span>
        </div>
        <div
            class="flex flex-1 justify-between items-end text-xs text-gray-400"
        >
            <span>Topic: {{ props.topic }}</span>
            <span>{{ formattedDate }}</span>
        </div>
    </li>
</template>

<style scoped>
/* Add any component-specific styles here */
</style>
