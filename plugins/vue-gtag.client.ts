import { defineNuxtPlugin } from '#app';
import VueGtag from 'vue-gtag-next';

export default defineNuxtPlugin((app) => {
    app.vueApp.use(VueGtag, {
        property: {
            id: 'G-Y2FPWFMQJK'
        }
    })
});
