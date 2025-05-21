<script setup lang="ts">
	import { Copy } from "lucide-vue-next";
	import Button from "@/components/ui/buttons/Button.vue";
	import Dialog from "~/components/ui/dialog/Dialog.vue";
	import {
		DialogContent,
		DialogHeader,
		DialogTitle,
		DialogDescription,
		DialogFooter,
		DialogTrigger,
	} from "~/components/ui/dialog";
	import Label from "~/components/ui/labels/Label.vue";
	import Input from "~/components/ui/inputs/Input.vue";
	import { useAuthStore } from "~/stores/auth";

	definePageMeta({
		title: "Inglish - Verify Email",
		layout: "auth",
	});

	useHead({
		title: "Verify Email",
	});

	const router = useRouter();
	const authStore = useAuthStore();
	const email = ref("");
	const isDialogOpen = ref(false);

	// Get email from query parameters or auth store
	onMounted(() => {
		const route = useRoute();
		if (route.query.email) {
			email.value = route.query.email as string;
		} else if (authStore.user?.email) {
			email.value = authStore.user.email;
		}
	});

	function goToHome() {
		router.push("/");
	}
</script>

<template>
	<div>
		<div
			class="flex flex-col items-center space-y-6 max-w-lg mx-auto">
			<h1 class="text-2xl font-bold">Dialog demo page</h1>

			<p
				class="text-sm text-gray-600 dark:text-gray-400 text-center">
				Please check your email inbox and click the
				verification link to verify your account. If you
				don't see the email, check your spam folder.
			</p>

			<div class="flex justify-center mt-4">
				<Dialog>
					<DialogTrigger as-child>
						<Button> Share </Button>
					</DialogTrigger>
					<DialogContent class="sm:max-w-md">
						<DialogHeader>
							<DialogTitle
								>Share
								link</DialogTitle
							>
							<DialogDescription>
								Anyone who has
								this link will
								be able to view
								this.
							</DialogDescription>
						</DialogHeader>
						<div
							class="flex items-center space-x-2">
							<div
								class="grid flex-1 gap-2">
								<Label
									for="link"
									class="sr-only">
									Link
								</Label>
								<Input
									id="link"
									default-value="https://shadcn-vue.com/docs/installation"
									read-only />
							</div>
						</div>
						<DialogFooter
							class="sm:justify-start">
							<DialogClose as-child>
								<Button
									type="button">
									Close
								</Button>
							</DialogClose>
							<Button
								type="button"
								@click="goToHome">
								Redirect to Home
							</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	</div>
</template>
