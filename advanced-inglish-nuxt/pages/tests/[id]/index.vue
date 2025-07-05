<script setup lang="ts">
	import { reactive, onMounted, computed } from "vue";
	import { z } from "zod";
	import { countTestParts } from "~/utils/helpers";
	import { useApi } from "~/composables/api/useApi";
	import type { PopulatedTest } from "~/utils/types/test";
	import { useTestStore } from "~/stores/test";
	import type { TabsItem } from "@nuxt/ui";
	import { MessageCircle } from "lucide-vue-next";
	import CommentSection from "~/components/comments/CommentSection.vue";
	import Button from "~/components/ui/buttons/Button.vue";

	const route = useRoute();
	const { id } = route.params as { id: string };
	const testStore = useTestStore();
	const subItems = ref<string[]>([]);
	const api = useApi();

	onMounted(async () => {
		try {
			const response = await api.get<PopulatedTest>(
				`/tests/${id}`
			);
			testStore.setCurrentTest(response);
			testStore.setSelectedTestType(response.type);
			console.log("set selected test type:  ", response.type);
			subItems.value =
				testStore.currentTest?.lessonList.map(
					(lesson) => `${lesson.title}`
				) || [];
		} catch (error) {
			console.error("Error fetching test:", error);
		}
	});

	const formSchema = z.object({
		selectedParts: z
			.array(z.string())
			.min(1, "Vui lòng chọn ít nhất một phần"),
	});

	const formState = reactive({
		selectedParts: computed({
			get: () => testStore.selectedParts,
			set: (value) => testStore.setSelectedParts(value),
		}),
	});

	const items: TabsItem[] = [
		{
			label: "Luyện tập",
			// icon: "i-lucide-user",
			slot: "parts-select" as const,
		},

		{
			label: "Bình luận",
			icon: "i-lucide-message-circle",
			slot: "comments" as const,
		},
	];

	async function onSubmit() {
		try {
			const validatedData = formSchema.parse(formState);
			const partsParam =
				validatedData.selectedParts.join(",");
			console.log(
				"store selected parts: ",
				testStore.selectedParts
			);
			await navigateTo(
				`/tests/${id}/parts/${encodeURIComponent(
					partsParam
				)}`
			);
		} catch (error) {
			console.error("Validation error:", error);
		}
	}
</script>

<template>
	<div class="mx-auto p-8 shadow-md rounded-md">
		<div class="flex flex-col gap-y-4">
			<h1 class="text-3xl text-primary font-bold">
				{{
					testStore.currentTest?.title ||
					"No test found"
				}}
			</h1>
			<UTabs
				:items="items"
				variant="link"
				class="gap-4 w-full"
				:ui="{ trigger: 'grow' }">
				<template #parts-select="{ item }">
					<UForm
						:state="formState"
						@submit="onSubmit">
						<UCheckboxGroup
							v-model="
								formState.selectedParts
							"
							class="my-4"
							:items="subItems"
							color="primary" />
						<Button type="submit"
							>Bắt đầu
						</Button>
					</UForm>
				</template>

				<template #comments="{ item }">
					<CommentSection :testId="id" />
				</template>
			</UTabs>
		</div>
	</div>
</template>
