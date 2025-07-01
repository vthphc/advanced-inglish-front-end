<script setup lang="ts">
import {
    Users,
    Target,
    Heart,
    Zap,
    Mail,
    Linkedin,
    Twitter,
    Layers,
} from "lucide-vue-next";
import { Card, CardContent } from "~/components/ui/card";
import Badge from "~/components/ui/badge/Badge.vue";
import { Button } from "~/components/ui/buttons";

const teamMembers = [
    {
        name: "Võ Thiên Phúc",
        role: "Backend Developer",
        bio: "Thiên Phúc là người khởi xướng dự án Inglish với mong muốn giúp người Việt tự tin sử dụng tiếng Anh trong học tập và công việc.",
        image: "https://ui-avatars.com/api/?name=Phuc+Vo&background=random",
    },
    {
        name: "Vũ Hoàng Nhật Minh",
        role: "Frontend Developer",
        bio: "Nhật Minh chịu trách nhiệm phát triển nền tảng công nghệ, đảm bảo trải nghiệm học tập mượt mà và hiện đại.",
        image: "https://ui-avatars.com/api/?name=Minh+Vu&background=random",
    },
];

const values = [
    {
        icon: Users,
        title: "Cộng đồng hỗ trợ",
        description:
            "Chúng tôi tin rằng học tập hiệu quả nhất khi có sự đồng hành và chia sẻ từ cộng đồng.",
    },
    {
        icon: Target,
        title: "Cá nhân hóa",
        description:
            "Lộ trình học được thiết kế riêng cho từng người, giúp bạn tiến bộ theo cách của mình.",
    },
    {
        icon: Heart,
        title: "Đam mê & Cống hiến",
        description:
            "Đội ngũ Inglish luôn tận tâm mang đến trải nghiệm học tập tốt nhất cho người dùng.",
    },
    {
        icon: Zap,
        title: "Đổi mới sáng tạo",
        description:
            "Chúng tôi liên tục cập nhật công nghệ và phương pháp học hiện đại nhất.",
    },
];
</script>

