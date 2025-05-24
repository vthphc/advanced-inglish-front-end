<script setup lang="ts">
	import { useAuthStore } from "~/stores/auth";
	import { useApi } from "~/composables/api/useApi";
	import type { Dialogue } from "~/utils/types/dialogue";
	import DialogueItem from "~/components/dialogues/DialogueItem.vue";

	const authStore = useAuthStore();
	const api = useApi();

	// State for dialogues
	const dialogues = ref<Dialogue[]>([]);
	const isLoading = ref(true);
	const error = ref<string | null>(null);

	// Fetch dialogues for the current user
	const fetchDialogues = async () => {
		try {
			isLoading.value = true;
			error.value = null;

			if (!authStore.user?._id) {
				throw new Error("User not authenticated");
			}
			const response = await api.get<Dialogue[]>(
				`/dialogues/user/${authStore.user._id}`
			);
			console.log("API Response:", response);
			dialogues.value = response;
		} catch (err) {
			console.error("Error fetching dialogues:", err);
			error.value =
				"Failed to load dialogues. Please try again later.";
		} finally {
			isLoading.value = false;
		}
	};

	// Fetch dialogues when component mounts
	onMounted(() => {
		fetchDialogues();
	});
</script>

<template>
	<div class="container mx-auto p-4 md:p-6 lg:p-8">
		<h1
			class="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-300 pb-3 text-primary">
			My Dialogues
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
		<div v-else-if="!dialogues.length" class="text-center py-8">
			<p class="text-gray-500">
				No dialogues found. Start creating some!
			</p>
		</div>

		<!-- Dialogues list -->
		<div
			v-else
			class="bg-white shadow-md overflow-hidden sm:rounded-lg p-4">
			<ul
				role="list"
				class="divide-y gap-y-4 divide-gray-200 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-x-4">
				<DialogueItem
					v-for="dialogue in dialogues"
					:key="dialogue._id"
					:dialogue="dialogue" />
			</ul>
		</div>
	</div>
</template>
