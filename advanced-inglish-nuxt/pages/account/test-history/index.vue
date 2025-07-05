<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import { useApi } from "~/composables/api/useApi";
	import { useAuthStore } from "~/stores/auth";
	import {
		Popover,
		PopoverContent,
		PopoverTrigger,
	} from "~/components/ui/popover";
	import { Input } from "~/components/ui/inputs";
	import { Label } from "~/components/ui/labels";
	import type { TakenTest, TakenTestsResponse } from "~/utils/types/test";
	import { ChevronLeft, Flag } from "lucide-vue-next";
	import { Button } from "~/components/ui/buttons";
	import { z } from "zod";
	import { useToast } from "#imports";

	definePageMeta({
		title: "Test History",
	});

	// State for taken tests
	const takenTests = ref<TakenTest[]>([]);
	const isLoading = ref(true);
	const error = ref<string | null>(null);

	// Report form state
	const isReportOpen = ref<string | null>(null);
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

	const authStore = useAuthStore();
	const api = useApi();
	const toast = useToast();

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

	const handleSubmitReport = async (testId: string) => {
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
				contentId: testId,
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
			isReportOpen.value = null;
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

	// Table headers configuration
	const tableHeaders = [
		{ key: "date", label: "Date" },
		{ key: "test", label: "Test" },
		{ key: "score", label: "Score" },
		{ key: "questions", label: "Questions" },
		{ key: "action", label: "Action" },
	];

	// // Optional: Define page meta if needed
	// definePageMeta({
	//     middleware: ["auth"], // This page requires authentication
	// });

	// Fetch taken tests from API
	const fetchTakenTests = async () => {
		try {
			const api = useApi();
			const response = await api.get<TakenTestsResponse>(
				"/auth/taken-tests/"
			);
			// Sort tests by date in descending order (newest first)
			takenTests.value = response.takenTests.sort(
				(a, b) =>
					new Date(b.takenAt).getTime() -
					new Date(a.takenAt).getTime()
			);
			console.log(response.takenTests);
		} catch (err: unknown) {
			error.value =
				err instanceof Error
					? err.message
					: "Failed to fetch test history";
			console.error("Error fetching test history:", err);
		} finally {
			isLoading.value = false;
		}
	};

	// Fetch tests when component mounts
	onMounted(() => {
		fetchTakenTests();
	});

	const router = useRouter();

	// Handle action click (view test details)
	const handleTestAction = (title: string, id: string) => {
		router.push(`/account/test-history/${id}`);
	};

	const handleBackClick = () => {
		router.push("/account/");
	};
</script>

<template>
	<div class="">
		<Button class="mb-4" size="icon" @click="handleBackClick"
			><ChevronLeft
		/></Button>
		<!-- Page Title -->
		<h1
			class="text-2xl md:text-3xl font-bold mb-6 border-b border-gray-300 pb-3 text-primary">
			Test History
		</h1>

		<!-- Loading state -->
		<div v-if="isLoading" class="text-center py-10">
			<p class="text-gray-500">Đang tải...</p>
		</div>

		<!-- Error state -->
		<div
			v-else-if="error"
			class="text-center text-red-500 mt-10 py-10 bg-red-50 rounded-lg">
			<p class="text-lg">{{ error }}</p>
		</div>

		<!-- Tests list -->
		<div
			v-else-if="takenTests && takenTests.length > 0"
			class="bg-white shadow-md overflow-hidden sm:rounded-lg">
			<div class="overflow-x-auto">
				<table
					class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th
								v-for="header in tableHeaders"
								:key="
									header.key
								"
								scope="col"
								class="px-3 sm:px-6 py-2 sm:py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
								{{
									header.label
								}}
							</th>
						</tr>
					</thead>
					<tbody
						class="bg-white divide-y divide-gray-200">
						<tr
							v-for="test in takenTests"
							:key="test.test._id"
							class="hover:bg-gray-50">
							<td
								class="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">
								{{
									new Date(
										test.takenAt
									).toLocaleDateString(
										"en-GB",
										{
											year: "numeric",
											month: "numeric",
											day: "numeric",
											hour: "2-digit",
											minute: "2-digit",
										}
									)
								}}
							</td>
							<td
								class="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
								<div
									class="text-xs sm:text-sm font-medium text-gray-900">
									{{
										test
											.test
											.topic
									}}
								</div>
							</td>
							<td
								class="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-center">
								<span
									:class="[
										'text-xs sm:text-sm font-bold',
										test.score >=
										70
											? 'text-green-600'
											: test.score >=
											  50
											? 'text-yellow-600'
											: 'text-red-600',
									]">
									{{
										test.score
									}}
								</span>
							</td>
							<td
								class="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500 text-center">
								{{
									test.lessons.reduce(
										(
											total,
											lesson
										) =>
											total +
											lesson
												.questions
												.length,
										0
									)
								}}
							</td>
							<td
								class="px-3 sm:px-6 py-2 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-center">
								<div
									class="flex items-center justify-center gap-2">
									<!-- Report Button with Popover -->
									<Popover
										:open="
											isReportOpen ===
											test._id
										"
										@update:open="
											(
												open
											) =>
												(isReportOpen =
													open
														? test._id
														: null)
										">
										<PopoverTrigger
											as-child>
											<Button
												size="icon"
												variant="ghost"
												class="p-1 rounded-full hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
												@click.stop="
													isReportOpen =
														test._id
												"
												title="Báo cáo bài kiểm tra">
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
														bài
														kiểm
														tra
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
														bài
														kiểm
														tra
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
															isReportOpen =
																null
														">
														Hủy
													</Button>
													<Button
														:disabled="
															isSubmitting
														"
														@click="
															handleSubmitReport(
																test._id
															)
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
										class="text-xs sm:text-sm"
										variant="ghost"
										@click="
											handleTestAction(
												test
													.test
													.topic,
												test._id
											)
										">
										Xem
										chi
										tiết
									</Button>
								</div>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>

		<!-- Empty state -->
		<div
			v-else
			class="text-center text-gray-500 mt-10 py-10 bg-gray-50 rounded-lg">
			<p class="text-lg">No test history found.</p>
			<p class="text-sm mt-2">
				Take some tests to see your history here.
			</p>
		</div>
	</div>
</template>
