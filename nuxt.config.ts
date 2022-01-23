import { defineNuxtConfig } from 'nuxt3';

// Adding this configuration when using the dev server prevents CSS from loading.
// Removing this configuration when in production mode prevents images from loading.
const productionConfig = {
    vite: {
        base: '/'
    }
};

export default defineNuxtConfig({
    css: ['@/assets/css/styles.scss'],
    build: {
        postcss: {
            postcssOptions: {
                plugins: {
                    tailwindcss: {},
                    autoprefixer: {}
                }
            }
        }
    },
    meta: {
        title: 'SAC',
        link: [
            { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
            { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
            { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }
        ]
    },
    publicRuntimeConfig: {
        app: {
            basePath: '/',
            assetsPath: '/_nuxt/'
        },
        sacApiPath: 'https://api.sac.ink'
    },
    ...(process.env.NODE_ENV === 'production' ? productionConfig : {})
});
