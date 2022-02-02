<template>
    <nuxt-layout name="default">
        <error-page message="An error has occurred." />
    </nuxt-layout>
</template>

<script lang="ts" setup>
import ErrorPage from '~/components/ErrorPage.vue';

definePageMeta({
    layout: false
});
</script>
