// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    css: [
        'primevue/resources/themes/saga-blue/theme.css',
        'primevue/resources/primevue.css',
        'primeicons/primeicons.css',
        'primeflex/primeflex.css',
        'bootstrap/dist/css/bootstrap.min.css',
    ],
    app: {
        head: {
            title: 'Home',
            titleTemplate: '%s - ロケット打ち上げを観る集会',
            htmlAttrs: {
                lang: 'ja',
                prefix: 'og: http://ogp.me/ns#',
                class: 'html-class',
            },
            bodyAttrs: {
                class: 'body-class',
            },
            meta: [
                { charset: 'utf-8' },
                { name: 'viewport', content: 'width=device-width, initial-scale=1' },
                { hid: 'og:site_name', property: 'og:site_name', content: 'ロケット打ち上げを観る集会 - Virtual Rocket Watching' },
                { hid: 'og:type', property: 'og:type', content: 'website' },
                { hid: 'og:title', property: 'og:title', content: 'Virtual Rocket Watching' },
                { hid: 'og:image', property: 'og:image', content: 'https://img.virtualrocketwatching.net/image/image_3636fb8c-5931-4993-82c9-1745ce031d0e.jpeg' },
            ],
            link: [
                { rel: "icon", type: "image/x-icon", href: "/favicon.ico" }
            ]
        },
    },
    build: {
		transpile: ['primevue']
	},
})
