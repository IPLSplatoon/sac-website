<template>
    <form
        method="get"
        action="/search"
        class="flex flex-row justify-center"
    >
        <input
            v-model="inputValue"
            name="name"
            type="text"
            placeholder="Search for a team..."
            class="bg-sac-blue-200 placeholder:italic font-light py-1 px-2 text-xl rounded-md box-border w-56 sm:w-72 focus:outline-none focus:ring-sac-red-dark focus:border-none focus:ring-2"
            enterkeyhint="search"
        >
        <button type="submit">
            <font-awesome-icon
                :icon="['fas', 'search']"
                class="text-2xl ml-3"
            />
        </button>
    </form>
</template>

<script lang="ts" setup>
import { ref, watch } from '@vue/runtime-core';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch.js';
library.add(faSearch);

const props = defineProps({
    value: {
        type: String,
        default: ''
    }
});

const inputValue = ref('');
watch(() => props.value, newValue => {
    inputValue.value = newValue;
}, { immediate: true });
</script>
