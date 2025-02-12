<script setup lang="ts">
import { ref } from "vue";
import { deviceType } from "./utils/flexible";

const count = ref(0);
const increment = () => {
  count.value++;
};
</script>

<template>
  <div class="container mx-auto p-4">
    <!-- 根据设备类型显示不同的内容 -->
    <p class="mb-4 text-center text-gray-600">
      <span class="icon-[mdi-light--home] size-5"></span>
      当前设备类型:
      <span v-if="deviceType.isMobile">移动端</span>
      <span v-else-if="deviceType.isTablet">平板</span>
      <span v-else>桌面端</span>
    </p>
    <header class="my-4 text-center">
      <h1 class="text-3xl font-bold md:text-5xl">
        响应式 TailwindCSS + TypeScript
      </h1>
      <p class="mt-2 text-lg md:text-xl">
        这是一个使用 TailwindCSS 和 TypeScript 的响应式页面
      </p>
    </header>
    <main class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      <div class="rounded-lg bg-white p-6 shadow-md">
        <h2 class="mb-2 text-2xl font-semibold">卡片 1</h2>
        <p class="text-gray-700">这是一个响应式卡片。</p>
      </div>
      <div class="rounded-lg bg-white p-6 shadow-md">
        <h2 class="mb-2 text-2xl font-semibold">卡片 2</h2>
        <p class="text-gray-700">这是一个响应式卡片。</p>
      </div>
      <div class="rounded-lg bg-white p-6 shadow-md">
        <h2 class="mb-2 text-2xl font-semibold">卡片 3</h2>
        <p class="text-gray-700">这是一个响应式卡片。</p>
      </div>
    </main>
    <div class="mt-8 text-center">
      <button
        @click="increment"
        class="rounded-lg bg-blue-500 px-4 py-2 text-white shadow-md hover:bg-blue-700"
      >
        点击我
      </button>
      <p class="mt-4 text-xl">计数: {{ count }}</p>
    </div>
  </div>
</template>

<style scoped>
/* 添加任何 scoped 样式 */
</style>
