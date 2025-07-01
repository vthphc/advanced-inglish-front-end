<script setup lang="ts">
import {
    Check,
    X,
    Star,
    Zap,
    Shield,
    Users,
    Headphones,
} from "lucide-vue-next";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    CardFooter,
} from "~/components/ui/card";
import { Button } from "~/components/ui/buttons";
import Badge from "~/components/ui/badge/Badge.vue";
import { useAuthStore } from "~/stores/auth";

interface Feature {
    name: string;
    free: string;
    premium: string;
    freeIncluded: boolean;
    premiumIncluded: boolean;
}

const features: Feature[] = [
    {
        name: "A.I Generation",
        free: `Bị giới hạn cho "Đối thoại" và "Thẻ học"`,
        premium: "Giải thích đáp án từ AI",
        freeIncluded: true,
        premiumIncluded: true,
    },
    {
        name: "A.I Speaking Assessment",
        free: "Transcribe audio từ A.I",
        premium: "Transcribe audio  từ A.I",
        freeIncluded: false,
        premiumIncluded: true,
    },
];

const authStore = useAuthStore();
const isPremium = computed(() => {
    return authStore.user?.subscription?.status === "premium";
});
</script>

<template>
    <div class="min-h-screen py-12 px-4">
        <div class="max-w-6xl mx-auto">
            <!-- Header -->
            <div class="text-center mb-12">
                <h1 class="text-4xl font-bold text-gray-900 mb-4">
                    Chọn Gói Dịch Vụ
                </h1>
                <p class="text-xl text-gray-600 max-w-2xl mx-auto">
                    Bắt đầu miễn phí và nâng cấp khi bạn cần thêm tính năng. Tất
                    cả các gói đều bao gồm các tính năng cốt lõi.
                </p>
            </div>

            <!-- Pricing Cards -->
            <div class="grid md:grid-cols-2 gap-8 mb-12">
                <!-- Free Plan -->
                <Card
                    class="relative border-2 border-gray-200 hover:border-gray-300 transition-colors"
                >
                    <CardHeader class="text-center pb-8">
                        <div class="flex justify-center mb-4">
                            <div class="p-3 bg-blue-100 rounded-full">
                                <Star class="w-8 h-8 text-blue-600" />
                            </div>
                        </div>
                        <CardTitle class="text-2xl font-bold"
                            >Miễn phí</CardTitle
                        >
                        <CardDescription class="text-gray-600"
                            >Hoàn hảo cho người mới bắt đầu</CardDescription
                        >
                        <div class="mt-4">
                            <span class="text-4xl font-bold">$0</span>
                            <span class="text-gray-600">/tháng</span>
                        </div>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-3">
                            <div
                                v-for="(feature, index) in features"
                                :key="index"
                                class="flex items-start gap-3"
                            >
                                <Check
                                    v-if="feature.freeIncluded"
                                    class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                                />
                                <X
                                    v-else
                                    class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0"
                                />
                                <div class="flex-1">
                                    <span
                                        :class="[
                                            'text-sm',
                                            feature.freeIncluded
                                                ? 'text-gray-900'
                                                : 'text-gray-500',
                                        ]"
                                    >
                                        {{ feature.free }}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter class="pt-6">
                        <NuxtLink class="w-full" :to="isPremium ? '#' : '/'">
                            <Button
                                variant="outline"
                                class="w-full"
                                size="lg"
                                :disabled="isPremium"
                                :title="
                                    isPremium
                                        ? 'Bạn đã là người dùng Premium'
                                        : ''
                                "
                            >
                                {{
                                    isPremium
                                        ? "Bạn đã là người dùng Premium"
                                        : "Bắt đầu miễn phí"
                                }}
                            </Button>
                        </NuxtLink>
                    </CardFooter>
                </Card>

                <!-- Premium Plan -->
                <Card
                    class="relative border-2 border-purple-200 hover:border-purple-300 transition-colors bg-gradient-to-br from-purple-50 to-white"
                >
                    <div
                        class="absolute -top-4 left-1/2 transform -translate-x-1/2"
                    >
                        <Badge class="bg-purple-600 text-white px-4 py-1"
                            >Phổ biến nhất</Badge
                        >
                    </div>
                    <CardHeader class="text-center pb-8">
                        <div class="flex justify-center mb-4">
                            <div class="p-3 bg-purple-100 rounded-full">
                                <Zap class="w-8 h-8 text-purple-600" />
                            </div>
                        </div>
                        <CardTitle class="text-2xl font-bold"
                            >Premium</CardTitle
                        >
                        <CardDescription class="text-gray-600"
                            >Dành cho người dùng muốn hỗ trợ AI</CardDescription
                        >
                        <div class="mt-4">
                            <span class="text-4xl font-bold">$5</span>
                            <span class="text-gray-600">/tháng</span>
                        </div>
                    </CardHeader>
                    <CardContent class="space-y-4">
                        <div class="space-y-3">
                            <div
                                v-for="(feature, index) in features"
                                :key="index"
                                class="flex items-start gap-3"
                            >
                                <Check
                                    class="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                                />
                                <div class="flex-1">
                                    <span class="text-sm text-gray-900">{{
                                        feature.premium
                                    }}</span>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter class="pt-6">
                        <NuxtLink
                            class="w-full"
                            :to="isPremium ? '#' : '/premium/payment'"
                        >
                            <Button
                                class="w-full"
                                size="lg"
                                :disabled="isPremium"
                                :title="
                                    isPremium
                                        ? 'Bạn đã là người dùng Premium'
                                        : ''
                                "
                            >
                                {{
                                    isPremium
                                        ? "Bạn đã là người dùng Premium"
                                        : "Bắt đầu dùng thử Premium"
                                }}
                            </Button>
                        </NuxtLink>
                    </CardFooter>
                </Card>
            </div>

            <!-- Feature Comparison Table -->
            <div class="bg-white rounded-lg shadow-sm border overflow-hidden">
                <div class="px-6 py-4 border-b bg-gray-50">
                    <h3 class="text-lg font-semibold text-gray-900">
                        So sánh chi tiết tính năng
                    </h3>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-sm font-medium text-gray-900"
                                >
                                    Tính năng
                                </th>
                                <th
                                    class="px-6 py-3 text-center text-sm font-medium text-gray-900"
                                >
                                    Miễn phí
                                </th>
                                <th
                                    class="px-6 py-3 text-center text-sm font-medium text-gray-900"
                                >
                                    Premium
                                </th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            <tr
                                v-for="(feature, index) in features"
                                :key="index"
                                class="hover:bg-gray-50"
                            >
                                <td
                                    class="px-6 py-4 text-sm font-medium text-gray-900"
                                >
                                    {{ feature.name }}
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <div
                                        v-if="feature.freeIncluded"
                                        class="flex flex-col items-center gap-1"
                                    >
                                        <Check class="w-5 h-5 text-green-500" />
                                        <span class="text-xs text-gray-600">{{
                                            feature.free
                                        }}</span>
                                    </div>
                                    <X
                                        v-else
                                        class="w-5 h-5 text-gray-400 mx-auto"
                                    />
                                </td>
                                <td class="px-6 py-4 text-center">
                                    <div
                                        class="flex flex-col items-center gap-1"
                                    >
                                        <Check class="w-5 h-5 text-green-500" />
                                        <span class="text-xs text-gray-600">{{
                                            feature.premium
                                        }}</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Additional Benefits -->
            <div class="mt-12 grid md:grid-cols-3 gap-6">
                <div class="text-center p-6">
                    <div class="flex justify-center mb-4">
                        <Shield class="w-8 h-8 text-blue-600" />
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-2">
                        Bảo mật & Đáng tin cậy
                    </h4>
                    <p class="text-sm text-gray-600">
                        Bảo mật cấp doanh nghiệp với cam kết hoạt động 99.9%
                    </p>
                </div>
                <div class="text-center p-6">
                    <div class="flex justify-center mb-4">
                        <Users class="w-8 h-8 text-green-600" />
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-2">
                        Làm việc nhóm
                    </h4>
                    <p class="text-sm text-gray-600">
                        Làm việc cùng nhau mượt mà với các công cụ cộng tác thời
                        gian thực
                    </p>
                </div>
                <div class="text-center p-6">
                    <div class="flex justify-center mb-4">
                        <Headphones class="w-8 h-8 text-purple-600" />
                    </div>
                    <h4 class="font-semibold text-gray-900 mb-2">
                        Hỗ trợ 24/7
                    </h4>
                    <p class="text-sm text-gray-600">
                        Nhận trợ giúp khi cần với đội ngũ hỗ trợ chuyên dụng
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
