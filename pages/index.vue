<template>
    <NuxtLayout name="default">
        <template #header-background>
            <div class="overflow-hidden h-full relative">
                <video
                    id="header-video"
                    ref="headerVideo"
                    preload="none"
                    autoplay
                    loop
                    playsinline
                    muted
                    class="video-cover transition-opacity duration-1000 opacity-0"
                />
            </div>
        </template>
        <template #header>
            <div class="page-width-cap my-10 md:my-20 drop-shadow-lg">
                <div class="text-5xl md:text-7xl font-bold">
                    Splatoon<br>
                    Advanced<br>
                    Circuit
                </div>
                <div class="text-3xl font-light my-2 text-sac-red-light">Season 7</div>
                <a
                    href="#more-info-section"
                    class="link-button link-button-red"
                >
                    Read more
                </a>
                <i class="mx-1.5" />
                <a
                    href="https://iplabs.ink/discord"
                    class="link-button link-button-outline-white"
                >
                    <font-awesome-icon :icon="['fab', 'discord']" />
                    Join our Discord
                </a>
            </div>
        </template>
        <div class="overflow-hidden grow flex flex-col">
            <div
                id="more-info-section"
                class="bg-sac-blue-500 py-8 flex flex-row justify-center"
            >
                <div class="max-w-screen-lg px-3 md:px-16 ml-16 md:ml-32 w-full">
                    <p class="text-4xl font-bold mb-2">SAC is back for Season 7!</p>
                    <p class="text-lg font-light">
                        SAC is back for the summer with Season 7! Play with us to claim your title as the best mid-level team! +3 and below are eligible.
                    </p>
                </div>
            </div>
            <div class="py-8 flex flex-row justify-center relative grow">
                <div class="max-w-screen-lg w-full px-3 md:px-16 ml-16 md:ml-32">
                    <div class="tournaments-line" />
                    <div v-if="pending">
                        <p class="text-4xl font-bold mb-2">Loading tournaments...</p>
                    </div>
                    <div v-else-if="sacTournaments.length > 0">
                        <div
                            v-for="tournament in sacTournaments"
                            :key="`tournament_${tournament._id}`"
                            class="relative mb-8 last:mb-2"
                        >
                            <div class="station-button-container">
                                <div class="station-button" />
                            </div>
                            <p class="text-4xl font-bold mb-2">{{ tournament.name }}</p>
                            <p class="text-lg font-light">
                                {{ formatDateLong(addMinutes(new Date(tournament.startTime), 30)) }}
                                <span v-if="tournament.teamsCount > 0">• {{ pluralize('team', tournament.teamsCount) }}</span>
                            </p>
                            <a
                                :href="`https://battlefy.com/inkling-performance-labs/${tournament.slug}/${tournament._id}/info?infoTab=details`"
                                class="link-button link-button-cyan mt-3"
                                :class="{
                                    'link-button-cyan': tournament.status === 'registration-open',
                                    'link-button-gray': tournament.status !== 'registration-open'
                                }"
                            >
                                Registration {{ tournament.status === 'registration-open' ? 'open!' : 'closed' }}
                            </a>
                        </div>
                    </div>
                    <div
                        v-else
                        class="relative mb-8 last:mb-2"
                    >
                        <div class="station-button-container">
                            <div class="station-button" />
                        </div>
                        <p class="text-4xl font-bold mb-2">We couldn't find any upcoming tournaments.</p>
                        <p class="text-lg font-light">Visit us on Battlefy to see more!</p>
                        <a
                            href="https://battlefy.com/inkling-performance-labs"
                            class="link-button link-button-cyan mt-3"
                        >Battlefy</a>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { BfyOrganizationTournaments } from '~/types/battlefy';
import { formatDateLong, addMinutes } from '~/utils/date';
import { pluralize } from '~/utils/string';

const headerVideo = ref(null);

onMounted(() => {
    const headerVideoElem = headerVideo.value ?? document.getElementById('header-video') as HTMLVideoElement;
    if (headerVideoElem) {
        headerVideoElem.src = 'https://static.iplabs.work/SAC/web-v2.mp4';
        headerVideoElem.addEventListener('loadeddata', () => {
            headerVideoElem.style.opacity = '1';
        });
    }
});

definePageMeta({
    layout: false
});

const bfyUpcomingTournaments = await useFetch<BfyOrganizationTournaments>('https://search.battlefy.com/tournament/organization/5c6dbd2da605be0329ecf36a/upcoming?name=SAC+Season+7&page=1&size=2', { lazy: true, server: false });
const bfyPastTournaments = await useFetch<BfyOrganizationTournaments>(
    'https://search.battlefy.com/tournament/organization/5c6dbd2da605be0329ecf36a/past?name=SAC+Season+7&page=1&size=10',
    { lazy: true, key: 'bfy-past-tournaments', server: false, transform: (response) => {
        response.tournaments.sort((a, b) => new Date(a.startTime).valueOf() - new Date(b.startTime).valueOf());
        return response;
    } });
const pending = computed(() => bfyPastTournaments.pending.value || bfyUpcomingTournaments.pending.value);
const sacTournaments = computed(() => [
    ...(bfyPastTournaments.data.value?.tournaments ?? []),
    ...(bfyUpcomingTournaments.data.value?.tournaments ?? [])
]);

defineExpose({
    sacTournaments
});

</script>

<style lang="scss">
.tournaments-line {
    @apply -translate-x-12 -translate-y-36 md:-translate-x-14 md:-translate-y-24 bg-sac-red-light;

    width: 16px;
    height: 200%;
    position: absolute;

    &:before {
        @apply border-sac-red-light rounded-full absolute;

        border-width: 12px;
        content: '';
        width: 48px;
        height: 48px;
        top: -40px; left: -16px;
    }
}

.station-button-container {
    @apply flex items-center absolute h-full -translate-x-16 md:-translate-x-[4.5rem];

    > .station-button {
        @apply border-sac-red-light bg-sac-blue-700 rounded-full absolute;

        border-width: 12px;
        content: '';
        width: 48px;
        height: 48px;
    }
}
</style>
