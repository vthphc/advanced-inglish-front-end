<script setup lang="ts">
	import { ref, onMounted, computed } from "vue";
	import { useRoute, useRouter } from "vue-router";
	import { useApi } from "~/composables/api/useApi";

	definePageMeta({
		title: "Inglish - Xác thực Email",
		layout: "verify",
	});

	const route = useRoute();
	const router = useRouter();
	const api = useApi();
	const isLoading = ref(true);
	const message = ref("Đang xác thực email...");
	const isSuccess = ref(false);
	const countdown = ref(5);

	const countdownText = computed(() => {
		return `Chuyển hướng về trang đăng nhập trong ${countdown.value} giây...`;
	});

	onMounted(async () => {
		try {
			const id = route.params.id as string;
			await api.put(`/auth/verify-email/${id}`, {});
			message.value = "Xác thực email thành công!";
			isSuccess.value = true;
		} catch {
			message.value =
				"Xác thực email thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ.";
			isSuccess.value = false;
		} finally {
			isLoading.value = false;
		}

		// Start countdown and redirect
		const timer = setInterval(() => {
			countdown.value--;
			if (countdown.value <= 0) {
				clearInterval(timer);
				router.push("/login");
			}
		}, 1000);
	});
</script>

<template>
	<div class="min-h-screen flex items-center justify-center p-4">
		<div class="max-w-md w-full">
			<!-- Card Container -->
			<div
				class="bg-white rounded-2xl shadow-2xl p-8 transform transition-all duration-500 hover:scale-105">
				<!-- Header -->
				<div class="text-center mb-8">
					<!-- Success/Error Icon -->
					<div
						class="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6"
						:class="
							isSuccess
								? 'bg-green-100'
								: 'bg-red-100'
						">
						<div
							v-if="isSuccess"
							class="text-green-600 text-4xl">
							<svg
								fill="currentColor"
								viewBox="0 0 20 20"
								class="w-12 h-12">
								<path
									fill-rule="evenodd"
									d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
									clip-rule="evenodd"></path>
							</svg>
						</div>
						<div
							v-else
							class="text-red-600 text-4xl">
							<svg
								fill="currentColor"
								viewBox="0 0 20 20"
								class="w-12 h-12">
								<path
									fill-rule="evenodd"
									d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
									clip-rule="evenodd"></path>
							</svg>
						</div>
					</div>

					<!-- Title -->
					<h1
						class="text-3xl font-bold text-gray-800 mb-2">
						{{
							isSuccess
								? "Xác thực thành công!"
								: "Xác thực thất bại"
						}}
					</h1>

					<!-- Subtitle -->
					<p class="text-gray-600 text-lg">
						{{
							isSuccess
								? "Email của bạn đã được xác thực"
								: "Không thể xác thực email"
						}}
					</p>
				</div>

				<!-- Loading Animation -->
				<div v-if="isLoading" class="text-center mb-6">
					<div
						class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
					<p class="text-gray-500 mt-2">
						Đang xử lý...
					</p>
				</div>

				<!-- Message -->
				<div v-else class="text-center mb-8">
					<div
						class="bg-gray-50 rounded-xl p-6 mb-6">
						<p
							class="text-gray-700 leading-relaxed"
							:class="
								isSuccess
									? 'text-green-700'
									: 'text-red-700'
							">
							{{ message }}
						</p>
					</div>

					<!-- Countdown -->
					<div
						v-if="isSuccess"
						class="bg-blue-50 rounded-xl p-4 border border-blue-200">
						<p
							class="text-blue-700 font-medium">
							{{ countdownText }}
						</p>
						<div
							class="mt-3 bg-blue-200 rounded-full h-2">
							<div
								class="bg-blue-600 h-2 rounded-full transition-all duration-1000"
								:style="{
									width: `${
										(countdown /
											5) *
										100
									}%`,
								}"></div>
						</div>
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="space-y-3">
					<button
						@click="router.push('/login')"
						class="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-purple-700 transform transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl">
						Đăng nhập ngay
					</button>

					<button
						@click="router.push('/')"
						class="w-full bg-gray-100 text-gray-700 font-medium py-3 px-6 rounded-xl hover:bg-gray-200 transform transition-all duration-200 hover:scale-105">
						Về trang chủ
					</button>
				</div>

				<!-- Footer -->
				<div
					class="text-center mt-8 pt-6 border-t border-gray-100">
					<p class="text-sm text-gray-500">
						© 2025 Inglish. Tất cả quyền
						được bảo lưu.
					</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	@keyframes fadeInUp {
		from {
			opacity: 0;
			transform: translateY(30px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	.min-h-screen {
		animation: fadeInUp 0.6s ease-out;
	}
</style>
