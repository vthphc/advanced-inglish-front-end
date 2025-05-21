<script setup lang="ts">
	import { ref, onMounted } from "vue";
	import { useRoute } from "vue-router";
	import { useApi } from "~/composables/api/useApi";

	const route = useRoute();
	const api = useApi();
	const isLoading = ref(true);
	const message = ref("...Loading");

	onMounted(async () => {
		try {
			const id = route.params.id as string;
			await api.put(`/auth/verify-email/${id}`, {});
			message.value =
				"Successfully verified, now you can login!";
		} catch {
			message.value =
				"Failed to verify email. Please try again or contact support.";
		} finally {
			isLoading.value = false;
		}
	});
</script>

<template>
	<div class="">
		<h1>Verify Email</h1>
		<p>{{ message }}</p>
	</div>
</template>
