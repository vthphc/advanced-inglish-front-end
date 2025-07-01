<script setup lang="ts">
import { Layers } from "lucide-vue-next";
import { ref } from "vue";
import { NuxtLink } from "#components";

const year = new Date().getFullYear();

// SocialIcon as a local component
const socialLinks = [
    {
        href: "#",
        svg: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clip-rule="evenodd" /></svg>`,
    },
    {
        href: "#",
        svg: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>`,
    },
    {
        href: "#",
        svg: `<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.237 3.09 7.822 7.152 8.794.522.096.712-.228.712-.505 0-.248-.009-.899-.014-1.765-2.994.65-3.627-1.444-3.627-1.444-.475-1.207-1.16-1.528-1.16-1.528-.948-.647.072-.634.072-.634 1.048.074 1.598 1.076 1.598 1.076.93 1.593 2.438 1.132 3.033.866.095-.672.365-1.132.663-1.392-2.313-.263-4.744-1.157-4.744-5.148 0-1.137.406-2.067 1.076-2.795-.108-.263-.467-1.32.102-2.755 0 0 .874-.28 2.862 1.07.83-.23 1.72-.345 2.602-.35.882.005 1.772.12 2.602.35 1.988-1.35 2.862-1.07 2.862-1.07.57 1.435.21 2.492.102 2.755.67.728 1.076 1.658 1.076 2.795 0 3.999-2.435 4.882-4.756 5.138.375.322.707.96.707 1.935 0 1.398-.012 2.525-.012 2.868 0 .279.19.605.718.503C18.91 19.822 22 16.237 22 12c0-5.523-4.477-10-10-10z" clip-rule="evenodd" /></svg>`,
    },
];

const platformLinks = [
    { label: "Bài kiểm tra", path: "/tests" },
    { label: "Đối thoại", path: "/dialogues" },
    { label: "Thẻ học", path: "/flashcards" },
    { label: "Các gói", path: "/premium" },
];

const companyLinks = [
    { label: "Về chúng tôi", path: "/about-us" },
    { label: "Liên hệ", path: "/contacts" },
    { label: "Chính sách bảo mật", path: "/privacy-policy" },
];
</script>

<template>
    <footer class="bg-white">
        <div class="container mx-auto px-6 py-12">
            <div class="grid md:grid-cols-3 gap-8">
                <div class="col-span-3 md:col-span-1">
                    <NuxtLink to="/" class="flex items-center mb-4 space-x-2">
                        <Layers class="h-8 w-8 text-primary" />
                        <span class="font-bold text-2xl text-primary"
                            >Inglish</span
                        >
                    </NuxtLink>
                    <p class="text-slate-600">
                        Unlock your potential with the best platform for
                        mastering English.
                    </p>
                    <div class="flex space-x-4 mt-6">
                        <a
                            v-for="(item, idx) in socialLinks"
                            :key="idx"
                            :href="item.href"
                            class="text-slate-500 hover:text-brand-primary transition-colors duration-300"
                            v-html="item.svg"
                        />
                    </div>
                </div>
                <div class="grid grid-cols-2 md:col-span-2 gap-8">
                    <div>
                        <h3 class="text-lg font-semibold text-slate-800">
                            Platform
                        </h3>
                        <ul class="mt-4 space-y-2">
                            <li v-for="(link, idx) in platformLinks" :key="idx">
                                <NuxtLink
                                    :to="link.path"
                                    class="text-slate-600 hover:text-primary cursor-pointer"
                                    >{{ link.label }}</NuxtLink
                                >
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="text-lg font-semibold text-slate-800">
                            Company
                        </h3>
                        <ul class="mt-4 space-y-2">
                            <li v-for="(link, idx) in companyLinks" :key="idx">
                                <NuxtLink
                                    :to="link.path"
                                    class="text-slate-600 hover:text-primary cursor-pointer"
                                    >{{ link.label }}</NuxtLink
                                >
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div
                class="mt-12 border-t border-slate-200 pt-8 text-center text-slate-500"
            >
                &copy; {{ year }} Inglish. All rights reserved.
            </div>
        </div>
    </footer>
</template>
