<script setup lang="ts">
	import type { PropType } from "vue";
	import type { Dialogue } from "~/utils/types/dialogue";
	import DialogueInfo from "./DialogueInfo.vue";
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
		dialogue: {
			type: Object as PropType<Dialogue>,
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
					"Bạn cần đăng nhập để báo cáo đối thoại",
				color: "error",
			});
			return;
		}

		isSubmitting.value = true;

		try {
			await api.post("/reports/", {
				contentId: props.dialogue._id,
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

	// Helper to format date
	const formattedDate = computed(() => {
		if (!props.dialogue.createdAt) return "";
		const date = new Date(props.dialogue.createdAt);
		return date.toLocaleDateString("vi-VN", {
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

	const handleDelete = async () => {
		try {
			isDeleting.value = true;
			await api.delete(`/dialogues/${props.dialogue._id}`);
			toast.add({
				title: "Thành công",
				description: "Đã xóa đối thoại thành công!",
				color: "success",
			});
			emit("deleted", props.dialogue._id);
			showDeleteDialog.value = false;
		} catch (error) {
			console.error("Error deleting dialogue:", error);
			toast.add({
				title: "Lỗi",
				description:
					"Không thể xóa đối thoại. Vui lòng thử lại.",
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
				class="flex flex-col p-4 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow duration-200 cursor-pointer relative group">
				<div
					class="flex justify-between items-start mb-2">
					<h3
						class="text-lg font-semibold text-primary">
						{{ dialogue.topic }}
					</h3>
					<span
						class="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
						Đối thoại
					</span>
				</div>
				<div class="mb-2">
					<p
						class="text-left text-sm text-gray-700 line-clamp-2">
						{{ dialoguePreview }}
					</p>
				</div>
				<div
					class="flex flex-1 justify-between items-center text-xs text-gray-400">
					<span
						>{{
							dialogue.dialogue.length
						}}
						dòng</span
					>
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
										class="cursor-pointer p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
										title="Báo cáo đối thoại"
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
												đối
												thoại
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
												đối
												thoại
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
												">
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
								size="icon"
								variant="ghost"
								title="Xóa đối thoại"
								class="cursor-pointer p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
								@click.stop="
									showDeleteDialog = true
								">
								<Trash2
									class="w-4 h-4" />
							</Button>
						</div>
					</div>
				</div>

				<!-- Dialogue Info Dialog -->
				<DialogScrollContent class="sm:max-w-[625px]">
					<DialogueInfo :dialogue="dialogue" />
				</DialogScrollContent>
			</li>
		</DialogTrigger>
	</Dialog>

	<!-- Delete Confirmation Dialog -->
	<Dialog v-model:open="showDeleteDialog">
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Xóa Đối Thoại</DialogTitle>
				<DialogDescription>
					Bạn có chắc chắn muốn xóa đối thoại này?
					Hành động này không thể hoàn tác.
				</DialogDescription>
			</DialogHeader>
			<DialogFooter class="flex gap-2 justify-end">
				<Button
					class="rounded-md"
					@click="showDeleteDialog = false"
					:disabled="isDeleting">
					Hủy
				</Button>
				<Button
					variant="destructive"
					@click="handleDelete"
					:loading="isDeleting">
					Xóa
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>

<style scoped>
	/* Add any component-specific styles here */
</style>
