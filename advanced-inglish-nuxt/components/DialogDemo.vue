<script setup lang="ts">
	import Button from "~/components/ui/buttons/Button.vue";
	import {
		Dialog,
		DialogClose,
		DialogContent,
		DialogDescription,
		DialogFooter,
		DialogHeader,
		DialogTitle,
		DialogTrigger,
	} from "@/components/ui/dialog";
	import Input from "~/components/ui/inputs/Input.vue";
	import Label from "~/components/ui/labels/Label.vue";

	const router = useRouter();

	const props = defineProps({
		open: {
			type: Boolean,
			default: false,
		},
		countdown: {
			type: Number,
			default: 10,
		},
		message: {
			type: String,
			default: "Please check your email inbox and click the verification link to verify your account. If you don't see the email, check your spam folder.",
		},
		redirectPath: {
			type: String,
			default: "/login",
		},
	});

	const emit = defineEmits(["update:open"]);

	function redirect() {
		router.push(props.redirectPath);
	}
</script>

<template>
	<Dialog :open="open" @update:open="emit('update:open', $event)">
		<DialogContent class="sm:max-w-md">
			<DialogHeader>
				<DialogTitle class="text-primary font-semibold"
					>Registration Successful</DialogTitle
				>
				<DialogDescription>
					{{ message }}
					<div class="mt-2 font-medium">
						You will be redirected to login
						in {{ countdown }} seconds.
					</div>
				</DialogDescription>
			</DialogHeader>
			<DialogFooter class="sm:justify-start">
				<Button type="button" @click="redirect">
					Login Now
				</Button>
			</DialogFooter>
		</DialogContent>
	</Dialog>
</template>
