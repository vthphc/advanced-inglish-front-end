<script setup lang="ts">
import { ref, onMounted } from "vue";

interface WordInfo {
    word: string;
    definition: string;
    example?: string;
    audio?: string;
}

const wordInfo = ref<WordInfo | null>(null);
const isLoading = ref(true);
const error = ref<string | null>(null);
const STORAGE_KEY = "wordOfTheDay";

function saveWordToLocalStorage(wordInfo: WordInfo) {
    const data = {
        wordInfo,
        timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function getWordFromLocalStorage(): WordInfo | null {
    const dataStr = localStorage.getItem(STORAGE_KEY);
    if (!dataStr) return null;
    try {
        const data = JSON.parse(dataStr);
        // 24 hours = 86400000 ms
        if (Date.now() - data.timestamp < 86400000) {
            return data.wordInfo;
        }
        return null;
    } catch {
        return null;
    }
}

async function fetchWordOfTheDay() {
    isLoading.value = true;
    error.value = null;
    wordInfo.value = null;
    try {
        // 1. Get a random word
        const wordRes = await fetch(
            "https://random-word-api.vercel.app/api?words=1"
        );
        if (!wordRes.ok) throw new Error("Failed to fetch random word");
        const [word] = await wordRes.json();
        // 2. Get dictionary info
        const dictRes = await fetch(
            `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
        );
        if (!dictRes.ok)
            throw new Error("No dictionary entry found for this word");
        const dictData = await dictRes.json();
        // Find first definition and example
        const entry = dictData[0];
        let definition = "";
        let example = "";
        let audio = "";
        if (entry.meanings && entry.meanings.length > 0) {
            const firstMeaning = entry.meanings[0];
            if (
                firstMeaning.definitions &&
                firstMeaning.definitions.length > 0
            ) {
                definition = firstMeaning.definitions[0].definition;
                example = firstMeaning.definitions[0].example || "";
            }
        }
        if (entry.phonetics && entry.phonetics.length > 0) {
            const firstAudio = entry.phonetics.find((p: any) => p.audio);
            if (firstAudio) audio = firstAudio.audio;
        }
        wordInfo.value = {
            word: entry.word,
            definition,
            example,
            audio,
        };
        saveWordToLocalStorage(wordInfo.value); // Save to localStorage
    } catch (err: any) {
        error.value =
            "Could not fetch the word of the day. Please try again later.";
        // Optionally log error
        // console.error(err)
    } finally {
        isLoading.value = false;
    }
}

onMounted(() => {
    const cached = getWordFromLocalStorage();
    if (cached) {
        wordInfo.value = cached;
        isLoading.value = false;
    } else {
        fetchWordOfTheDay();
    }
});
</script>

<template>
    <div
        class="bg-slate-50 border-2 border-dashed border-slate-300 p-8 rounded-2xl"
    >
        <h3 class="text-2xl font-bold text-slate-800 mb-4 text-center">
            <span class="text-primary font-bold">Word</span> of the Day
        </h3>
        <div class="text-center">
            <template v-if="isLoading">
                <div class="animate-pulse">
                    <div
                        class="h-8 bg-slate-300 rounded w-1/3 mb-4 mx-auto"
                    ></div>
                    <div class="h-4 bg-slate-300 rounded w-full mb-2"></div>
                    <div class="h-4 bg-slate-300 rounded w-3/4 mx-auto"></div>
                </div>
            </template>
            <template v-else-if="error">
                <p class="text-red-500">{{ error }}</p>
                <button
                    class="mt-4 px-4 py-2 bg-brand-primary text-white rounded"
                    @click="fetchWordOfTheDay"
                >
                    Try Again
                </button>
            </template>
            <template v-else-if="wordInfo">
                <h4 class="text-4xl font-bold text-brand-primary mb-2">
                    {{ wordInfo.word }}
                </h4>
                <p class="text-slate-600 mb-3 text-lg">
                    {{ wordInfo.definition }}
                </p>
                <p v-if="wordInfo.example" class="text-slate-500 italic">
                    e.g. "{{ wordInfo.example }}"
                </p>
                <audio
                    v-if="wordInfo.audio"
                    :src="wordInfo.audio"
                    controls
                    class="mx-auto mt-4"
                />
            </template>
        </div>
    </div>
</template>
