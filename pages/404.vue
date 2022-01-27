<template>
    <nuxt-layout>
        <error-page message="Page not found!" />
    </nuxt-layout>
</template>

<script lang="ts" setup>
import ErrorPage from '~/components/ErrorPage.vue';

definePageMeta({
    layout: false
});
</script>
