// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    srr: false,
    modules: ['@nuxtjs/tailwindcss', 'nuxt-icon','@nuxt/image-edge'],
    css: ['@/assets/css/tailwind.css', '@/assets/css/fonts.css', '@/assets/css/animations.css', '@/assets/css/gradients.css'],
    publicRuntimeConfig: {
        environment: process.env.APP_ENV,
        weatherVisualCrossingApiKey: process.env.WEATHER_VISUAL_CROSSING_API_KEY
      }
})