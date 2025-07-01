<script setup lang="ts">
import { MessageSquareText, BookOpenCheck, Sparkles } from "lucide-vue-next";
import FeatureCard from "./FeatureCard.vue";

interface Feature {
    icon: any;
    title: string;
    description: string;
}

const featuresData: Feature[] = [
    {
        icon: BookOpenCheck,
        title: "Bài học tương tác",
        description:
            "Tham gia các bài học năng động phù hợp với trình độ của bạn, giúp việc học trở nên hiệu quả và thú vị.",
    },
    {
        icon: MessageSquareText,
        title: "Luyện phát âm",
        description:
            "Nhận phản hồi ngay lập tức về phát âm của bạn với công nghệ nhận diện giọng nói tiên tiến.",
    },
    {
        icon: Sparkles,
        title: "Xây dựng từ vựng bằng AI",
        description:
            "Học từ mới theo ngữ cảnh và ghi nhớ lâu dài với hệ thống thẻ từ thông minh, hỗ trợ bởi AI.",
    },
];
</script>

<template>
    <section class="bg-brand-light py-20 md:py-28">
        <div class="container mx-auto px-6">
            <div class="text-center mb-12">
                <h2 class="text-3xl md:text-4xl font-bold text-slate-900">
                    Mọi thứ bạn cần để thành công
                </h2>
                <p class="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                    Nền tảng của chúng tôi được trang bị những tính năng mạnh mẽ
                    giúp bạn học nhanh hơn và tự tin sử dụng tiếng Anh trong
                    thực tế.
                </p>
            </div>
            <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                    v-for="(feature, idx) in featuresData"
                    :key="idx"
                    :icon="feature.icon"
                    :title="feature.title"
                    :description="feature.description"
                />
            </div>
        </div>
    </section>
</template>
