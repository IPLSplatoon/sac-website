<template>
    <div class="w-full overflow-x-auto">
        <table
            class="table-auto border-collapse sac-table w-full"
            :class="tableClass"
        >
            <thead class="text-left bg-sac-blue-700 text-xl border-x-2 border-t-2 border-sac-blue-100">
                <slot name="head" />
            </thead>
            <tbody class="font-light">
                <slot />
            </tbody>
        </table>
    </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core';

export default defineComponent({
    name: 'SacTable',

    props: {
        tableClass: {
            type: String,
            default: ''
        }
    }
});
</script>

<style lang="scss">
.sac-table {
    thead th {
        @apply font-normal first:pl-8 border-t-2 pr-4 border-t-sac-blue-100;
    }

    tbody {
        @apply font-light;
    }

    tbody tr {
        @apply border-b-2 border-x-2 border-sac-blue-100 py-2 even:bg-sac-blue-400;
    }

    tbody td {
        @apply first:pl-8 pr-4;
    }
}
</style>
