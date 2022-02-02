export default defineNuxtPlugin(app => {
    app.$router.options.scrollBehavior = (to, from, savedPosition) => {
        if (savedPosition) {
            return savedPosition;
        } else if (to.hash) {
            return {
                el: to.hash
            };
        }

        return { top: 0, left: 0 };
    };
});
