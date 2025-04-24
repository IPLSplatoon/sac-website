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
                    Squid<br>
                    Advanced<br>
                    Circuit
                </div>
                <div class="text-3xl font-light my-2 text-sac-red-light">Season 10</div>
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
                    <p class="text-4xl font-bold mb-2">SAC is back for Season 10!</p>
                    <p class="text-lg font-light">
                        SAC is back with Season 10! Play with us to claim your title as the best mid-level team!
                    </p>
                </div>
            </div>
            <div class="py-8 flex flex-row justify-center relative grow">
                <div class="max-w-screen-lg w-full px-3 md:px-16 ml-16 md:ml-32">
                    <div class="tournaments-line" />
                    <div>
                        <div class="relative mb-8">
                            <div class="station-button-container">
                                <div class="station-button" />
                            </div>
                            <div class="text-5xl font-bold">Season 10 Qualifiers</div>
                        </div>
                        <div
                            v-for="(tournament, i) in sacTournaments"
                            :key="`tournament_${i}`"
                            class="relative mb-8 last:mb-2"
                        >
                            <div class="station-button-container">
                                <div class="station-button" />
                            </div>
                            <p class="text-4xl font-bold mb-2">{{ tournament.name }}</p>
                            <p class="text-lg font-light">
                                {{ tournament.date }}
                            </p>
                            <a
                                :href="tournament.link"
                                target="_blank"
                                class="link-button link-button-cyan mt-3"
                            >
                                View on sendou.ink
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script lang="ts" setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

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

const sacTournaments = [
    {
        name: 'Qualifier 1',
        link: 'https://sendou.ink/to/1547/register',
        date: 'April 26, 2025'
    },
    {
        name: 'Qualifier 2',
        link: 'https://sendou.ink/to/1548/register',
        date: 'May 3, 2025'
    },
    {
        name: 'Qualifier 3',
        link: 'https://sendou.ink/to/1549/register',
        date: 'May 10, 2025'
    },
    {
        name: 'Qualifier 4',
        link: 'https://sendou.ink/to/1550/register',
        date: 'May 24, 2025'
    }
];

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
