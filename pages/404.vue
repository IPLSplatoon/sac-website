<template>
    <error-page message="Page not found!" />
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import ErrorPage from '~/components/ErrorPage.vue';

export default defineComponent({
    name: 'error',
    components: { ErrorPage }
})
</script>
