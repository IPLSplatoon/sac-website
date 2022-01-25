<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <nuxt-layout>
        <template #header>
            <div class="page-width-cap my-10 md:my-20 text-5xl md:text-7xl font-bold">
                Ranking
            </div>
        </template>
        <div class="grow bg-sac-blue-500">
            <div class="bg-sac-blue-600 py-4 flex justify-center">
                <team-search-box />
            </div>
            <div
                v-if="!!error"
                class="page-width-cap py-4 px-3 md:px-16 text-red-300 text-lg"
            >
                Encountered an error trying to get ranking data.
            </div>
            <div
                v-else
                class="page-width-cap py-4 px-3 md:px-16 text-lg"
            >
                <div class="mb-4 text-2xl">Top teams</div>
                <table class="w-full table-auto border-collapse">
                    <thead class="text-left bg-sac-blue-700 text-2xl border-x-2 border-t-2 border-sac-blue-100">
                        <tr>
                            <th class="w-20 pl-8 font-normal py-2">#</th>
                            <th class="w-16 font-normal">Pts</th>
                            <th class="pl-20 font-normal">Team</th>
                        </tr>
                    </thead>
                    <tbody class="font-light">
                        <tr
                            v-for="(team, index) in rankings"
                            :key="`ranking-team_${team.id}`"
                            class="border-b-2 border-x-2 border-sac-blue-100 py-2 even:bg-sac-blue-400"
                        >
                            <td class="pl-8">{{ index + 1 }}</td>
                            <td>{{ team.total_points }}</td>
                            <td class="flex flex-row items-center">
                                <div
                                    class="h-16 w-16 inline-block bg-cover bg-no-repeat bg-center rounded-full mr-4 my-2"
                                    :style="`background-image: url('${team.icon_url === '' ? '/images/sac-placeholder-pfp.png' : team.icon_url}')`"
                                />
                                {{ team.name }}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="mt-4 text-stone-300 font-light italic">Displaying the top {{ rankings.length }} teams. Data retrieved {{ formatDateShort(new Date()) }}</div>
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

definePageMeta({
    layout: false
});

useMeta({
    title: 'SAC Ranking'
});

const config = useRuntimeConfig();
const rankingResponse = await useFetch<string, SacLeaderboard>(`${config.sacApiPath}/team/top`);

const rankings = rankingResponse.data.value ?? [];
const error = rankingResponse.error;
</script>
