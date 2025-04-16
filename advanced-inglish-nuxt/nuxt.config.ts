// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
	compatibilityDate: "2024-11-01",
	devtools: { enabled: true },

	runtimeConfig: {
		public: {
			apiBase:
				process.env.API_BASE_URL ||
				"http://localhost:5000/api",
		},
	},

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
	],
	css: ["~/assets/css/main.css"],
	vite: {
		plugins: [tailwindcss()],
	},
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
