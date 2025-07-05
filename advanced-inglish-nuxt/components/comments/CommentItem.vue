<script setup lang="ts">
	import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
	import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
	import { Input } from "../ui/inputs";
	import { Label } from "../ui/labels";
	import type { Comment } from "~/utils/types/comment";
	import { useApi } from "~/composables/api/useApi";
	import { useAuthStore } from "~/stores/auth";
	import { Heart, Flag } from "lucide-vue-next";
	import { Button } from "~/components/ui/buttons";
	import { z } from "zod";
	import { useToast } from "#imports";

	const props = defineProps<{
		comment: Comment;
	}>();

	const authStore = useAuthStore();
	const api = useApi();
	const toast = useToast();

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
					"Bạn cần đăng nhập để báo cáo bình luận",
				color: "error",
			});
			return;
		}

		isSubmitting.value = true;

		try {
			await api.post("/reports/", {
				contentId: props.comment._id,
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
</script>

<template>
	<div class="p-4 rounded-md">
		<div class="flex flex-row gap-x-4">
			<Avatar class="h-10 w-10">
				<AvatarImage
					:src="
						authStore.user?.profile
							?.avatar || ''
					"
					:alt="authStore.user?.profile?.name" />
				<AvatarFallback>
					{{
						props.comment.user
							?.split(" ")
							.map(
								(n: string) =>
									n[0]
							)
							.join("")
					}}
				</AvatarFallback>
			</Avatar>
			<div class="flex flex-col gap-y-2 flex-1">
				<div class="flex items-center gap-x-2">
					<span class="font-semibold">{{
						props.comment.user
					}}</span>
					<span
						class="text-sm text-muted-foreground">
						{{
							new Date(
								props.comment.createdAt
							).toLocaleDateString()
						}}
					</span>
				</div>
				<p class="text-sm">
					{{ props.comment.content }}
				</p>
				<div class="flex items-center gap-x-2">
					<Button size="icon" variant="ghost">
						<Heart class="h-4 w-4" />
					</Button>

					<!-- Report Button with Popover -->
					<Popover v-model:open="isReportOpen">
						<PopoverTrigger as-child>
							<Button
								size="icon"
								variant="ghost">
								<Flag
									class="h-4 w-4" />
							</Button>
						</PopoverTrigger>
						<PopoverContent class="w-80 bg-white border-0 shadow-md">
							<div class="space-y-4">
								<div
									class="space-y-2">
									<h4
										class="font-medium leading-none">
										Báo
										cáo
										bình
										luận
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
										bình
										luận
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
				</div>
			</div>
		</div>
	</div>
</template>
