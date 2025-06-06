<script setup lang="ts">
	import { Button } from "../ui/buttons";
	import Badge from "../ui/badge/Badge.vue";
	import {
		Card,
		CardContent,
		CardDescription,
		CardHeader,
		CardTitle,
	} from "../ui/card";
	import {
		XCircle,
		CreditCard,
		HelpCircle,
		ArrowLeft,
		RefreshCw,
		MessageCircle,
	} from "lucide-vue-next";
	import { computed } from "vue";

	const formattedDate = computed(() => {
		return new Date().toLocaleDateString("vi-VN", {
			year: "numeric",
			month: "long",
			day: "numeric",
		});
	});
</script>

<template>
	<div class="shadow-md rounded-md flex items-center justify-center p-8">
		<div class="w-full max-w-2xl space-y-8">
			<!-- Cancellation Header -->
			<div class="text-center space-y-4">
				<div
					class="mx-auto w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center">
					<XCircle
						class="w-12 h-12 text-orange-600" />
				</div>
				<div class="space-y-2">
					<h1
						class="text-3xl font-bold text-gray-900">
						Giao Dịch Đã Bị Hủy
					</h1>
					<p class="text-lg text-gray-600">
						Không có khoản phí nào được tính
						vào tài khoản của bạn
					</p>
				</div>
			</div>

			<!-- Main Cancellation Card -->
			<Card class="border-0 shadow-lg">
				<CardHeader class="text-center pb-4">
					<div
						class="flex items-center justify-center gap-2 mb-2">
						<Badge
							variant="secondary"
							class="bg-orange-100 text-orange-800 border-orange-200">
							Thanh Toán Đã Hủy
						</Badge>
					</div>
					<CardTitle class="text-2xl"
						>Thanh toán của bạn chưa được xử
						lý</CardTitle
					>
					<CardDescription class="text-base">
						Bạn đã hủy quá trình thanh toán.
						Đừng lo lắng - không có khoản
						phí nào được tính vào phương
						thức thanh toán của bạn.
					</CardDescription>
				</CardHeader>
				<CardContent class="space-y-6">
					<!-- Transaction Details -->
					<div
						class="bg-gray-50 rounded-lg p-4 space-y-2">
						<div
							class="flex justify-between items-center">
							<span
								class="text-sm text-gray-600"
								>Gói Dịch Vụ Đã
								Chọn</span
							>
							<span
								class="font-medium"
								>Premium Hàng
								Tháng</span
							>
						</div>
						<div
							class="flex justify-between items-center">
							<span
								class="text-sm text-gray-600"
								>Số Tiền</span
							>
							<span
								class="font-medium"
								>$5.00</span
							>
						</div>
						<div
							class="flex justify-between items-center">
							<span
								class="text-sm text-gray-600"
								>Trạng
								Thái</span
							>
							<Badge
								variant="outline"
								class="text-orange-600 border-orange-200">
								Đã Hủy
							</Badge>
						</div>
						<div
							class="flex justify-between items-center">
							<span
								class="text-sm text-gray-600"
								>Ngày</span
							>
							<span
								class="font-medium"
								>{{
									formattedDate
								}}</span
							>
						</div>
					</div>

					<!-- Current Plan Status -->
					<div
						class="bg-blue-50 border border-blue-200 rounded-lg p-4">
						<div
							class="flex items-start gap-3">
							<div
								class="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
							<div>
								<h3
									class="font-semibold text-blue-900">
									Gói Dịch
									Vụ Hiện
									Tại
								</h3>
								<p
									class="text-blue-700 text-sm mt-1">
									Bạn vẫn
									đang sử
									dụng
									<strong
										>Gói
										Miễn
										Phí</strong
									>
									với
									quyền
									truy cập
									vào tất
									cả các
									tính
									năng cơ
									bản. Bạn
									có thể
									nâng cấp
									bất cứ
									lúc nào
									khi sẵn
									sàng.
								</p>
							</div>
						</div>
					</div>

					<!-- What You Can Do Next -->
					<div class="space-y-4">
						<h3
							class="font-semibold text-lg">
							Bạn muốn làm gì tiếp
							theo?
						</h3>
						<div class="grid gap-4">
							<div
								class="flex items-center gap-4 p-4 shadow-sm bg-white rounded-lg hover:bg-gray-50 transition-colors">
								<div
									class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
									<RefreshCw
										class="w-5 h-5 text-green-600" />
								</div>
								<div
									class="flex-1">
									<h4
										class="font-medium">
										Thử
										thanh
										toán
										lại
									</h4>
									<p
										class="text-sm text-gray-600">
										Sẵn
										sàng
										nâng
										cấp?
										Hãy
										thử
										lại
										quá
										trình
										thanh
										toán.
									</p>
								</div>
								<NuxtLink
									to="/pricing">
									<Button
										class="w-full rounded-md border-primary">
										<CreditCard
											class="w-4 h-4 mr-2" />
										Thử
										Lại
									</Button>
								</NuxtLink>
							</div>

							<div
								class="flex items-center gap-4 p-4 shadow-sm bg-white rounded-lg hover:bg-gray-50 transition-colors">
								<div
									class="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
									<HelpCircle
										class="w-5 h-5 text-blue-600" />
								</div>
								<div
									class="flex-1">
									<h4
										class="font-medium">
										Cần
										Hỗ
										Trợ?
									</h4>
									<p
										class="text-sm text-gray-600">
										Gặp
										vấn
										đề
										với
										thanh
										toán?
										Đội
										ngũ
										hỗ
										trợ
										của
										chúng
										tôi
										sẵn
										sàng
										giúp
										đỡ.
									</p>
								</div>
								<NuxtLink
									to="/support">
									<Button
										class="rounded-lg">
										<MessageCircle
											class="w-4 h-4 mr-2" />
										Nhận
										Hỗ
										Trợ
									</Button>
								</NuxtLink>
							</div>
						</div>
					</div>

					<!-- Action Buttons -->
					<div
						class="flex flex-col sm:flex-row gap-3 pt-4 border-t">
						<NuxtLink
							to="/dashboard"
							class="flex-1">
							<Button
								class="w-full rounded-md border-primary">
								<ArrowLeft
									class="w-4 h-4 mr-2" />
								Về Trang Chính
							</Button>
						</NuxtLink>
						<NuxtLink
							to="/pricing"
							class="flex-1">
							<Button
								class="w-full rounded-md bg-white text-primary hover:bg-card">
								Xem Bảng Giá
							</Button>
						</NuxtLink>
					</div>

					<!-- Common Issues -->
					<div
						class="bg-amber-50 border border-amber-200 rounded-lg p-4">
						<h4
							class="font-medium text-amber-900 mb-2">
							Các lý do phổ biến dẫn
							đến hủy thanh toán:
						</h4>
						<ul
							class="text-sm text-amber-800 space-y-1">
							<li>
								• Cửa sổ thanh
								toán bị đóng
								trước khi hoàn
								tất
							</li>
							<li>
								• Sử dụng nút
								quay lại của
								trình duyệt
								trong quá trình
								thanh toán
							</li>
							<li>
								• Xác minh
								phương thức
								thanh toán thất
								bại
							</li>
							<li>
								• Phiên làm việc
								hết hạn
							</li>
						</ul>
					</div>
				</CardContent>
			</Card>

			<!-- Footer Note -->
			<!-- <div
				class="text-center text-sm text-gray-500 space-y-2">
				<p>
					Nếu bạn tiếp tục gặp vấn đề, vui lòng
					liên hệ với đội ngũ hỗ trợ của chúng
					tôi.
				</p>
				<p>
					<NuxtLink
						to="/contact"
						class="text-blue-600 hover:underline">
						Liên Hệ Hỗ Trợ
					</NuxtLink>
					{" • "}
					<NuxtLink
						to="/faq"
						class="text-blue-600 hover:underline">
						Câu Hỏi Thường Gặp
					</NuxtLink>
				</p>
			</div> -->
		</div>
	</div>
</template>
