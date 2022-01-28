<template>
    <span class="space-x-1">
        <a
            v-for="link in displayedLinks"
            :key="`social-link_${link.user}`"
            :href="getUrl(link)"
            :title="getTitle(link)"
            class="text-white hover:text-stone-300 duration-default"
        >
            <i
                v-if="link.type === 'sendou-player' || link.type === 'sendou-team'"
                :class="getIcon(link)"
                class="-mx-1"
            />
            <font-awesome-icon
                v-else
                :icon="['fab', getIcon(link)]"
            />
        </a>
    </span>
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from '@vue/runtime-core';
import { isBlank } from '~/utils/string';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter } from '@fortawesome/free-brands-svg-icons/faTwitter.js';
import { faTwitch } from '@fortawesome/free-brands-svg-icons/faTwitch.js';
import { faYoutube } from '@fortawesome/free-brands-svg-icons/faYoutube.js';

library.add(faTwitter, faTwitch, faYoutube);

export type SocialLink = { type: 'twitter' | 'sendou-team' | 'sendou-player' | 'twitch' | 'youtube', user: string };

export default defineComponent({
    name: 'SocialLinkList',

    components: {
        FontAwesomeIcon
    },

    props: {
        links: {
            type: Array as PropType<Array<SocialLink>>,
            required: true
        }
    },

    setup(props) {
        return {
            displayedLinks: computed(() => props.links.filter(link => !isBlank(link.user))),
            getUrl(link: SocialLink): string {
                switch (link.type) {
                    case 'twitter':
                        return `https://twitter.com/${link.user}`;
                    case 'sendou-team':
                        return `${link.user}`;
                    case 'sendou-player':
                        return `https://sendou.ink/u/${link.user}`;
                    case 'twitch':
                        return `https://twitch.tv/${link.user}`;
                    case 'youtube':
                        return `https://youtube.com/channel/${link.user}`;
                }
            },
            getTitle(link: SocialLink): string {
                switch (link.type) {
                    case 'twitter':
                        return 'Twitter';
                    case 'sendou-team':
                    case 'sendou-player':
                        return 'sendou.ink profile';
                    case 'twitch':
                        return 'Twitch';
                    case 'youtube':
                        return 'YouTube';
                }
            },
            getIcon(link: SocialLink): string {
                switch (link.type) {
                    case 'twitter':
                        return 'twitter';
                    case 'sendou-team':
                    case 'sendou-player':
                        return 'icon-sendou-ink';
                    case 'twitch':
                        return 'twitch';
                    case 'youtube':
                        return 'youtube';
                }
            }
        };
    }
});
</script>
