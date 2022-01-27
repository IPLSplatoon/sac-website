<template>
    <nuxt-layout>
        <div class="grow bg-sac-blue-500">
            <div class="bg-sac-blue-600 py-4 flex justify-center">
                <team-search-box :value="query" />
            </div>
            <div
                v-if="isBlank(query)"
                class="page-width-cap py-4 px-3 md:px-16 text-lg font-light text-center"
            >
                Enter a team name to get started!
            </div>
            <error-page
                v-else-if="!!error"
                allow-retry
                message="An error has occurred."
            />
            <error-page
                v-else-if="results != null && results.length < 1"
                message="Couldn't find any teams."
            />
            <div
                v-else
                class="page-width-cap py-4 px-3 md:px-16 text-lg font-light text-center"
            >
                <div class="text-stone-300 mb-2 italic">Found {{ pluralize('result', results.length) }}.</div>
                <div
                    v-for="team in results"
                    :key="`team_${team.id}`"
                    class="bg-sac-blue-400 rounded-md
                            grid grid-cols-1 sm:grid-cols-with-large-icon gap-x-4 gap-y-1 sm:gap-y-0
                            p-4 mb-4 last:mb-0
                            text-left
                            border-2 border-sac-blue-100
                            items-center justify-items-center sm:justify-items-start
                            text-center sm:text-left"
                >
                    <div class="row-span-1 sm:row-span-2">
                        <nuxt-link :to="`/team/${team.id}`">
                            <div
                                class="w-full h-[80px] w-[80px] bg-cover bg-no-repeat bg-center rounded-full bg-sac-blue-300"
                                :style="`background-image: url('${isBlank(team.icon_url) ? '/images/sac-placeholder-pfp.png' : team.icon_url}')`"
                            />
                        </nuxt-link>
                    </div>
                    <nuxt-link :to="`/team/${team.id}`" class="text-4xl font-bold">{{ team.name }}</nuxt-link>
                    <div class="text-lg font-light">
                        {{ pluralize('point', team.total_points) }}, {{ pluralize('set', team.sets_won) }} won out of {{ team.sets_played }}
                    </div>
                </div>
            </div>
        </div>
    </nuxt-layout>
</template>

<script lang="ts" setup>
import TeamSearchBox from '~/components/TeamSearchBox.vue';
import { isBlank, pluralize } from '~/utils/string';
import { useFetch, useRuntimeConfig } from '#app';
import { SacSearchResult } from '~/types/sacApi';
import ErrorPage from '~/components/ErrorPage.vue';
import { watch, ref } from '@vue/runtime-core';

const results = ref<SacSearchResult>([]);
const error = ref(false);

const config = useRuntimeConfig();
const fetchData = async (query: string) => {
    const fetchResult = await useFetch<string, SacSearchResult>(`${config.sacApiPath}/team/search/${query}`);
    results.value = fetchResult.data.value;
    error.value = fetchResult.error.value;
};

const route = useRoute();
const query = ref('');
watch(() => route.query.name, async (name) => {
    const newQuery = Array.isArray(name) ? name[0] : name;
    query.value = newQuery;
    await fetchData(newQuery);
}, { immediate: true });

definePageMeta({
    layout: false
});
</script>
