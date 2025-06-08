<script setup lang="ts">
	import { Button } from "@/components/ui/buttons";
	import { Pen, CreditCard } from "lucide-vue-next";
	import {
		Card,
		CardDescription,
		CardHeader,
		CardTitle,
	} from "@/components/ui/card";
	import { capitalizeFirstLetter, formatDate } from "~/utils/helpers";

	const router = useRouter();
	const authStore = useAuthStore();
</script>

<template>
	<div class="flex flex-row gap-x-4">
		<Card class="shrink basis-0 grow-[2.5] relative">
			<CardHeader
				><CardTitle class="text-sm"
					>Gói của bạn</CardTitle
				><CardDescription
					class="!text-3xl font-bold text-primary"
					>{{
						capitalizeFirstLetter(
							authStore.user
								?.subscription
								?.status ??
								"free"
						)
					}}</CardDescription
				>
				<CardDescription
					v-if="
						authStore.user?.subscription
							?.status !== 'free'
					"
					>Gói đăng ký của bạn sẽ hết hạn vào
					<span
						class="font-bold text-highlight"
						>{{
							formatDate(
								authStore.user
									?.subscription
									?.expiresAt ??
									null
							)
						}}</span
					>
				</CardDescription>
				<!-- <CardDescription
					>Ví MoMo</CardDescription> -->
				</CardHeader
			>
			<div
				class="absolute top-2 right-2 h-8 w-8 rounded-lg bg-highlight flex items-center justify-center">
				<span
					class="text-primary-foreground font-bold text-lg"
					>I</span
				>
			</div>
		</Card>
		<!-- <div class="gap-y-4 flex flex-col shrink basis-0 grow">
			<Card
				class="cursor-pointer hover:text-primary h-full"
				@click="router.push('/account/profile')"
				><CardHeader class="place-self-center"
					><CardTitle
						class="place-self-center text-sm"
						><Pen /></CardTitle
					><CardDescription class="font-semibold"
						>Chỉnh sửa hồ
						sơ</CardDescription
					></CardHeader
				></Card
			> -->
		<!-- <Card class="cursor-pointer hover:text-primary"
				><CardHeader class="place-self-center"
					><CardTitle
						class="text-sm place-self-center"
						><CreditCard /></CardTitle
					><CardDescription class="font-semibold"
						>Cập nhật thẻ</CardDescription
					></CardHeader
				></Card
			> -->
		<!-- </div> -->
	</div>
</template>
