<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nuxt-layout name="default">
        <template #header>
            <div class="page-width-cap my-10 md:my-20 text-5xl md:text-7xl font-bold">
                Ranking
            </div>
        </template>
        <div class="grow bg-sac-blue-500">
            <div class="bg-sac-blue-600 py-4 flex justify-center">
                <team-search-box />
            </div>
            <error-page
                v-if="!!error"
                allow-retry
                message="Encountered an error trying to get ranking data."
            />
            <div
                v-else
                class="page-width-cap py-4 px-3 md:px-16 text-lg"
            >
                <sac-table>
                    <template #head>
                        <tr>
                            <th class="w-20 py-1">#</th>
                            <th class="w-16">Pts</th>
                            <th class="pl-20">Team</th>
                        </tr>
                    </template>
                    <tr
                        v-for="team in rankings"
                        :key="`ranking-team_${team.id}`"
                    >
                        <td>{{ team.season_placement }}</td>
                        <td>{{ team.total_points }}</td>
                        <td class="flex flex-row items-center">
                            <nuxt-link :to="`/team/${team.id}`">
                                <profile-photo
                                    :src="team.icon_url"
                                    class="h-16 w-16 inline-block mr-4 my-2"
                                />
                            </nuxt-link>
                            <nuxt-link :to="`/team/${team.id}`">
                                {{ team.name }}
                            </nuxt-link>
                        </td>
                    </tr>
                </sac-table>
                <div class="mt-4 text-stone-300 font-light italic">
                    Displaying the top {{ pluralize('team', rankings.length) }}. Data retrieved {{ formatDateShort(new Date()) }}
                </div>
            </div>
        </div>
    </nuxt-layout>
</template>

<script lang="ts" setup>
import TeamSearchBox from '~/components/TeamSearchBox.vue';
import { useMeta } from '#meta';
import { useFetch, useRuntimeConfig } from '#app';
import { SacLeaderboard } from '~/types/sacApi';
import { formatDateShort } from '~/utils/date';
import { pluralize } from '~/utils/string';
import ProfilePhoto from '~/components/ProfilePhoto.vue';
import SacTable from '~/components/SacTable.vue';
import ErrorPage from '~/components/ErrorPage.vue';

definePageMeta({
    layout: false
});

useMeta({
    title: 'SAC Ranking'
});

const config = useRuntimeConfig();
const rankingResponse = await useFetch<SacLeaderboard>(`${config.sacApiPath}/team/top`);

const rankings = rankingResponse.data.value ?? [];
const error = rankingResponse.error;
</script>
