<template>
    <nuxt-layout name="default">
        <error-page
            v-if="error"
            allow-retry
            message="Couldn't get data for this team."
            subtitle="Please try again later."
        />
        <template v-else>
            <div class="page-width-cap pb-4 px-3 md:px-16 text-lg font-light bg-sac-blue-700">
                <div class="sac-rounded-container flex flex-col sm:flex-row items-center text-center sm:text-left space-x-0 sm:space-x-4 bg-sac-blue-500">
                    <profile-photo
                        :src="team.icon_url"
                        class="w-20 h-20"
                    />
                    <div class="flex flex-col content-center">
                        <span class="text-4xl font-bold">{{ team.name }}</span>
                        <social-link-list
                            class="text-2xl mt-0.5"
                            :links="getTeamSocialLinks(team)"
                        />
                    </div>
                </div>
            </div>
            <div class="grow bg-sac-blue-500">
                <div class="page-width-cap py-4 px-3 md:px-16 text-lg font-light">
                    <div class="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mx-auto max-w-lg text-xl grid-flow-row ">
                        <div
                            v-for="row in dataRows"
                            :key="`data-row_${row.title}`"
                            class="border-b-2 border-sac-blue-100"
                        >
                            <span class="font-light">{{ row.title }}</span>
                            <span class="font-bold float-right">{{ row.value }}</span>
                        </div>
                    </div>
                    <div class="mt-4 w-full border-b-2 border-sac-blue-100 text-3xl font-bold">Players</div>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                        <div
                            v-for="player in team.players"
                            :key="player.id"
                            class="sac-rounded-container flex flex-col sm:flex-row items-center text-center sm:text-left space-x-0 sm:space-x-4"
                        >
                            <profile-photo
                                :src="getPlayerPhoto(player)"
                                class="w-16 h-16"
                            />
                            <div class="flex flex-col content-center">
                                <span class="text-3xl font-bold">{{ player.name }}</span>
                                <span class="text-md font-light -mt-0.5">{{ pluralize('tournament', player.tournament_count) }} played</span>
                                <social-link-list
                                    class="text-xl"
                                    :links="getPlayerSocialLinks(player)"
                                />
                            </div>
                        </div>
                    </div>
                    <div class="w-full border-b-2 border-sac-blue-100 text-3xl font-bold mt-2">Tournaments</div>
                    <sac-table
                        class="mt-4"
                        table-class="min-w-[600px]"
                    >
                        <template #head>
                            <th>Name</th>
                            <th>Points</th>
                            <th>Sets played</th>
                            <th>Sets won</th>
                            <th>Placement</th>
                        </template>
                        <tr
                            v-for="tournament in team.tournaments"
                            :key="tournament.tournament.id"
                        >
                            <td>
                                <a
                                    :href="getBattlefyTournamentUrl(tournament)"
                                    class="hover:underline"
                                >
                                    {{ tournament.tournament.name }}
                                </a>
                            </td>
                            <td>{{ tournament.points }}</td>
                            <td>{{ tournament.sets_played }}</td>
                            <td>{{ tournament.sets_won }}</td>
                            <td>{{ tournament.placement ? `#${tournament.placement}` : '-' }}</td>
                        </tr>
                    </sac-table>
                </div>
            </div>
        </template>
    </nuxt-layout>
</template>

<script lang="ts" setup>
import { isBlank, pluralize } from '~/utils/string';
import { useFetch, useRuntimeConfig } from '#app';
import { useMeta } from '#meta';
import { SacPlayer, SacTeam, SacTeamTournament } from '~/types/sacApi';
import ErrorPage from '~/components/ErrorPage.vue';
import SocialLinkList, { SocialLink } from '~/components/SocialLinkList.vue';
import ProfilePhoto from '~/components/ProfilePhoto.vue';
import SacTable from '~/components/SacTable.vue';
import { buildMetaTags } from '~/utils/meta';

const route = useRoute();
const id = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

const config = useRuntimeConfig();
const fetchResult = isBlank(id) ? null : await useFetch<SacTeam>(`${config.sacApiPath}/team/id/${id}`);

const team = fetchResult?.data;
const error = fetchResult?.error;

if (team.value !== null) {
    useMeta({
        title: `${team.value.name} - SAC`,
        meta: buildMetaTags({ title: `${team.value.name} on SAC`, imageUrl: team.value?.icon_url })
    });
}

definePageMeta({
    layout: false
});

const getTeamSocialLinks = (team: SacTeam): Array<SocialLink> => [
    { type: 'sendou-team', user: team.sendou_team?.url },
    { type: 'twitter', user: team.sendou_team?.twitter_name }
];

const getPlayerSocialLinks = (player: SacPlayer): Array<SocialLink> => [
    { type: 'sendou-player', user: player.discord_id },
    { type: 'twitter', user: player.sendou_profile?.profile.twitter_name },
    { type: 'youtube', user: player.sendou_profile?.profile.youtube_id },
    { type: 'twitch', user: player.sendou_profile?.profile.twitch_name },
];

const dataRows = [
    { title: 'Sets won/played', value: `${team.value?.sets_won}/${team.value?.sets_played}` },
    { title: 'Total points', value: team.value?.total_points },
    { title: 'Tournaments played', value: team.value?.tournaments.length },
    { title: 'Season placement', value: team.value?.season_placement ? `#${team.value?.season_placement}` : '-' }
];

const getBattlefyTournamentUrl = (tournament: SacTeamTournament) =>
    `https://battlefy.com/${tournament.tournament.battlefy_org_slug}/${tournament.tournament.battlefy_tournament_slug}/${tournament.tournament.battlefy_id}/info?infoTab=details`;

const getPlayerPhoto = (player: SacPlayer): string | null =>
    isBlank(player.discord_id) || isBlank(player.sendou_profile?.discord_avatar)
        ? null
        : `https://cdn.discordapp.com/avatars/${player.discord_id}/${player.sendou_profile?.discord_avatar}.jpg`;
</script>
