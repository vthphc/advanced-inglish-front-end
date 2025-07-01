<script setup lang="ts">
import { computed, defineProps } from "vue";

// ProgressBar as a local component
const ProgressBar = defineComponent({
    name: "ProgressBar",
    props: {
        progress: {
            type: Number,
            required: true,
        },
    },
    setup(props) {
        const width = computed(() => `${props.progress}%`);
        return { width };
    },
    template: `
    <div>
      <div class="flex justify-between mb-1">
        <span class="text-base font-medium text-brand-primary">Overall Progress</span>
        <span class="text-sm font-medium text-brand-primary">{{ progress }}%</span>
      </div>
      <div class="w-full bg-indigo-200 rounded-full h-2.5">
        <div class="bg-brand-primary h-2.5 rounded-full" :style="{ width }"></div>
      </div>
    </div>
  `,
});
</script>

<template>
    <div
        class="bg-gradient-to-br from-primary to-highlight text-white p-8 md:p-10 rounded-2xl shadow-2xl"
    >
        <div
            class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
        >
            <div>
                <h2 class="text-3xl font-bold">Chào mừng bạn trở lại!</h2>
                <p class="mt-2 text-white text-sm md:text-base">
                    Bạn đang làm tốt. Hãy tiếp tục giữ động lực.
                </p>
            </div>
            <NuxtLink to="tests">
                <button
                    class="cursor-pointer bg-highlight text-white font-bold py-3 px-6 rounded-lg shadow-md hover:bg-white hover:text-primary transition-all duration-300 transform hover:-translate-y-1 whitespace-nowrap"
                >
                    Tới mục kiểm tra
                </button>
            </NuxtLink>
        </div>
        <div class="mt-8 grid md:grid-cols-1 gap-8">
            <div class="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h3 class="font-bold text-xl mb-3">Mục tiêu hôm nay</h3>
                <p class="text-indigo-200">Hoàn thành một bài kiểm tra</p>
            </div>
            <!-- <div class="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                <h3 class="font-bold text-xl mb-3">Achievements</h3>
                <ProgressBar :progress="65" />
            </div> -->
        </div>
    </div>
</template>
