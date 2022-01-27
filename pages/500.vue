<template>
    <nuxt-layout>
        <error-page message="An error has occurred." />
    </nuxt-layout>
</template>

<script lang="ts" setup>
import ErrorPage from '~/components/ErrorPage.vue';

definePageMeta({
    layout: false
});
</script>
