module.exports = {
    content: [
        './assets/**/*.css',
        './components/**/*.{vue,js}',
        './layouts/**/*.{vue,js}',
        './pages/*.vue',
        './pages/**/*.vue',
        './plugins/**/*.{js,ts}',
        './*.{vue,js,ts}',
        './nuxt.config.{js,ts}',
    ],
    theme: {
        extend: {
            gridTemplateColumns: {
                'with-large-icon': '80px 1fr'
            },
            transitionDuration: {
                default: '150ms'
            },
            colors: {
                'brand-youtube': '#FF0000',
                'brand-twitter': '#1DA1F2',
                'brand-discord': '#7289DA',
                'brand-battlefy': '#DD4B5E',
                'brand-twitch': '#9146FF',
                'brand-iplabs': '#09A100',
                'sac-blue': {
                    '100': '#003E66',
                    '200': '#00345E',
                    '300': '#002B57',
                    '400': '#00234F',
                    '500': '#001C47',
                    '600': '#00153E',
                    '700': '#001038',
                    '800': '#000B30',
                    '900': '#000627',
                    '1000': '#00011D'
                },
                'sac-red': {
                    dark: '#C4083D',
                    light: '#F00A4B'
                },
                'sac-cyan': {
                    dark: '#45c5d9',
                    light: '#52E5FC'
                },
                'sac-disabled-gray': {
                    dark: '#AAAAAA',
                    light: '#CCCCCC'
                },
            },
        },
        fontFamily: {
            sans: ['Kanit']
        },
    },
    plugins: [],
};
