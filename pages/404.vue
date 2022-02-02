<template>
    <nuxt-layout name="default">
        <error-page message="Page not found!" />
    </nuxt-layout>
</template>

<script lang="ts" setup>
import ErrorPage from '~/components/ErrorPage.vue';

definePageMeta({
    layout: false
});
</script>
