<template>
    <div class="text-center bg-sac-blue-500 py-6">
        <p class="text-4xl">{{ message }}</p>
        <p class="text-2xl font-light mt-2 text-stone-200">{{ subtitle }}</p>
        <nuxt-link
            to="/"
            class="link-button link-button-red mt-5"
        >
            Return to main page
        </nuxt-link>
        <a
            v-if="allowRetry"
            class="link-button link-button-red mt-5 ml-5"
            href="#"
            @click="retry"
        >
            Try again
        </a>
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
        },
        subtitle: {
            type: String,
            default: ''
        },
        allowRetry: {
            type: Boolean,
            default: false
        }
    },

    setup() {
        return {
            retry() {
                window.location.reload();
            }
        };
    }
});
</script>
