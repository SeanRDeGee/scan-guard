export default defineNuxtConfig({
    modules: ['@pinia/nuxt', 'nuxt-svgo'],
    ssr: false,
    runtimeConfig: {
        public: {
            API_ENDPOINT: process.env.API_ENDPOINT,
        },
    },
    app: {
        head: {
            viewport: 'width=device-width, initial-scale=1',
            charset: 'utf-8',
            title: 'Sintrex ScanGaurd',
            meta: [{ hid: 'description', name: 'description', content: 'Sintrex ScanGaurd' }],
            link: [{ rel: 'icon', href: '/favicon.svg' }],
            htmlAttrs: {
                lang: 'en',
            },
        },
    },
    svgo: {
        componentPrefix: 'svg',
        autoImportPath: './assets/svg/',
    },
})
