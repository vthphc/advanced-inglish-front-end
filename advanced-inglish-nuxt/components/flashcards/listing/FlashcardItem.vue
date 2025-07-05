<script setup lang="ts">
	import type { PropType } from "vue";
	import type { Flashcard } from "~/utils/types/flashcard";
	import FlashcardInfo from "./FlashcardInfo.vue";
	import {
		Popover,
		PopoverContent,
		PopoverTrigger,
	} from "~/components/ui/popover";
	import { Input } from "~/components/ui/inputs";
	import { Label } from "~/components/ui/labels";
	import { Trash2, Flag } from "lucide-vue-next";
	import { useApi } from "~/composables/api/useApi";
	import { useAuthStore } from "~/stores/auth";
	import {
		Dialog,
		DialogScrollContent,
		DialogTrigger,
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogFooter,
	} from "~/components/ui/dialog";
	import { Button } from "~/components/ui/buttons";
	import { z } from "zod";
	import { useToast } from "#imports";

	const props = defineProps({
		flashcard: {
			type: Object as PropType<Flashcard>,
			required: true,
		},
	});

	const emit = defineEmits<{
		(e: "deleted", id: string): void;
	}>();

	const authStore = useAuthStore();
	const api = useApi();
	const toast = useToast();
	const isDeleting = ref(false);
	const showDeleteDialog = ref(false);

	// Report form state
	const isReportOpen = ref(false);
	const reportDescription = ref("");
	const isSubmitting = ref(false);

	// Zod validation schema for report form
	const reportSchema = z.object({
		description: z
			.string()
			.min(10, "Mô tả phải có ít nhất 10 ký tự")
			.max(500, "Mô tả không được quá 500 ký tự"),
	});

	// Report form validation
	const reportErrors = ref<{ description?: string }>({});

	const validateReportForm = () => {
		try {
			reportSchema.parse({
				description: reportDescription.value,
			});
			reportErrors.value = {};
			return true;
		} catch (error) {
			if (error instanceof z.ZodError) {
				reportErrors.value = {
					description: error.errors.find((e) =>
						e.path.includes("description")
					)?.message,
				};
			}
			return false;
		}
	};

	const handleSubmitReport = async () => {
		if (!validateReportForm()) {
			return;
		}

		if (!authStore.user?._id) {
			toast.add({
				title: "Lỗi",
				description:
					"Bạn cần đăng nhập để báo cáo thẻ học",
				color: "error",
			});
			return;
		}

		isSubmitting.value = true;

		try {
			await api.post("/reports/", {
				contentId: props.flashcard._id,
				description: reportDescription.value,
				userId: authStore.user._id,
			});

			toast.add({
				title: "Thành công",
				description: "Báo cáo đã được gửi thành công",
				color: "success",
			});

			// Reset form and close popover
			reportDescription.value = "";
			isReportOpen.value = false;
			reportErrors.value = {};
		} catch (error) {
			console.error("Error submitting report:", error);
			toast.add({
				title: "Lỗi",
				description:
					"Không thể gửi báo cáo. Vui lòng thử lại sau.",
				color: "error",
			});
		} finally {
			isSubmitting.value = false;
		}
	};

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

	const handleDelete = async () => {
		try {
			isDeleting.value = true;
			await api.delete(`/flashcards/${props.flashcard._id}`);
			toast.add({
				title: "Xóa thành công",
				description: "Thẻ học đã dược xóa thành công!",
				color: "success",
			});
			emit("deleted", props.flashcard._id);
			showDeleteDialog.value = false;
		} catch (error) {
			console.error("Error deleting flashcard:", error);
			toast.add({
				title: "Lỗi",
				description: "Xóa thất bại. Xin hãy thử lại.",
				color: "error",
			});
		} finally {
			isDeleting.value = false;
		}
	};
</script>

