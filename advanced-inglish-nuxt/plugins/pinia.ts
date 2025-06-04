import { defineNuxtPlugin } from "#app";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import type { Pinia } from "pinia";

export default defineNuxtPlugin((nuxtApp) => {
    if (import.meta.client) {
        const pinia = nuxtApp.$pinia as Pinia;
        pinia.use(piniaPluginPersistedstate);
    }
});
