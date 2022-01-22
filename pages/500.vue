<template>
    <error-page message="An error has occurred." />
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';
import ErrorPage from '~/components/ErrorPage.vue';

export default defineComponent({
    name: '500',

    components: { ErrorPage }
})
</script>
