<script setup lang="ts">
	import type { Flashcard } from "~/utils/types/flashcard";
	import {
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogFooter,
		DialogClose,
	} from "~/components/ui/dialog";

	const props = defineProps<{
		flashcard: Flashcard;
	}>();

	const playAudio = (audioURL: string | null) => {
		if (!audioURL) return;
		const audio = new Audio(audioURL);
		audio.play().catch((error) =>
			console.error("Error playing audio:", error)
		);
	};

	const formattedDate = computed(() => {
		if (!props.flashcard.createdAt) return "";
		const date = new Date(props.flashcard.createdAt);
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
		});
	});
</script>

<template>
	<DialogHeader>
		<DialogTitle class="text-2xl font-bold text-primary">
			{{ flashcard.word }}
		</DialogTitle>
		<DialogDescription class="text-sm text-gray-500">
			Created on {{ formattedDate }}
		</DialogDescription>
	</DialogHeader>

	<div class="space-y-4 py-4">
		<!-- Category -->
		<div class="flex items-center gap-2">
			<span class="text-sm font-medium text-gray-500"
				>Category:</span
			>
			<span
				class="text-sm font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full capitalize">
				{{ flashcard.category }}
			</span>
		</div>

		<!-- Topic -->
		<div class="flex items-center gap-2">
			<span class="text-sm font-medium text-gray-500"
				>Topic:</span
			>
			<span class="text-sm text-gray-700">{{
				flashcard.topic
			}}</span>
		</div>

		<!-- Definition -->
		<div class="space-y-1">
			<span class="text-sm font-medium text-gray-500"
				>Definition:</span
			>
			<p class="text-sm text-gray-700">
				{{ flashcard.definition }}
			</p>
		</div>

		<!-- Example -->
		<div v-if="flashcard.example" class="space-y-1">
			<span class="text-sm font-medium text-gray-500"
				>Example:</span
			>
			<p class="text-sm text-gray-700 italic">
				"{{ flashcard.example }}"
			</p>
		</div>

		<!-- Phonetics -->
		<div
			v-if="
				flashcard.phonetics &&
				flashcard.phonetics.length > 0
			"
			class="space-y-2">
			<span class="text-sm font-medium text-gray-500"
				>Pronunciation:</span
			>
			<div class="flex flex-wrap gap-2">
				<div
					v-for="(
						phonetic, index
					) in flashcard.phonetics"
					:key="index"
					class="flex items-center gap-1 bg-gray-50 px-2 py-1 rounded">
					<span class="text-sm text-gray-600">{{
						phonetic.text
					}}</span>
					<button
						v-if="phonetic.audio"
						class="text-blue-500 hover:text-blue-700"
						@click="
							playAudio(
								phonetic.audio
							)
						">
						🔊
					</button>
				</div>
			</div>
		</div>
	</div>

	<DialogFooter>
		<DialogClose />
	</DialogFooter>
</template>
