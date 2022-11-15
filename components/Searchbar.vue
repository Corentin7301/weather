<template>
        
            <div class="flex items-center gap-5">
                <input type="text" autocomplete="false" placeholder="Chambéry, Savoie" class="flex-1 px-5 py-2 text-lg font-light bg-transparent rounded-full bg-grad-card-perso" v-model="searchedLocation">
                <button @click="fetchWeatherDatas()" class="p-3 ml-2 rounded-full bg-fuel-yellow-500"><Icon name="material-symbols:arrow-right-alt-rounded" size="32px" class="text-white" /></button>
            </div>
</template>

<script setup>
import testDatas from '~/datas/test-datas.json'
const searchedLocation = ref('')
    const envVars = useRuntimeConfig()
    const dataAreFetched = ref(false)
    const weatherDatasPending = ref(false)

    const fetchWeatherDatas = async () => {
        clearNuxtData('weatherDatas')
        const dateNow = useDateNow()
        const apiCallUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${searchedLocation.value}?iconSet=icons2&key=${envVars.weatherVisualCrossingApiKey}&unitGroup=metric&lang=fr`
        if (envVars.environment === 'production') {
            const {
                data
            } = await useAsyncData('weatherDatas', async () => {
                const res = await $fetch(apiCallUrl);
                return res
            })
            weatherDatasPending.value = true
            setWeatherDatas(data.value)
            weatherDatasPending.value = false
            dataAreFetched.value = true
            setPeriodChoice(usePeriodChoiced().value)
            return navigateTo('/forecast')
        } else if (envVars.environment === 'preproduction') {
            const {
                data
            } = await useAsyncData('weatherDatas', async () => {
                const res = await $fetch(apiCallUrl);
                return res
            })
            weatherDatasPending.value = true
            setWeatherDatas(data.value)
            weatherDatasPending.value = false
            dataAreFetched.value = true
            setPeriodChoice(usePeriodChoiced().value)
            console.warn('PREPROD mode')
            return navigateTo('/forecast')
        } else {
            weatherDatasPending.value = true
            setWeatherDatas(testDatas)
            weatherDatasPending.value = false
            dataAreFetched.value = true
            setPeriodChoice(usePeriodChoiced().value)
            console.warn('DEV mode')
            return navigateTo('/forecast')
        }
    }
</script>