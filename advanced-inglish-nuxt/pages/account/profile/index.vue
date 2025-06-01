<script setup lang="ts">
	import { useAuthStore } from "~/stores/auth";
	import Input from "~/components/ui/inputs/Input.vue";
	import Button from "~/components/ui/buttons/Button.vue";
	import Label from "~/components/ui/labels/Label.vue";

	const authStore = useAuthStore();
	const user = computed(() => authStore.getUser);

	const formData = ref({
		name: user.value?.profile.name || "",
		email: user.value?.email || "",
		dob: user.value?.profile.dob || "",
	});

	const handleSubmit = async () => {
		// TODO: Implement profile update logic
		console.log("Form submitted:", formData.value);
	};

	const handleCancel = () => {
		// Reset form to original values
		formData.value = {
			name: user.value?.profile.name || "",
			email: user.value?.email || "",
			dob: user.value?.profile.dob || "",
		};
	};
</script>

<template>
	<div class="container mx-auto p-4">
		<h1 class="text-2xl font-bold mb-6">Chỉnh sửa hồ sơ</h1>

		<form @submit.prevent="handleSubmit" class="max-w-md">
			<div class="space-y-4">
				<div>
					<Label for="name">Tên người dùng</Label>

					<Input
						id="name"
						v-model="formData.name"
						type="text"
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
				</div>

				<div>
					<Label
						for="email"
						class="block text-sm font-medium text-gray-700"
						>Email</Label
					>
					<Input
						id="email"
						v-model="formData.email"
						type="email"
						disabled
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-50" />
				</div>

				<div>
					<Label
						for="dob"
						class="block text-sm font-medium text-gray-700"
						>Ngày sinh</Label
					>
					<Input
						id="dob"
						v-model="formData.dob"
						type="date"
						class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
				</div>

				<div class="flex justify-end space-x-4 mt-6">
					<Button
						type="button"
						@click="handleCancel">
						Hủy
					</Button>
					<Button type="submit">
						Lưu hồ sơ
					</Button>
				</div>
			</div>
		</form>
	</div>
</template>
