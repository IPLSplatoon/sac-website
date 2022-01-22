<template>
<div class="text-center bg-sac-blue-500 py-6">
    <p class="text-4xl">{{ message }}</p>
    <a href="/" class="link-button link-button-red mt-5">Return to main page</a>
</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
    name: 'ErrorPage',

    props: {
        message: {
            type: String,
            required: true
        }
    }
})
</script>
