import global from './site.config.json'
// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  ssr: false,
  app: {
    head: {
      title: global.siteName,
      // titleTemplate: '%s - Wildcount',

      meta: [{
          charset: 'utf-8'
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1'
        },
        {
          hid: 'description',
          name: 'description',
          content: global.siteMetaDescription
        },

        {
          property: "og:site_name",
          content: global.siteName
        },
        {
          hid: "og:type",
          property: "og:type",
          content: global.siteType
        },
        {
          hid: "og:url",
          property: "og:url",
          content: global.siteUrl,
        },
        {
          hid: "og:title",
          property: "og:title",
          content: global.siteName,
        },
        {
          hid: "og:description",
          property: "og:description",
          content: global.siteMetaDescription,
        },
        {
          hid: "og:image",
          property: "og:image",
          content: "/logo.png",
        },
        {
          property: "og:image:width",
          content: "740"
        },
        {
          property: "og:image:height",
          content: "300"
        },

        {
          name: "twitter:site",
          content: global.twitterAccount
        },
        // { name: "twitter:card", content: "summary_large_image" }, 
        {
          hid: "twitter:url",
          name: "twitter:url",
          content: global.twitterUrl,
        },
        {
          hid: "twitter:title",
          name: "twitter:title",
          content: global.siteName,
        },
        {
          hid: "twitter:description",
          name: "twitter:description",
          content: global.siteMetaDescription,
        },
        {
          hid: "twitter:image",
          name: "twitter:image",
          content: "/logo.png",
        },

      ],
      link: [

        {
          rel: 'icon',
          type: 'image/x-icon',
          // CHANGE FAVICON NAME HERE
          href: '/icon.png'
        },
        {
          hid: "canonical",
          rel: "canonical",
          href: global.siteUrl,
        }
      ]
    },
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon','@kevinmarrec/nuxt-pwa'],
  css: ['@/assets/css/tailwind.css', '@/assets/css/fonts.css', '@/assets/css/animations.css',
    '@/assets/css/gradients.css'
  ],
  runtimeConfig: {
    public: {
      weatherVisualCrossingApiKey: process.env.WEATHER_VISUAL_CROSSING_API_KEY,
      environment: process.env.APP_ENV  || 'development',
    }
  },
  pwa: {
    meta: {
      name: global.siteName,
      author: global.author,
      description: global.description,
      lang: 'fr',
      mobileAppIOS: true,
      ogHost: global.siteUrl,
      twitterCard: 'summary',
      twitterSite: global.twitterAccount,
      twitterCreator: global.twitterAccount,
      theme_color: '#272727',
    },
    manifest: {
      name: global.siteName,
      short_name: global.siteName,
      description: global.description,
      lang: 'fr',
      theme_color: "#272727",
      background_color: "#272727",
      // start_url: "/?utm_source=pwa"
    },
    // workbox: {
    //   enabled: true
    // },
  },
})