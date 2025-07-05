<script setup lang="ts">
	import { Button } from "~/components/ui/buttons";
	import {
		Popover,
		PopoverContent,
		PopoverTrigger,
	} from "~/components/ui/popover";
	import { Input } from "~/components/ui/inputs";
	import { Label } from "~/components/ui/labels";
	import type { TakenTest } from "~/utils/types/test";
	import { useApi } from "~/composables/api/useApi";
	import { useAuthStore } from "~/stores/auth";
	import { Flag } from "lucide-vue-next";
	import { z } from "zod";
	import { useToast } from "#imports";

	const props = defineProps<{
		test: TakenTest;
		testTitle?: string;
	}>();

	const emit = defineEmits<{
		(e: "action-click", title: string, id: string): void;
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
					"Bạn cần đăng nhập để báo cáo bài kiểm tra",
				color: "error",
			});
			return;
		}

		isSubmitting.value = true;

		try {
			await api.post("/reports/", {
				contentId: props.test._id,
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

	// Format date for display
	const formatDate = (date: string): string => {
		const d = new Date(date);
		return d.toLocaleDateString("vi-VN", {
			year: "numeric",
			month: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	};

	// Calculate total questions
	const totalQuestions = computed(() => {
		return props.test.lessons.reduce((total, lesson) => {
			return total + lesson.questions.length;
		}, 0);
	});

	// Handle action click
	const handleActionClick = () => {
		emit(
			"action-click",
			props.testTitle || "Bài kiểm tra",
			props.test.test._id
		);
	};
</script>

<template>
	<li
		class="relative bg-white p-4 rounded-lg shadow hover:shadow-md transition-shadow">
		<div class="flex flex-col space-y-2">
			<!-- Test Title -->
			<h3 class="text-lg font-semibold text-gray-900">
				{{ testTitle || "Bài kiểm tra" }}
			</h3>

			<!-- Score -->
			<div class="flex items-center space-x-2">
				<span class="text-sm font-medium text-gray-500"
					>Điểm số:</span
				>
				<span
					:class="[
						'text-lg font-bold',
						test.score >= 70
							? 'text-green-600'
							: test.score >= 50
							? 'text-yellow-600'
							: 'text-red-600',
					]">
					{{ test.score }}
				</span>
			</div>

			<!-- Date and Questions -->
			<div class="flex flex-col space-y-1">
				<p class="text-sm text-gray-500">
					{{ formatDate(test.takenAt) }}
				</p>
				<p class="text-sm text-gray-500">
					Tổng số câu hỏi: {{ totalQuestions }}
				</p>
			</div>

			<!-- Action Buttons -->
			<div class="flex items-center gap-2">
				<!-- Report Button with Popover -->
				<Popover v-model:open="isReportOpen">
					<PopoverTrigger as-child>
						<Button
							size="icon"
							variant="ghost"
							class="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
							title="Báo cáo bài kiểm tra">
							<Flag class="w-4 h-4" />
						</Button>
					</PopoverTrigger>
					<PopoverContent
						class="w-80 bg-white border-0 shadow-md">
						<div class="space-y-4">
							<div class="space-y-2">
								<h4
									class="font-medium leading-none">
									Báo cáo
									bài kiểm
									tra
									không
									phù hợp
								</h4>
								<p
									class="text-sm text-muted-foreground">
									Vui lòng
									mô tả lý
									do báo
									cáo bài
									kiểm tra
									này
								</p>
							</div>
							<div class="space-y-2">
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
				<Button @click="handleActionClick"
					>Xem chi tiết</Button
				>
			</div>
		</div>
	</li>
</template>
