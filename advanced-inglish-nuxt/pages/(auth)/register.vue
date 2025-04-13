<script setup lang="ts">
	import * as z from "zod";
	import type { FormSubmitEvent } from "@nuxt/ui";

	definePageMeta({
		title: "Register",
		layout: "auth",
	});

	useHead({
		title: "Register", // Updates reactively
	});

	const schema = z.object({
		username: z.string().min(5, "Must be at least 5 characters"),
		email: z.string().email("Invalid email"),
		password: z.string().min(8, "Must be at least 8 characters"),
		passwordConfirm: z
			.string()
			.min(8, "Must be at least 8 characters"),
	});

	type Schema = z.output<typeof schema>;

	const state = reactive<Partial<Schema>>({
		username: undefined,
		email: undefined,
		password: undefined,
		passwordConfirm: undefined,
	});

	const toast = useToast();
	async function onSubmit(event: FormSubmitEvent<Schema>) {
		toast.add({
			title: "Success",
			description: "The form has been submitted.",
			color: "success",
		});
		console.log(event.data);
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
				color="highlight" />
		</UFormField>
		<UFormField label="Tên người dùng" name="username">
			<UInput
				v-model="state.username"
				size="xl"
				color="highlight" />
		</UFormField>

		<UFormField label="Mật khẩu" name="password">
			<UInput
				v-model="state.password"
				size="xl"
				color="highlight"
				type="password" />
		</UFormField>
		<UFormField label="Nhập lại mật khẩu" name="passwordConfirm">
			<UInput
				v-model="state.passwordConfirm"
				size="xl"
				color="highlight"
				type="password" />
		</UFormField>
		<UButton
			class="cursor-pointer w-full justify-center text-center py-2 px-4 bg-primary text-white hover:bg-white hover:text-primary border-2 hover:border-primary rounded-2xl mt-8"
			type="submit">
			Đăng ký
		</UButton>
		<USeparator size="md" label="Hoặc đăng ký qua" />
		<div class="mt-6">
			<button
				class="cursor-pointer flex w-full items-center justify-center gap-3 rounded-2xl bg-white hover:bg-gray-100 border-gray-300 hover:border-gray-300 border-2 py-2 px-4 text-sm font-semibold leading-6 text-gray-900 transition-all duration-300">
				<svg
					class="h-5 w-5"
					aria-hidden="true"
					viewBox="0 0 24 24">
					<path
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						fill="#4285F4" />
					<path
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						fill="#34A853" />
					<path
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
						fill="#FBBC05" />
					<path
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						fill="#EA4335" />
					<path d="M1 1h22v22H1z" fill="none" />
				</svg>
				Google
			</button>
		</div>
	</UForm>
</template>
