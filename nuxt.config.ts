import { defineNuxtConfig } from 'nuxt';

export default defineNuxtConfig({
    css: ['@/assets/css/styles.scss'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },
    app: {
        head: {
            title: 'SAC',
            link: [
                { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
            ],
            meta: [
                { name: 'title', content: 'Splatoon Advanced Circuit' },
                { name: 'description', content: 'Splatoon Advanced Circuit is a mid-level Splatoon competition brought to you by Inkling Performance Labs.' },

                { property: 'og:type', content: 'website' },
                { property: 'og:url', content: 'https://sac.ink/' },
                { property: 'og:title', content: 'Splatoon Advanced Circuit' },
                { property: 'og:description', content: 'Splatoon Advanced Circuit is a mid-level Splatoon competition brought to you by Inkling Performance Labs.' },
                { content: 'https://files.iplabs.work/file/iplabs-public/SAC/SAC_Full-Logo.png', property: 'og:image' },

                { name: 'twitter:card', content: 'summary' },
                { property: 'twitter:url', content: 'https://sac.ink/' },
                { property: 'twitter:title', content: 'Splatoon Advanced Circuit' },
                { property: 'twitter:description', content: 'Splatoon Advanced Circuit is a mid-level Splatoon competition brought to you by Inkling Performance Labs.' },
                { property: 'twitter:image', content: 'https://files.iplabs.work/file/iplabs-public/SAC/SAC_Full-Logo.png' },

                { name: 'theme-color', content: '#001038' }
            ]
        }
    },
    runtimeConfig: {
        public: {
            sacApiPath: 'https://api.sac.ink'
        }
    }
});
