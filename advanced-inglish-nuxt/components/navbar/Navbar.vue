<script setup lang="ts">
import { ref } from "vue";
import {
    Menu,
    User,
    Settings,
    LogOut,
    Bell,
    CreditCard,
} from "lucide-vue-next";
import { Button } from "../ui/buttons";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import ExpandingText from "./ExpandingText.vue";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Separator } from "@/components/ui/separator";

const isMainMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

// Mock user data - replace with actual user data from your auth system
const user = ref({
    name: "John Doe",
    email: "john@example.com",
    avatar: null,
});

const navigation = [
    { name: "Home", href: "/" },
    { name: "Dialogues", href: "/dialogues" },
    { name: "Flashcards", href: "/flashcards" },
    { name: "Contacts", href: "/contacts" },
];

const userMenuItems = [
    { name: "Profile", href: "/profile", icon: User },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Billing", href: "/billing", icon: CreditCard },
];
</script>

<template>
    <nav
        class="sticky top-0 z-70 w-full border-b-2 border-highlight backdrop-blur supports-[backdrop-filter]:bg-white/60"
    >
        <div class="container flex h-16 items-center justify-between px-4">
            <!-- Mobile Main Navigation + logo-->
            <div class="flex items-center space-x-4">
                <Sheet v-model:open="isMainMenuOpen">
                    <SheetTrigger as-child class="md:hidden">
                        <Button size="icon">
                            <Menu class="h-6 w-6" />
                            <span class="sr-only">Toggle menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" class="w-[300px] sm:w-[400px]">
                        <div class="flex flex-col space-y-4 mt-8">
                            <NuxtLink
                                v-for="item in navigation"
                                :key="item.name"
                                :to="item.href"
                                class="text-lg text-primary font-medium transition-colors hover:text-primary"
                                @click="isMainMenuOpen = false"
                            >
                                {{ item.name }}
                            </NuxtLink>
                            <NuxtLink
                                class="cursor-pointer text-primary text-lg font-medium transition-colors hover:text-primary"
                                @click="isMainMenuOpen = false"
                            >
                                Profile
                            </NuxtLink>
                        </div>
                    </SheetContent>
                </Sheet>
                <!-- Logo -->
                <NuxtLink to="/" class="flex items-center space-x-2">
                    <div
                        class="h-8 w-8 rounded-lg bg-highlight flex items-center justify-center"
                    >
                        <span class="text-primary-foreground font-bold text-lg"
                            >I</span
                        >
                    </div>
                    <span class="font-bold text-xl">nglish</span>
                    <!-- <ExpandingText /> -->
                </NuxtLink>
            </div>

            <!-- Desktop Navigation -->
            <div class="hidden md:flex items-center space-x-8">
                <NuxtLink
                    v-for="item in navigation"
                    :key="item.name"
                    :to="item.href"
                    class="cursor-pointer text-base font-medium transition-colors hover:text-primary"
                >
                    {{ item.name }}
                </NuxtLink>
            </div>

            <!-- Desktop User Button -->
            <Sheet v-model:open="isUserMenuOpen">
                <SheetTrigger as-child>
                    <Button variant="ghost" size="icon" class="relative">
                        <Avatar class="h-8 w-8">
                            <AvatarImage
                                :src="user.avatar || '/placeholder.svg'"
                                :alt="user.name"
                            />
                            <AvatarFallback>
                                {{
                                    user.name
                                        .split(" ")
                                        .map((n) => n[0])
                                        .join("")
                                }}
                            </AvatarFallback>
                        </Avatar>
                        <span class="sr-only">Toggle user menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" class="w-[300px] sm:w-[400px]">
                    <div class="flex flex-col space-y-4 mt-8">
                        <!-- User Info -->
                        <div class="flex items-center space-x-3 pb-4">
                            <Avatar class="h-12 w-12">
                                <AvatarImage
                                    :src="user.avatar || '/placeholder.svg'"
                                    :alt="user.name"
                                />
                                <AvatarFallback>
                                    {{
                                        user.name
                                            .split(" ")
                                            .map((n) => n[0])
                                            .join("")
                                    }}
                                </AvatarFallback>
                            </Avatar>
                            <div class="flex flex-col">
                                <span class="font-semibold">{{
                                    user.name
                                }}</span>
                                <span class="text-sm text-muted-foreground">{{
                                    user.email
                                }}</span>
                            </div>
                        </div>

                        <Separator />

                        <!-- User Menu Items -->
                        <div class="space-y-2">
                            <NuxtLink
                                v-for="item in userMenuItems"
                                :key="item.name"
                                :to="item.href"
                                class="flex items-center space-x-3 text-lg font-medium transition-colors hover:text-primary py-2"
                                @click="isUserMenuOpen = false"
                            >
                                <component :is="item.icon" class="h-5 w-5" />
                                <span>{{ item.name }}</span>
                            </NuxtLink>
                        </div>

                        <Separator />

                        <!-- Sign Out Button -->
                        <Button
                            class="w-full justify-start"
                            @click="isUserMenuOpen = false"
                        >
                            <LogOut class="h-4 w-4 mr-2" />
                            Sign Out
                        </Button>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    </nav>
</template>
