<script setup lang="ts">
	import type { PropType } from "vue";
	import type { Flashcard } from "~/utils/types/flashcard";

	const props = defineProps({
		flashcard: {
			type: Object as PropType<Flashcard>,
			required: true,
		},
	});

	const playAudio = (audioURL: string | null) => {
		if (!audioURL) return;
		const audio = new Audio(audioURL);
		audio.play().catch((error) =>
			console.error("Error playing audio:", error)
		);
	};

	// Helper to format date if needed
	const formattedDate = computed(() => {
		if (!props.flashcard.createdAt) return "";
		const date = new Date(props.flashcard.createdAt);
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
		class="flex flex-col p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200">
		<div class="flex justify-between items-start mb-2">
			<h3 class="text-lg font-semibold text-primary">
				{{ flashcard.word }}
			</h3>
			<span
				class="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full capitalize"
				>{{ flashcard.category }}</span
			>
		</div>
		<div class="mb-2">
			<p class="text-sm text-gray-700 line-clamp-2">
				{{ flashcard.definition }}
			</p>
			<p
				v-if="flashcard.example"
				class="text-sm text-gray-500 italic mt-1 line-clamp-2">
				<span class="font-bold not-italic"
					>Example:</span
				>
				"{{ flashcard.example }}"
			</p>
		</div>
		<div
			v-if="
				flashcard.phonetics &&
				flashcard.phonetics.length > 0
			"
			class="flex items-center gap-2 mb-2">
			<span
				v-for="(phonetic, index) in flashcard.phonetics"W
				:key="index"
				class="text-sm text-gray-600">
				{{ phonetic.text }}
				<!-- Optional: Add button to play audio -->
				<button
					v-if="phonetic.audio"
					@click="playAudio(phonetic.audio)"
					class="ml-1 text-blue-500 hover:text-blue-700">
					🔊
				</button>
			</span>
		</div>
		<div
			class="flex flex-1 justify-between items-end text-xs text-gray-400">
			<span>Topic: {{ flashcard.topic }}</span>
			<span>{{ formattedDate }}</span>
		</div>
	</li>
</template>

<style scoped>
	/* Add any component-specific styles here */
</style>
