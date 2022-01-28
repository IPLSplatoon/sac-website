<template>
    <div
        class="bg-cover bg-no-repeat bg-center rounded-full bg-sac-blue-300"
        :style="`background-image: ${backgroundImage}`"
    />
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/runtime-core';
import { imageExists } from '~~/utils/image';

export default defineComponent({
    name: 'ProfilePhoto',

    props: {
        src: {
            type: [String, null] as PropType<string | null>,
            required: true
        }
    },

    async setup(props) {
        const imageLoaded = ref<boolean | null>(null);

        onMounted(async () => {
            imageLoaded.value = await imageExists(props.src);
        });

        return {
            backgroundImage: computed(() => {
                return imageLoaded.value ? `url('${props.src}')` : 'url(\'/images/sac-placeholder-pfp.png\')';
            })
        };
    }
});
</script>
