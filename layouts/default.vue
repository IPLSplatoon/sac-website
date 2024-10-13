<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div class="page-wrapper">
        <header class="w-full sm:px-3 md:px-16 py-6 relative">
            <div class="absolute w-full h-full left-0 top-0 -z-10">
                <slot name="header-background" />
            </div>
            <div class="page-width-cap z-10 relative">
                <div class="w-full h-20 flex flex-row justify-between items-center drop-shadow-lg">
                    <nuxt-link
                        to="/"
                        class="w-max h-full z-10 ml-3"
                    >
                        <img
                            src="/images/sac-logo-header.png"
                            alt="SAC Logo"
                            class="h-full"
                        >
                    </nuxt-link>
                    <font-awesome-icon
                        :icon="['fas', 'bars']"
                        class="text-3xl md:hidden cursor-pointer mr-5 z-10"
                        @click="menuOpen = !menuOpen"
                    />
                    <div
                        class="
                            absolute md:relative
                            right-0 -top-6 sm:top-16 md:top-0 w-full sm:w-auto sm:right-3
                            flex flex-col items-center md:flex-row
                            bg-stone-900/90 md:bg-transparent
                            rounded-b-md sm:rounded-md p-2 md:p-0 pt-32 pb-6 sm:py-2
                            md:!opacity-100 transition-opacity duration-default"
                        :class="{ 'opacity-100': menuOpen, 'opacity-0 pointer-events-none md:pointer-events-auto': !menuOpen }"
                    >
                        <nuxt-link
                            v-for="link in navLinks"
                            :key="`link-to_${link.path}`"
                            :to="link.path"
                            class="header-link"
                            :class="{ active: route.path === link.path }"
                        >
                            {{ link.text }}
                        </nuxt-link>
                        <div class="grid grid-cols-3 grid-rows-2 gap-1.5 text-white text-3xl md:text-2xl text-center ml-0 md:ml-4">
                            <a
                                href="https://iplabs.ink/discord"
                                class="hover:text-brand-discord hover:bg-stone-800 rounded-md duration-default"
                                title="Discord"
                            >
                                <font-awesome-icon :icon="['fab', 'discord']" />
                            </a>
                            <a
                                href="https://battlefy.com/inkling-performance-labs"
                                class="hover:text-brand-battlefy hover:bg-stone-800 rounded-md duration-default"
                                title="Battlefy"
                            >
                                <i class="icon-battlefy" />
                            </a>
                            <a
                                href="https://www.youtube.com/channel/UCFRVQSUskcsB5NjjIZKkWTA"
                                class="hover:text-brand-youtube hover:bg-stone-800 rounded-md duration-default"
                                title="YouTube"
                            >
                                <font-awesome-icon :icon="['fab', 'youtube']" />
                            </a>
                            <a
                                href="https://www.twitch.tv/IPLSplatoon"
                                class="hover:text-brand-twitch hover:bg-stone-800 rounded-md duration-default"
                                title="Twitch"
                            >
                                <font-awesome-icon :icon="['fab', 'twitch']" />
                            </a>
                            <a
                                href="https://twitter.com/IPLSplatoon"
                                class="hover:text-brand-twitter hover:bg-stone-800 rounded-md duration-default"
                                title="Twitter"
                            >
                                <font-awesome-icon :icon="['fab', 'twitter']" />
                            </a>
                            <a
                                href="https://iplabs.ink"
                                class="hover:text-brand-iplabs hover:bg-stone-800 rounded-md duration-default"
                                title="IPLabs.ink"
                            >
                                <i class="icon-iplabs" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="px-3">
                <slot name="header" />
            </div>
        </header>
        <main class="grow flex flex-col">
            <slot />
        </main>
        <footer class="w-full px-3 md:px-16 text-white bg-sac-blue-1000 py-12 md:py-20 text-gray-200">
            <div class="mx-auto text-center font-light">
                <img
                    class="mx-auto sm:w-96 w-3/4 mb-2"
                    src="/images/ipl-powered.png"
                    alt="Powered By Inkling Performance Labs"
                >
                <p class="mb-4">Splatoon Advanced Circuit is a part of the Inkling Performance Labs Family.</p>
                <p>© {{ new Date().getFullYear() }} Inkling Performance Labs</p>
                <p>Designed by the IPL team</p>
            </div>
        </footer>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/runtime-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube.js';
import { faDiscord } from '@fortawesome/free-brands-svg-icons/faDiscord.js';
import { faTwitch } from '@fortawesome/free-brands-svg-icons/faTwitch.js';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter.js';
import { faBars } from '@fortawesome/free-solid-svg-icons/faBars.js';

library.add(faTwitter, faYoutube, faDiscord, faTwitch, faBars);

export default defineComponent({
    components: {
        FontAwesomeIcon
    },

    setup() {
        const menuOpen = ref(false);
        const route = useRoute();

        return {
            menuOpen,
            route,
            navLinks: [
                {
                    path: '/faq',
                    text: 'FAQ'
                },
                {
                    path: 'https://play.sac.ink/leaderboard',
                    text: 'Ranking'
                }
            ]
        };
    }
});
</script>

<style lang="scss">
.header-link {
    @apply text-2xl font-normal mx-1 mb-2 md:mb-0 hover:bg-stone-800 rounded-md duration-default px-3;

    &.active {
        @apply text-stone-800 bg-white;
    }
}
</style>
