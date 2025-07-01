<script setup lang="ts">
// No logic needed for now
</script>

<template>
    <section class="mx-auto px-6">
        <div class="grid md:grid-cols-2 gap-12 items-center">
            <div class="text-center md:text-left">
                <h1
                    class="text-4xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
                >
                    Hành trình chinh phục
                    <span class="text-primary">Tiếng Anh</span>
                    của bạn bắt đầu tại đây.
                </h1>
                <p
                    class="mt-6 text-sm md:text-base text-slate-600 max-w-lg mx-auto md:mx-0"
                >
                    Làm chủ tiếng Anh với lộ trình học cá nhân hóa, bài tập
                    tương tác và cộng đồng người học luôn hỗ trợ. Bạn đã sẵn
                    sàng tự tin giao tiếp chưa?
                </p>
                <div
                    class="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
                >
                    <button
                        class="bg-primary cursor-pointer text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:bg-brand-dark transition-all duration-300 transform hover:-translate-y-1"
                    >
                        Start Your First Lesson
                    </button>
                    <button
                        class="bg-white cursor-pointer text-slate-700 font-bold py-3 px-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-200"
                    >
                        Explore Features
                    </button>
                </div>
            </div>
            <div class="max-w-md mx-auto md:max-w-full">
                <!-- SVG Hero illustration -->
                <svg
                    viewBox="0 0 500 350"
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-full h-auto"
                >
                    <defs>
                        <linearGradient
                            id="grad1"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                stop-color="#6366F1"
                                stop-opacity="1"
                            />
                            <stop
                                offset="100%"
                                stop-color="#A78BFA"
                                stop-opacity="1"
                            />
                        </linearGradient>
                        <linearGradient
                            id="grad2"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                stop-color="#F59E0B"
                                stop-opacity="1"
                            />
                            <stop
                                offset="100%"
                                stop-color="#FBBF24"
                                stop-opacity="1"
                            />
                        </linearGradient>
                    </defs>
                    <!-- Background shapes -->
                    <circle
                        cx="100"
                        cy="80"
                        r="120"
                        fill="url(#grad1)"
                        fill-opacity="0.1"
                    />
                    <path
                        d="M 300 50 Q 450 150 350 300 Q 250 450 150 250 Q 50 50 300 50"
                        fill="url(#grad2)"
                        fill-opacity="0.1"
                    />
                    <!-- Main character and elements -->
                    <g transform="translate(50, 40)">
                        <!-- Person -->
                        <circle cx="150" cy="180" r="20" fill="#4A5568" />
                        <path
                            d="M 130 200 C 130 230, 170 230, 170 200 V 270 H 130 Z"
                            fill="#4F46E5"
                        />
                        <!-- Laptop -->
                        <rect
                            x="180"
                            y="220"
                            width="120"
                            height="70"
                            rx="5"
                            fill="#CBD5E0"
                        />
                        <rect
                            x="175"
                            y="290"
                            width="130"
                            height="10"
                            rx="5"
                            fill="#A0AEC0"
                        />
                        <rect
                            x="185"
                            y="225"
                            width="110"
                            height="60"
                            rx="3"
                            fill="#EDF2F7"
                        />
                        <!-- Speech bubble icon on laptop -->
                        <path
                            d="M 235 240 L 255 240 L 255 250 L 245 250 L 240 255 L 240 250 L 235 250 Z"
                            fill="#6366F1"
                        />
                        <!-- Floating learning icons -->
                        <!-- Book -->
                        <g transform="translate(320, 80) scale(0.8)">
                            <path
                                d="M20 2 L 2 2 L 2 38 L 20 38 V 2 M 20 2 L 38 2 L 38 38 L 20 38"
                                stroke="#F59E0B"
                                stroke-width="3"
                                fill="none"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                            />
                            <line
                                x1="20"
                                y1="2"
                                x2="20"
                                y2="38"
                                stroke="#F59E0B"
                                stroke-width="3"
                            />
                        </g>
                        <!-- Lightbulb -->
                        <g transform="translate(60, 100) scale(0.8)">
                            <path
                                d="M20 2 C 10 2, 5 12, 5 20 C 5 28, 12 35, 20 35 C 28 35, 35 28, 35 20 C 35 12, 30 2, 20 2 Z"
                                fill="#FBBF24"
                            />
                            <rect
                                x="15"
                                y="35"
                                width="10"
                                height="5"
                                fill="#FBBF24"
                            />
                        </g>
                        <!-- Abstract checkmark -->
                        <path
                            d="M 350, 200 l 20,20 l 40,-40"
                            stroke="#34D399"
                            stroke-width="5"
                            fill="none"
                            stroke-linecap="round"
                        />
                    </g>
                </svg>
            </div>
        </div>
    </section>
</template>
