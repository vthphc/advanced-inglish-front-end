<script setup lang="ts">
	import { ref } from "vue";
	import { Menu } from "lucide-vue-next";
	import { Button } from "../ui/buttons";
	import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

	const isOpen = ref(false);

	const navigation = [
		{ name: "Home", href: "/" },
		{ name: "Dialogues", href: "/dialogues" },
		{ name: "Flashcards", href: "/flashcards" },
		// { name: "Contact", href: "/contact" },
	];
</script>

<template>
	<nav
		class="sticky top-0 z-70 w-full border-b-2 border-highlight bg-white backdrop-blur supports-[backdrop-filter]:bg-white/60">
		<div class="flex h-16 items-center justify-between px-4">
			<!-- Logo -->
			<NuxtLink to="/" class="flex items-center space-x-2">
				<div
					class="h-8 w-8 rounded-lg bg-highlight flex items-center justify-center">
					<span
						class="text-primary-foreground font-bold text-lg"
						>L</span
					>
				</div>
				<span class="font-bold text-xl">Logo</span>
			</NuxtLink>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				<NuxtLink
					v-for="item in navigation"
					:key="item.name"
					:to="item.href"
					class="text-sm font-medium transition-colors hover:text-primary">
					{{ item.name }}
				</NuxtLink>
			</div>

			<!-- Desktop CTA Button -->
			<div class="hidden md:flex">
				<Button>Get Started</Button>
			</div>

			<!-- Mobile Navigation -->
			<Sheet v-model:open="isOpen">
				<SheetTrigger as-child class="md:hidden">
					<Button size="icon">
						<Menu class="h-6 w-6" />
						<span class="sr-only"
							>Toggle menu</span
						>
					</Button>
				</SheetTrigger>
				<SheetContent
					side="right"
					class="w-[300px] sm:w-[400px]">
					<div
						class="flex flex-col space-y-4 mt-8">
						<NuxtLink
							v-for="item in navigation"
							:key="item.name"
							:to="item.href"
							class="text-lg font-medium transition-colors hover:text-primary"
							@click="isOpen = false">
							{{ item.name }}
						</NuxtLink>
						<div class="pt-4">
							<Button
								class="w-full"
								@click="
									isOpen = false
								">
								Get Started
							</Button>
						</div>
					</div>
				</SheetContent>
			</Sheet>
            
		</div>
	</nav>
</template>
