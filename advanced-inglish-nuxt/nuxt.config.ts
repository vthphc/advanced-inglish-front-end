// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2024-11-01",
    devtools: { enabled: true },
    runtimeConfig: {
        public: {
            apiBase: process.env.API_BASE_URL || "https://dummyjson.com",
        },
    },
    css: ["@/assets/css/main.css"],
    modules: [
        "@nuxt/ui",
        "@nuxt/test-utils",
        "@nuxt/content",
        "@nuxt/eslint",
        "@nuxt/fonts",
        "@nuxt/icon",
        "@nuxt/image",
        "@nuxt/scripts",
        "motion-v/nuxt",
        "@vueuse/nuxt",
        ["@pinia/nuxt", { autoImports: ["defineStore", "acceptHMRUpdate"] }],
    ],
    imports: {
        dirs: ["stores"],
    },
    vite: {
        plugins: [tailwindcss()],
    },
    // plugins: ["~/plugins/auth"],

    ui: {
        theme: {
            colors: [
                "primary",
                "secondary",
                "tertiary",
                "info",
                "success",
                "warning",
                "error",
                "highlight",
                "neutral",
            ],
        },
    },
});
