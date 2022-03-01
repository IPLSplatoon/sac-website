<template>
    <nuxt-layout name="default">
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
            <div
                v-else-if="pending"
                class="text-center py-6 text-4xl"
            >
                Loading...
            </div>
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
                    class="sac-rounded-container
                            grid grid-cols-1 sm:grid-cols-with-large-icon gap-x-4 gap-y-1 sm:gap-y-0
                            mb-4 last:mb-0
                            text-left
                            items-center justify-items-center sm:justify-items-start
                            text-center sm:text-left"
                >
                    <div class="row-span-1 sm:row-span-2">
                        <nuxt-link :to="`/team/${team.id}`">
                            <profile-photo
                                :src="team.icon_url"
                                class="h-[80px] w-[80px]"
                            />
                        </nuxt-link>
                    </div>
                    <nuxt-link
                        :to="`/team/${team.id}`"
                        class="text-4xl font-bold"
                    >
                        {{ team.name }}
                    </nuxt-link>
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
import ProfilePhoto from '~/components/ProfilePhoto.vue';

const results = ref<SacSearchResult>([]);
const error = ref(false);
const pending = ref(true);

const config = useRuntimeConfig();
const fetchData = async (query: string) => {
    pending.value = true;
    const fetchResult = await useFetch<SacSearchResult>(`${config.sacApiPath}/team/search/${query}`);
    pending.value = false;
    results.value = fetchResult.data.value;
    error.value = fetchResult.error.value;
};

const route = useRoute();
const query = ref('');
watch(() => route.query.name, async (name) => {
    const newQuery = Array.isArray(name) ? name[0] : name;

    if (isBlank(newQuery)) {
        return;
    }

    query.value = newQuery;
    await fetchData(newQuery);
}, { immediate: true });

definePageMeta({
    layout: false
});
</script>
