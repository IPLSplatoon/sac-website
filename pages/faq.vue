<template>
    <nuxt-layout name="default">
        <template #header>
            <div class="page-width-cap my-10 md:my-20 text-5xl md:text-7xl font-bold">
                Frequently Asked Questions
            </div>
        </template>
        <div class="grow bg-sac-blue-500">
            <div class="page-width-cap py-4 px-3 md:px-16">
                <details
                    v-for="(item, index) in FaqItems"
                    :key="`faq-item_${index}`"
                    class="faq-item"
                >
                    <summary class="text-2xl font-normal cursor-pointer">{{ item.title }}</summary>
                    <!-- eslint-disable vue/no-v-html -->
                    <div
                        class="text-lg font-light mt-2"
                        v-html="item.description"
                    />
                    <!-- eslint-enable vue/no-v-html -->
                </details>
            </div>
        </div>
    </nuxt-layout>
</template>

<script lang="ts" setup>
import FaqItems from '~/data/faqItems';
import { useHead } from '#head';

definePageMeta({
    layout: false
});

useHead({
    title: 'SAC FAQ'
});
</script>

<style lang="scss">
.faq-item {
    @apply open:bg-sac-blue-400 border-2 open:border-sac-blue-100 border-transparent px-4 py-2 rounded duration-default mb-2;

    a {
        @apply underline text-blue-200 visited:text-purple-300 active:text-purple-400;
    }
}
</style>