<template>
	<Dialog>
		<DialogTrigger>
			<li
				class="flex flex-col p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer">
				<div
					class="flex justify-between items-start mb-2">
					<h3
						class="text-lg font-semibold text-primary">
						{{ flashcard.word }}
					</h3>
					<span
						class="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full capitalize"
						>{{ flashcard.category }}</span
					>
				</div>
				<div class="mb-2">
					<p
						class="text-left text-sm text-gray-700 line-clamp-2">
						{{ flashcard.definition }}
					</p>
					<p
						v-if="flashcard.example"
						class="text-left text-sm text-gray-500 italic mt-1 line-clamp-2">
						<span
							class="font-bold not-italic"
							>Example:</span
						>
						"{{ flashcard.example }}"
					</p>
					<p
						class="text-left text-sm text-gray-500 mt-1">
						<span class="font-bold"
							>Topic:</span
						>
						{{ flashcard.topic }}
					</p>
				</div>
				<div
					v-if="
						flashcard.phonetics &&
						flashcard.phonetics.length > 0
					"
					class="flex items-center gap-2 mb-2">
					<span
						v-for="(
							phonetic, index
						) in flashcard.phonetics"
						:key="index"
						class="text-sm text-gray-600">
						{{ phonetic.text }}
						<!-- Optional: Add button to play audio -->
						<button
							v-if="phonetic.audio"
							class="ml-1 text-blue-500 hover:text-blue-700"
							@click.stop="
								playAudio(
									phonetic.audio
								)
							">
							🔊
						</button>
					</span>
				</div>
				<div
					class="flex flex-1 justify-between items-end text-xs text-gray-400">
					<div class="flex items-center gap-2">
						<span>{{ formattedDate }}</span>
						<div
							class="flex items-center gap-1">
							<!-- Report Button with Popover -->
							<Popover
								v-model:open="
									isReportOpen
								">
								<PopoverTrigger
									as-child>
									<Button
										size="icon"
										variant="ghost"
										class="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
										@click.stop>
										<Flag
											class="w-4 h-4" />
									</Button>
								</PopoverTrigger>
								<PopoverContent
									class="w-80 bg-white border-0 shadow-md">
									<div
										class="space-y-4">
										<div
											class="space-y-2">
											<h4
												class="font-medium leading-none">
												Báo
												cáo
												thẻ
												học
												không
												phù
												hợp
											</h4>
											<p
												class="text-sm text-muted-foreground">
												Vui
												lòng
												mô
												tả
												lý
												do
												báo
												cáo
												thẻ
												học
												này
											</p>
										</div>
										<div
											class="space-y-2">
											<Label
												for="description"
												>Mô
												tả</Label
											>
											<Input
												id="description"
												v-model="
													reportDescription
												"
												placeholder="Nhập lý do báo cáo..."
												:class="{
													'border-red-500':
														reportErrors.description,
												}" />
											<p
												v-if="
													reportErrors.description
												"
												class="text-sm text-red-500">
												{{
													reportErrors.description
												}}
											</p>
										</div>
										<div
											class="flex justify-end gap-x-2">
											<Button
												variant="outline"
												:disabled="
													isSubmitting
												"
												@click="
													isReportOpen = false
												">
												Hủy
											</Button>
											<Button
												:disabled="
													isSubmitting
												"
												@click="
													handleSubmitReport
												"
												@click.stop>
												{{
													isSubmitting
														? "Đang gửi..."
														: "Gửi báo cáo"
												}}
											</Button>
										</div>
									</div>
								</PopoverContent>
							</Popover>
							<Button
								variant="ghost"
								size="icon"
								class="cursor-pointer p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
								title="Xóa thẻ học"
								@click.stop="
									showDeleteDialog = true
								">
								<Trash2
									class="w-4 h-4" />
							</Button>
						</div>
					</div>
				</div>

				<DialogScrollContent class="sm:max-w-[500px]">
					<FlashcardInfo :flashcard="flashcard" />
				</DialogScrollContent>
			</li>
		</DialogTrigger>
	</Dialog>

	<!-- Delete Confirmation Dialog -->
	<Dialog v-model:open="showDeleteDialog">
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Xóa thẻ học</DialogTitle>
				<DialogDescription>
					Bạn có chắc chắn muốn xóa thẻ học? Bạn
					sẽ không thể hoàn tác!
				</DialogDescription>
			</DialogHeader>
			<DialogFooter class="flex gap-2 justify-end">
				<Button
					class="rounded-md"
					:disabled="isDeleting"
					@click="showDeleteDialog = false">
					Hủy
				</Button>
				<Button
					variant="destructive"
					:loading="isDeleting"
					@click="handleDelete">
					Xóa
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>

<style scoped>
	/* Add any component-specific styles here */
</style>
