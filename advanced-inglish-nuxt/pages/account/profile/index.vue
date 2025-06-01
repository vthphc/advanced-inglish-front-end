<script setup lang="ts">
	import { useAuthStore } from "~/stores/auth";
	import Input from "~/components/ui/inputs/Input.vue";
	import Button from "~/components/ui/buttons/Button.vue";
	import Label from "~/components/ui/labels/Label.vue";
	import { formatDate, formatDateToISO } from "~/utils/helpers";

	const authStore = useAuthStore();
	const user = computed(() => authStore.getUser);
	console.log(user.value);

	type FormField = {
		id: "name" | "email" | "dob";
		label: string;
		type: "text" | "email" | "date";
		disabled: boolean;
	};

	type FormData = {
		name: string;
		email: string;
		dob: string;
	};

	const formData = ref<FormData>({
		name: user.value?.profile.name || "",
		email: user.value?.email || "",
		dob: formatDate(user.value?.profile.dob || null) || "",
	});

	const formFields: FormField[] = [
		{
			id: "name",
			label: "Tên người dùng",
			type: "text",
			disabled: false,
		},
		{
			id: "email",
			label: "Email",
			type: "email",
			disabled: true,
		},
		{
			id: "dob",
			label: "Ngày sinh",
			type: "text",
			disabled: false,
		},
	];

	const handleSubmit = async () => {
		// Convert dob back to ISO format before submitting
		const submitData = {
			...formData.value,
			dob: formatDateToISO(formData.value.dob),
		};
		console.log("Form submitted:", submitData);
	};

	const handleCancel = () => {
		// Reset form to original values
		formData.value = {
			name: user.value?.profile.name || "",
			email: user.value?.email || "",
			dob: formatDate(user.value?.profile.dob || null) || "",
		};
	};
</script>

<template>
	<div class="mx-auto p-4 max-w-[900px]">
		<h1 class="text-5xl font-bold mb-6">Chỉnh sửa hồ sơ</h1>

		<form class="mx-auto" @submit.prevent="handleSubmit">
			<div class="space-y-4">
				<div
					v-for="field in formFields"
					:key="field.id"
					class="">
					<Label :for="field.id">{{
						field.label
					}}</Label>
					<Input
						:id="field.id"
						v-model="formData[field.id]"
						:type="field.type"
						:disabled="field.disabled" />
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
