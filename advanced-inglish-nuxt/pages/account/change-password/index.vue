<script setup lang="ts">
	import { useAuthStore } from "~/stores/auth";
	import Input from "~/components/ui/inputs/Input.vue";
	import Button from "~/components/ui/buttons/Button.vue";
	import Label from "~/components/ui/labels/Label.vue";
	import { useApi } from "~/composables/api/useApi";
	import { z } from "zod";
	import { useToast } from "#imports";
	import { useRouter } from "vue-router";

	const authStore = useAuthStore();
	const api = useApi();
	const toast = useToast();
	const router = useRouter();
	const isSubmitting = ref(false);
	const error = ref<string | null>(null);

	// Define validation schema
	const formSchema = z
		.object({
			currentPassword: z
				.string()
				.min(1, "Mật khẩu hiện tại là bắt buộc"),
			newPassword: z
				.string()
				.min(8, "Mật khẩu mới phải có ít nhất 8 ký tự")
				.regex(
					/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
					"Mật khẩu phải chứa ít nhất một chữ hoa, một chữ thường, một số và một ký tự đặc biệt"
				),
			confirmPassword: z
				.string()
				.min(1, "Xác nhận mật khẩu là bắt buộc"),
		})
		.refine((data) => data.newPassword === data.confirmPassword, {
			message: "Mật khẩu xác nhận không khớp",
			path: ["confirmPassword"],
		});

	type FormField = {
		id: "currentPassword" | "newPassword" | "confirmPassword";
		label: string;
		type: "password";
	};

	type FormData = z.infer<typeof formSchema>;

	const formData = ref<FormData>({
		currentPassword: "",
		newPassword: "",
		confirmPassword: "",
	});

	const formFields: FormField[] = [
		{
			id: "currentPassword",
			label: "Mật khẩu hiện tại",
			type: "password",
		},
		{
			id: "newPassword",
			label: "Mật khẩu mới",
			type: "password",
		},
		{
			id: "confirmPassword",
			label: "Xác nhận mật khẩu mới",
			type: "password",
		},
	];

	const handleSubmit = async () => {
		try {
			isSubmitting.value = true;
			error.value = null;

			// Validate form data
			const validatedData = formSchema.parse(formData.value);

			// Make API request
			await api.put("/auth/change-password", {
				currentPassword: validatedData.currentPassword,
				newPassword: validatedData.newPassword,
			});

			toast.add({
				title: "Thành công",
				description:
					"Mật khẩu đã được thay đổi thành công.",
				color: "success",
			});

			// Reset form
			formData.value = {
				currentPassword: "",
				newPassword: "",
				confirmPassword: "",
			};

			// Navigate back to account page
			router.push("/account");
		} catch (err) {
			console.error("Error changing password:", err);
			if (err instanceof z.ZodError) {
				error.value = err.errors[0].message;
			} else {
				error.value =
					"Có lỗi xảy ra khi thay đổi mật khẩu. Vui lòng thử lại sau.";
			}
			toast.add({
				title: "Lỗi",
				description: error.value,
				color: "error",
			});
		} finally {
			isSubmitting.value = false;
		}
	};

	const handleCancel = () => {
		// Reset form
		formData.value = {
			currentPassword: "",
			newPassword: "",
			confirmPassword: "",
		};
		error.value = null;

		// Navigate to account page
		router.push("/account");
	};
</script>

<template>
	<div class="mx-auto p-4 max-w-[900px]">
		<h1 class="text-5xl text-primary font-bold mb-6">
			Thay đổi mật khẩu
		</h1>

		<form class="mx-auto" @submit.prevent="handleSubmit">
			<div class="space-y-4">
				<div
					v-for="field in formFields"
					:key="field.id"
					class="space-y-2">
					<Label
						:for="field.id"
						class="block font-bold text-xl"
						>{{ field.label }}</Label
					>
					<Input
						:id="field.id"
						v-model="formData[field.id]"
						class="py-4"
						:type="field.type"
						:disabled="isSubmitting" />
				</div>

				<!-- Error message -->
				<div
					v-if="error"
					class="text-red-500 text-sm mt-2">
					{{ error }}
				</div>

				<div class="flex justify-end space-x-4 mt-6">
					<Button
						variant="ghost"
						size="xl"
						type="button"
						:disabled="isSubmitting"
						@click="handleCancel">
						Hủy
					</Button>
					<Button
						size="xl"
						type="submit"
						:loading="isSubmitting"
						:disabled="isSubmitting">
						{{
							isSubmitting
								? "Đang lưu..."
								: "Thay đổi mật khẩu"
						}}
					</Button>
				</div>
			</div>
		</form>
	</div>
</template>
