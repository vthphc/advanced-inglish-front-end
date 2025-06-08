<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "~/components/ui/card";
import { Button } from "~/components/ui/buttons";
import {
    CheckCircle,
    Crown,
    Zap,
    Shield,
    Users,
    ArrowRight,
} from "lucide-vue-next";
import Badge from "~/components/ui/badge/Badge.vue";

interface Transaction {
    amount: number;
    sender: string;
    createdAt: string;
    _id: string;
}

const props = defineProps<{
    transaction: Transaction;
    message: string;
}>();

// Format the date
const formattedDate = computed(() => {
    return new Date(props.transaction.createdAt).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
});

// Format the amount
const formattedAmount = computed(() => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "USD",
    }).format(props.transaction.amount / 100);
});
</script>

<template>
    <div class="rounded-md shadow-md flex items-center justify-center p-4 py-8">
        <div class="w-full max-w-2xl space-y-8">
            <!-- Success Header -->
            <div class="text-center space-y-4">
                <div
                    class="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
                >
                    <CheckCircle class="w-12 h-12 text-green-600" />
                </div>
                <div class="space-y-2">
                    <h1 class="text-3xl font-bold text-gray-900">
                        Thanh Toán Thành Công!
                    </h1>
                </div>
            </div>

            <!-- Main Success Card -->
            <Card class="border-0 shadow-lg">
                <CardHeader class="text-center pb-4">
                    <div class="flex items-center justify-center gap-2 mb-2">
                        <Badge
                            variant="secondary"
                            class="bg-gradient-to-r from-purple-500 to-pink-500 text-white"
                        >
                            <Crown class="w-4 h-4 mr-1" />
                            Tài Khoản Premium
                        </Badge>
                    </div>
                    <CardTitle class="text-2xl"
                        >Nâng Cấp Tài Khoản Thành Công</CardTitle
                    >
                    <CardDescription class="text-base">
                        Tài khoản của bạn đã được nâng cấp từ Free lên Premium.
                        Bạn giờ đây có thể truy cập tất cả các tính năng
                        premium!
                    </CardDescription>
                </CardHeader>
                <CardContent class="space-y-6">
                    <!-- Payment Details -->
                    <div class="bg-gray-50 rounded-lg p-4 space-y-2">
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600"
                                >Gói Dịch Vụ</span
                            >
                            <span class="font-medium">Premium Hàng Tháng</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600"
                                >Số Tiền Đã Thanh Toán</span
                            >
                            <span class="font-medium">{{
                                formattedAmount
                            }}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600"
                                >Ngày Giao Dịch</span
                            >
                            <span class="font-medium">{{ formattedDate }}</span>
                        </div>
                        <div class="flex justify-between items-center">
                            <span class="text-sm text-gray-600"
                                >Mã Giao Dịch</span
                            >
                            <span class="font-mono text-sm">{{
                                transaction._id
                            }}</span>
                        </div>
                    </div>

                    <!-- Premium Features -->
                    <div class="space-y-4">
                        <h3
                            class="font-semibold text-lg flex items-center gap-2"
                        >
                            <Zap class="w-5 h-5 text-yellow-500" />
                            Tính Năng Premium Của Bạn
                        </h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div
                                class="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
                            >
                                <Shield class="w-5 h-5 text-blue-600 mt-0.5" />
                                <div>
                                    <h4 class="font-medium text-blue-900">
                                        Bảo Mật Nâng Cao
                                    </h4>
                                    <p class="text-sm text-blue-700">
                                        Bảo vệ và giám sát nâng cao
                                    </p>
                                </div>
                            </div>
                            <div
                                class="flex items-start gap-3 p-3 bg-purple-50 rounded-lg"
                            >
                                <Users class="w-5 h-5 text-purple-600 mt-0.5" />
                                <div>
                                    <h4 class="font-medium text-purple-900">
                                        Làm Việc Nhóm
                                    </h4>
                                    <p class="text-sm text-purple-700">
                                        Không giới hạn thành viên nhóm
                                    </p>
                                </div>
                            </div>
                            <div
                                class="flex items-start gap-3 p-3 bg-green-50 rounded-lg"
                            >
                                <Zap class="w-5 h-5 text-green-600 mt-0.5" />
                                <div>
                                    <h4 class="font-medium text-green-900">
                                        Hỗ Trợ Ưu Tiên
                                    </h4>
                                    <p class="text-sm text-green-700">
                                        Hỗ trợ 24/7
                                    </p>
                                </div>
                            </div>
                            <div
                                class="flex items-start gap-3 p-3 bg-orange-50 rounded-lg"
                            >
                                <Crown class="w-5 h-5 text-orange-600 mt-0.5" />
                                <div>
                                    <h4 class="font-medium text-orange-900">
                                        Trợ Lý AI
                                    </h4>
                                    <p class="text-sm text-orange-700">
                                        Lấy lời giải thích từ trợ lý AI
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Action Buttons -->
                    <div class="grid grid-cols-2 gap-x-4">
                        <NuxtLink href="/account">
                            <Button class="w-full rounded-md border-primary">
                                Đến Trang Cá Nhân
                                <ArrowRight class="w-4 h-4 ml-2" />
                            </Button>
                        </NuxtLink>

                        <NuxtLink href="/account/billing"
                            ><Button
                                class="w-full rounded-md bg-white text-primary hover:bg-card"
                            >
                                Quản Lý Thanh Toán
                            </Button></NuxtLink
                        >
                    </div>

                    <!-- Additional Info -->
                    <!-- <div class="text-center pt-4 border-t">
						<p
							class="text-sm text-gray-600">
							Need help getting
							started? Check out our{"
							"}
							<Link
								href="/help"
								class="text-blue-600 hover:underline">
								Premium Guide </Link
							>{" "} or{" "}
							<Link
								href="/support"
								class="text-blue-600 hover:underline">
								contact support
							</Link>
							.
						</p>
					</div> -->
                </CardContent>
            </Card>

            <!-- Footer Note -->
            <!-- <div class="text-center text-sm text-gray-500">
				<p>
					A confirmation email has been sent to
					your registered email address.
				</p>
			</div> -->
        </div>
    </div>
</template>
