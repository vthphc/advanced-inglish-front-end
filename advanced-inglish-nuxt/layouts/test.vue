<script setup lang="ts"></script>

<template>
    <div class="">
        <Navbar />
        <div class="container p-4 md:p-6 lg:p-8 mx-auto">
            <slot />
        </div>
    </div>
</template>

<style scoped>
.container {
    max-width: 100vw;
}
</style>
