<script setup lang="ts">
	import Button from "~/components/ui/buttons/Button.vue";
	import ReadingPart from "~/components/tests/reading/ReadingPart.vue";
	import ListeningPart from "~/components/tests/listening/ListeningPart.vue";
	import { useTest } from "~/composables/useTest";
	import { onBeforeRouteLeave } from "vue-router";
	import { onMounted, onBeforeUnmount } from "vue";
	import { useTestStore } from "~/stores/test";
	import TestResults from "~/components/tests/TestResults.vue";

	definePageMeta({
		layout: "test",
	});

	const route = useRoute();
	const { id, parts } = route.params as { id: string; parts: string };

	const testStore = useTestStore();

	// Handle form submission
	async function onSubmit() {}

	// Handle route navigation
	onBeforeRouteLeave((to, from, next) => {
		if (
			window.confirm(
				"Bạn có chắc chắn muốn rời khỏi trang? Tiến trình làm bài của bạn có thể bị mất."
			)
		) {
			next();
		} else {
			next(false);
		}
	});

	// Handle page refresh
	const handleBeforeUnload = (e: BeforeUnloadEvent) => {
		e.preventDefault();
		e.returnValue =
			"Bạn có chắc chắn muốn tải lại trang? Tiến trình làm bài của bạn có thể bị mất.";
	};

	onMounted(() => {
		window.addEventListener("beforeunload", handleBeforeUnload);
		console.log(
			"Selected Lesson IDs:",
			testStore.getSelectedLessonIds()
		);
	});

	onBeforeUnmount(() => {
		window.removeEventListener("beforeunload", handleBeforeUnload);
	});
</script>

<template>
	<div>
		<h1></h1>
	</div>
</template>
