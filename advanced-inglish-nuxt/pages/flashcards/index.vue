<script setup lang="ts">
	import { useAuthStore } from "~/stores/auth";
	import { useApi } from "~/composables/api/useApi";
	import type { Flashcard } from "~/utils/types/flashcard";
	import FlashcardItem from "~/components/flashcards/listing/FlashcardItem.vue";
	import { Plus } from "lucide-vue-next";
	import { Button } from "~/components/ui/buttons";

	const authStore = useAuthStore();
	const api = useApi();

	// State for flashcards
	const flashcards = ref<Flashcard[]>([]);
	const isLoading = ref(true);
	const error = ref<string | null>(null);

	// Fetch flashcards for the current user
	const fetchFlashcards = async () => {
		try {
			isLoading.value = true;
			error.value = null;

			if (!authStore.user?._id) {
				throw new Error("User not authenticated");
			}
			const response = await api.get<Flashcard[]>(
				`/flashcards/user/${authStore.user._id}`
			);
			console.log("API Response:", response);
			flashcards.value = response;
		} catch (err) {
			console.error("Error fetching flashcards:", err);
			error.value =
				"Failed to load flashcards. Please try again later.";
		} finally {
			isLoading.value = false;
		}
	};

	// Fetch flashcards when component mounts
	onMounted(() => {
		fetchFlashcards();
	});
</script>

<template>
	<div class="relative min-h-screen">
		<div class="">
			<h1
				class="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-300 pb-3 text-primary">
				My Flashcards
			</h1>

			<!-- Loading state -->
			<div
				v-if="isLoading"
				class="flex justify-center items-center py-8">
				<div
					class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>

			<!-- Error state -->
			<div
				v-else-if="error"
				class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
				role="alert">
				<span class="block sm:inline">{{ error }}</span>
			</div>

			<!-- Empty state -->
			<div
				v-else-if="!flashcards.length"
				class="text-center py-8">
				<p class="text-gray-500">
					No flashcards found. Start creating
					some!
				</p>
			</div>

			<!-- Flashcards list -->
			<div
				v-else
				class="bg-white shadow-md overflow-hidden sm:rounded-lg p-4">
				<ul
					role="list"
					class="divide-y gap-y-4 divide-gray-200 md:grid md:grid-cols-4 md:gap-x-4">
					<FlashcardItem
						v-for="flashcard in flashcards"
						:key="flashcard._id"
						:flashcard="flashcard" />
				</ul>
			</div>
		</div>

		<!-- Floating Action Button -->
		<Button
			class="fixed bottom-6 right-6 w-14 h-14 rounded-full flex items-center justify-center"
			aria-label="Add new flashcard">
			<Plus class="w-6 h-6" />
		</Button>
	</div>
</template>
