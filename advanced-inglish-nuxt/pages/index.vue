<script setup lang="ts">
import { zoomInPropsFn, fadeInPropsFn } from "@/utils/animation";
import { motion } from "motion-v";
import { CircleCheckBig } from "lucide-vue-next";
// Import the Pinia store instead of the composable
import { useAuthStore } from "~/stores/auth";
import Hero from "@/components/homepage/Hero.vue";
import DashboardPreview from "@/components/homepage/DashboardPreview.vue";
import WordOfTheDay from "@/components/homepage/WordOfTheDay.vue";
import Features from "@/components/homepage/Features.vue";
import { storeToRefs } from "pinia"; // Import storeToRefs for reactive access

definePageMeta({
    title: "Inglish",
    layout: "homepage",
});

// Get the auth store instance
const authStore = useAuthStore();

// Use storeToRefs to get reactive refs for state properties
// This keeps reactivity when destructuring from the store
const { isAuthenticated, user } = storeToRefs(authStore); // You can still log values, but access them via the refs from storeToRefs

// --- Rest of your script setup remains the same ---
const introArray = [
    {
        class: "text-3xl sm:text-4xl lg:text-5xl font-semibold text-center ",
        text: "Học tiếng Anh, mở ra cơ hội.",
    },
    {
        class: "text-3xl sm:text-4xl lg:text-5xl font-semibold text-center ",
        text: "Con đường đến kết nối trôi chảy.",
    },
];

const featureClass =
    "text-sm sm:text-base text-primary font-semibold text-center flex items-center gap-2 mx-2 sm:mx-4 md:mx-6 lg:mx-8";

const featureArray = [
    {
        class: featureClass,
        text: "Miễn phí",
    },
    {
        class: featureClass,
        text: "Chủ động",
    },
    {
        class: featureClass,
        text: "Hiệu quả",
    },
    {
        class: featureClass,
        text: "Artificial Intelligence",
    },
];

const buttons = [
    {
        text: "Tài khoản",
        href: "/account",
    },
    {
        text: "Lịch sử bài làm",
        href: "/account/test-history",
    },
];

const underlineVariants = {
    rest: {
        width: "0%", // The underline is hidden in the "rest" state
    },
    hovered: {
        width: "100%", // The underline expands fully in the "hovered" state
    },
};
</script>

<template>
    <!-- Conditional rendering based on authentication status -->
    <!-- Access state directly via the refs from storeToRefs -->
    <div v-if="isAuthenticated" class="flex flex-col max-w-5xl mx-auto">
        <!-- Placeholder for authenticated users -->
        <div class="flex flex-col items-center justify-center min-h-screen p-6">
            <div class="flex flex-col bg-white w-full gap-y-8">
                <Hero />
                <DashboardPreview />
                <WordOfTheDay />
                <Features />
            </div>
        </div>
    </div>

    <!-- Original landing page for unauthenticated users -->
    <div v-else class="flex justify-center items-center h-screen">
        <!-- Rest of the template remains the same -->
        <div class="m-auto flex flex-col items-center">
            <motion.p
                v-bind="fadeInPropsFn()"
                class="font-bold text-center text-xl"
            >
                Welcome to
                <span class="text-primary">Inglish.</span>
            </motion.p>
            <p class="m-auto flex flex-col gap-4 mt-4">
                <motion.span
                    v-for="(intro, index) in introArray"
                    :key="index"
                    :class="intro.class"
                    v-bind="fadeInPropsFn(index)"
                    >{{ intro.text }}</motion.span
                >
            </p>
            <p class="flex flex-row items-center mt-8">
                <motion.div
                    v-for="(feature, index) in featureArray"
                    :key="index"
                    :class="feature.class"
                    v-bind="zoomInPropsFn(index)"
                >
                    <CircleCheckBig height="1.5em" width="1.5em" />
                    {{ feature.text }}</motion.div
                >
            </p>
            <ClientOnly>
                <div class="flex flex-col">
                    <NuxtLink to="/register">
                        <motion.button
                            class="w-fit m-auto text-4xl font-medium cursor-pointer py-4 px-12 bg-primary text-white hover:bg-white hover:text-primary border-2 hover:border-primary rounded-2xl mt-8"
                            v-bind="fadeInPropsFn()"
                            >BẮT ĐẦU
                        </motion.button>
                    </NuxtLink>
                </div>
                <motion.div v-bind="fadeInPropsFn(5)">
                    <motion.div
                        class="relative inline-block"
                        while-hover="hovered"
                        initial="rest"
                        animate="rest"
                    >
                        <p
                            className="text-md font-medium mt-4 font-roboto text-gray-500 tracking-tighter "
                        >
                            <NuxtLink to="/login"
                                ><span> Đã có tài khoản? </span></NuxtLink
                            >
                        </p>
                        <motion.div
                            class="absolute bottom-0 left-0 h-[2px] bg-gray-500"
                            :variants="underlineVariants"
                            :transition="{
                                duration: 0.3,
                            }"
                    /></motion.div>
                </motion.div>
            </ClientOnly>
        </div>
    </div>
</template>