<template>
    <div class="min-h-screen bg-background">
        <!-- Hero Section -->
        <section class="relative pb-20 lg:pb-32">
            <div class="container px-4 md:px-6 mx-auto">
                <div class="flex flex-col items-center text-center space-y-6">
                    <Badge variant="secondary" class="px-4 py-2">
                        Về Inglish
                    </Badge>
                    <h1
                        class="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl"
                    >
                        Học tiếng Anh dễ dàng cùng
                        <span class="text-primary">Inglish</span>
                    </h1>
                    <p
                        class="max-w-[700px] text-lg text-muted-foreground md:text-xl"
                    >
                        Inglish là nền tảng học tiếng Anh trực tuyến hiện đại,
                        cá nhân hóa lộ trình, luyện phát âm, xây dựng từ vựng
                        bằng AI và kết nối cộng đồng học tập năng động. Được
                        phát triển bởi đội ngũ trẻ người Việt, Inglish mong muốn
                        đồng hành cùng bạn trên hành trình chinh phục tiếng Anh.
                    </p>
                </div>
            </div>
        </section>

        <!-- Story Section -->
        <section class="py-16 lg:py-24">
            <div class="container px-4 md:px-6 mx-auto">
                <div class="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
                    <div class="space-y-6">
                        <div class="space-y-4">
                            <h2
                                class="text-3xl font-bold tracking-tighter sm:text-4xl"
                            >
                                Câu chuyện của chúng tôi
                            </h2>
                            <p class="text-muted-foreground text-lg">
                                Inglish ra đời từ trăn trở: Làm sao để người
                                Việt có thể học tiếng Anh hiệu quả, tự tin giao
                                tiếp và ứng dụng vào thực tế? Chúng tôi kết hợp
                                công nghệ hiện đại với sự thấu hiểu người học
                                Việt để tạo nên một nền tảng học tập toàn diện,
                                thân thiện và truyền cảm hứng.
                            </p>
                            <p class="text-muted-foreground text-lg">
                                Hơn 50.000 người dùng đã lựa chọn Inglish để
                                nâng cao trình độ tiếng Anh mỗi ngày. Chúng tôi
                                tự hào đồng hành cùng bạn trên hành trình chinh
                                phục ngôn ngữ toàn cầu.
                            </p>
                        </div>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="text-center">
                                <div class="text-3xl font-bold text-primary">
                                    50.000+
                                </div>
                                <div class="text-sm text-muted-foreground">
                                    Người dùng
                                </div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-primary">
                                    1.000.000+
                                </div>
                                <div class="text-sm text-muted-foreground">
                                    Bài học đã hoàn thành
                                </div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-primary">
                                    5+
                                </div>
                                <div class="text-sm text-muted-foreground">
                                    Năm phát triển
                                </div>
                            </div>
                            <div class="text-center">
                                <div class="text-3xl font-bold text-primary">
                                    97%
                                </div>
                                <div class="text-sm text-muted-foreground">
                                    Hài lòng người dùng
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="relative flex justify-center">
                        <Layers
                            class="w-[300px] h-[400px] md:w-[400px] md:h-[500px] text-primary"
                        />
                    </div>
                </div>
            </div>
        </section>

        <!-- Values Section -->
        <section class="py-16 lg:py-24 bg-muted/50">
            <div class="container px-4 md:px-6 mx-auto">
                <div class="text-center space-y-4 mb-12">
                    <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">
                        Giá trị cốt lõi
                    </h2>
                    <p
                        class="max-w-[600px] mx-auto text-muted-foreground text-lg"
                    >
                        Những giá trị này là kim chỉ nam cho mọi hoạt động của
                        Inglish và là nền tảng để xây dựng cộng đồng học tập bền
                        vững.
                    </p>
                </div>
                <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    <Card
                        v-for="(value, index) in values"
                        :key="index"
                        class="text-center p-6"
                    >
                        <CardContent class="space-y-4 p-0">
                            <div class="flex justify-center text-primary">
                                <component :is="value.icon" class="h-8 w-8" />
                            </div>
                            <h3 class="text-xl font-semibold">
                                {{ value.title }}
                            </h3>
                            <p class="text-muted-foreground">
                                {{ value.description }}
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <!-- Team Section -->
        <section class="py-16 lg:py-24">
            <div class="container px-4 md:px-6 mx-auto">
                <div class="text-center space-y-4 mb-12">
                    <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">
                        Đội ngũ phát triển
                    </h2>
                    <p
                        class="max-w-[600px] mx-auto text-muted-foreground text-lg"
                    >
                        Những con người trẻ trung, sáng tạo và đầy nhiệt huyết
                        đứng sau Inglish.
                    </p>
                </div>
                <div class="grid gap-8 md:grid-cols-2">
                    <Card
                        v-for="(member, index) in teamMembers"
                        :key="index"
                        class="overflow-hidden"
                    >
                        <div
                            class="aspect-square relative flex justify-center items-center bg-muted"
                        >
                            <img
                                :src="member.image"
                                :alt="member.name"
                                class="object-cover w-full h-full"
                            />
                        </div>
                        <CardContent class="p-6 space-y-3">
                            <div>
                                <h3 class="font-semibold text-lg">
                                    {{ member.name }}
                                </h3>
                                <p class="text-primary text-sm font-medium">
                                    {{ member.role }}
                                </p>
                            </div>
                            <p class="text-muted-foreground text-sm">
                                {{ member.bio }}
                            </p>
                            <div class="flex space-x-2">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    class="h-8 w-8 p-0"
                                >
                                    <Linkedin class="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    class="h-8 w-8 p-0"
                                >
                                    <Twitter class="h-4 w-4" />
                                </Button>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    class="h-8 w-8 p-0"
                                >
                                    <Mail class="h-4 w-4" />
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </section>

        <!-- Mission Section -->
        <section class="py-16 lg:py-24 bg-muted/50">
            <div class="container px-4 md:px-6 mx-auto">
                <div class="max-w-4xl mx-auto text-center space-y-8">
                    <h2 class="text-3xl font-bold tracking-tighter sm:text-4xl">
                        Sứ mệnh của Inglish
                    </h2>
                    <blockquote
                        class="text-xl md:text-2xl font-medium text-muted-foreground italic"
                    >
                        "Mang đến giải pháp học tiếng Anh thông minh, cá nhân
                        hóa và truyền cảm hứng cho mọi người Việt Nam."
                    </blockquote>
                    <div class="pt-8">
                        <p class="text-lg text-muted-foreground mb-8">
                            Chúng tôi tin rằng mỗi người đều có thể làm chủ
                            tiếng Anh nếu có phương pháp phù hợp và môi trường
                            học tập tích cực. Inglish cam kết đồng hành cùng bạn
                            trên từng bước tiến bộ.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="py-16 lg:py-24">
            <div class="container px-4 md:px-6 mx-auto">
                <div class="text-center space-y-8">
                    <div class="space-y-4">
                        <h2
                            class="text-3xl font-bold tracking-tighter sm:text-4xl"
                        >
                            Sẵn sàng bứt phá cùng Inglish?
                        </h2>
                        <p
                            class="max-w-[600px] mx-auto text-muted-foreground text-lg"
                        >
                            Hãy bắt đầu hành trình học tiếng Anh của bạn ngay
                            hôm nay cùng Inglish. Đội ngũ của chúng tôi luôn sẵn
                            sàng hỗ trợ bạn!
                        </p>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button to="/tests" size="lg" class="px-8">
                            Bắt đầu học ngay
                        </Button>
                        <Button
                            variant="outline"
                            size="lg"
                            class="px-8 bg-transparent"
                            to="/contacts"
                        >
                            Liên hệ tư vấn
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
