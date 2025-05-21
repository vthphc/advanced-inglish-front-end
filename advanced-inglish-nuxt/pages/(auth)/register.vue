<script setup lang="ts">
	import * as z from "zod";
	import type { FormSubmitEvent } from "@nuxt/ui";
	import Button from "@/components/ui/buttons/Button.vue";
	import {
		CalendarDate,
		DateFormatter,
		getLocalTimeZone,
		type DateValue,
	} from "@internationalized/date";
	import { useAuthStore } from "~/stores/auth";
	import GoogleIcon from "~/assets/icons/GoogleIcon.vue";

	definePageMeta({
		title: "Inglish - Register",
		layout: "auth",
	});

	useHead({
		title: "Register", // Updates reactively
	});

	const df = new DateFormatter("vi-VN", {
		dateStyle: "medium",
	});

	const schema = z.object({
		name: z.string().min(2, "Must be at least 2 characters"),
		email: z.string().email("Invalid email"),
		dob: z.custom<DateValue>(),
		gender: z.string().min(1, "Please select a gender"),
		password: z.string().min(8, "Must be at least 8 characters"),
		passwordConfirm: z
			.string()
			.min(8, "Must be at least 8 characters"),
	});

	type Schema = z.output<typeof schema>;

	const state = reactive<{
		name?: string;
		email?: string;
		dob?: CalendarDate;
		gender: string;
		password?: string;
		passwordConfirm?: string;
	}>({
		name: undefined,
		email: undefined,
		dob: undefined,
		gender: "male",
		password: undefined,
		passwordConfirm: undefined,
	});

	// Watch for date changes
	watch(
		() => state.dob,
		(newDate) => {
			console.log(
				"Date changed:",
				df.format(newDate.toDate(getLocalTimeZone()))
			);
		},
		{ deep: true }
	);

	const genderOptions = ref([
		{ label: "Nam", value: "male" },
		{ label: "Nữ", value: "female" },
		{ label: "Khác", value: "other" },
	]);

	const toast = useToast();
	const router = useRouter();
	const authStore = useAuthStore();
	const isSubmitting = ref(false);

	async function onSubmit(event: FormSubmitEvent<Schema>) {
		if (
			!event.data.password ||
			event.data.password !== event.data.passwordConfirm
		) {
			toast.add({
				title: "Error",
				description: "Passwords do not match",
				color: "error",
			});
			return;
		}

		isSubmitting.value = true;
		try {
			// Format the date as a string (YYYY-MM-DD)
			const formattedDate = event.data.dob
				? `${event.data.dob.year}-${String(
						event.data.dob.month
				  ).padStart(2, "0")}-${String(
						event.data.dob.day
				  ).padStart(2, "0")}`
				: "";

			await authStore.register({
				name: event.data.name,
				email: event.data.email,
				password: event.data.password,
				dob: formattedDate,
				gender: event.data.gender,
			});

			toast.add({
				title: "Success",
				description: "Registration successful!",
				color: "success",
			});

			// Redirect to home page or login
			router.push("/");
		} catch (error: unknown) {
			// Check if it's the "User already exists" error
			const errorMessage =
				(
					error as {
						response?: {
							data?: {
								message?: string;
							};
						};
					}
				)?.response?.data?.message ===
				"User already exists"
					? "This email is already registered. Please use a different email or try logging in."
					: error instanceof Error
					? error.message
					: "Registration failed. Please try again.";

			toast.add({
				title: "Error",
				description: errorMessage,
				color: "error",
			});
		} finally {
			isSubmitting.value = false;
		}
	}
</script>

<template>
	<UForm
		:schema="schema"
		:state="state"
		class="space-y-4 *:my-2 flex flex-col"
		@submit="onSubmit">
		<UFormField label="Email" name="email">
			<UInput
				v-model="state.email"
				size="xl"
				color="highlight"
				class="min-w-[300px]" />
		</UFormField>
		<UFormField label="Tên" name="name">
			<UInput
				v-model="state.name"
				size="xl"
				color="highlight"
				class="min-w-[300px]" />
		</UFormField>
		<UFormField label="Ngày sinh" name="dob">
			<UPopover>
				<UButton
					color="neutral"
					variant="subtle"
					icon="i-lucide-calendar"
					class="min-w-[300px]">
					{{
						state.dob
							? df.format(
									state.dob.toDate(
										getLocalTimeZone()
									)
							  )
							: "Hãy chọn ngày sinh"
					}}
				</UButton>

				<template #content>
					<UCalendar
						v-model="state.dob"
						class="p-2" />
				</template>
			</UPopover>
		</UFormField>
		<UFormField label="Giới tính" name="gender">
			<USelect
				v-model="state.gender"
				class="min-w-[300px]"
				:items="genderOptions" />
		</UFormField>
		<UFormField label="Mật khẩu" name="password">
			<UInput
				v-model="state.password"
				size="xl"
				color="highlight"
				type="password"
				class="min-w-[300px]" />
		</UFormField>
		<UFormField label="Nhập lại mật khẩu" name="passwordConfirm">
			<UInput
				v-model="state.passwordConfirm"
				size="xl"
				color="highlight"
				type="password"
				class="min-w-[300px]" />
		</UFormField>
		<Button type="submit" :disabled="isSubmitting">
			{{ isSubmitting ? "Đang đăng ký..." : "Đăng ký" }}
		</Button>
		<USeparator size="md" label="Hoặc đăng ký qua" />
		<div class="mt-6">
			<Button>
				<GoogleIcon />
				Google
			</Button>
		</div>
	</UForm>
</template>
