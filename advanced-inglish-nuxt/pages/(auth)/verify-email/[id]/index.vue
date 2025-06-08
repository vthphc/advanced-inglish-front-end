<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import { useRoute } from "vue-router";
	import { useApi } from "~/composables/api/useApi";

	definePageMeta({
		title: "Inglish - Đăng nhập",
		layout: "verify",
	});

	const route = useRoute();
	const api = useApi();
	const isLoading = ref(true);
	const message = ref("...Loading");

	onMounted(async () => {
		try {
			const id = route.params.id as string;
			await api.put(`/auth/verify-email/${id}`, {});
			message.value =
				"Xác thực email thành công, bây giờ bạn có thể đăng nhập!";
		} catch {
			message.value =
				"Xác thực email thất bại. Vui lòng thử lại hoặc liên hệ hỗ trợ.";
		} finally {
			isLoading.value = false;
		}
	});
</script>

<template>
	<div class="">
		<h1>Xác thực Email</h1>
		<p>{{ message }}</p>
	</div>
</template>
