<template>
    <div
        class="bg-cover bg-no-repeat bg-center rounded-full bg-sac-blue-300"
        :style="`background-image: url('${src}'), url('/images/sac-placeholder-pfp.png')`"
    />
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
    name: 'ProfilePhoto',

    props: {
        src: {
            type: String,
            required: true
        }
    }
});
</script>
