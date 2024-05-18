export default defineNuxtConfig({
    ssr: false,
    modules: ['nuxt-svgo'],
    svgo: {
        componentPrefix: 'svg',
        autoImportPath: './assets/svg/',
    },
})
