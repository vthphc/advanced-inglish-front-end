<script setup lang="ts">
	import type { PropType } from "vue";
	import type { Dialogue } from "~/utils/types/dialogue";
	import DialogueInfo from "./DialogueInfo.vue";

	const props = defineProps({
		dialogue: {
			type: Object as PropType<Dialogue>,
			required: true,
		},
	});

	const isDialogOpen = ref(false);

	// Helper to format date
	const formattedDate = computed(() => {
		if (!props.dialogue.createdAt) return "";
		const date = new Date(props.dialogue.createdAt);
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "2-digit",
			year: "2-digit",
		});
	});

	// Get preview of dialogue
	const dialoguePreview = computed(() => {
		if (!props.dialogue.dialogue.length) return "";
		return props.dialogue.dialogue[0].line;
	});
</script>

<template>
	<li
		class="flex flex-col p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer"
		@click="isDialogOpen = true">
		<div class="flex justify-between items-start mb-2">
			<h3 class="text-lg font-semibold text-primary">
				{{ dialogue.topic }}
			</h3>
			<span
				class="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
				Dialogue
			</span>
		</div>
		<div class="mb-2">
			<p class="text-sm text-gray-700 line-clamp-2">
				{{ dialoguePreview }}
			</p>
		</div>
		<div
			class="flex flex-1 justify-between items-end text-xs text-gray-400">
			<span>{{ dialogue.dialogue.length }} lines</span>
			<span>{{ formattedDate }}</span>
		</div>

		<!-- Dialogue Info Dialog -->
		<DialogueInfo
			v-model:is-open="isDialogOpen"
			:dialogue="dialogue" />
	</li>
</template>

<style scoped>
	/* Add any component-specific styles here */
</style>
