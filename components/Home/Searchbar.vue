<template>

    <div class="flex items-center gap-5">
        <div class="relative">
            <input @keyup.enter="fetchWeatherDatas(searchedLocation)" type="text" autocomplete="false"
                placeholder="Chambéry, Savoie"
                class="w-full px-5 py-2 pr-12 text-lg font-light bg-transparent rounded-full bg-grad-card-perso"
                v-model="searchedLocation" aria-describedby="searchbar">
            <div v-if="searchedLocation" @click="searchedLocation = ''" class="absolute inset-y-0 right-0 flex items-center pr-3 ">
                <Icon name="material-symbols:close-rounded" size="20px" class="text-gray-500" />
            </div>
        </div>
        <button @click="fetchWeatherDatas(searchedLocation)" class="p-3 ml-2 rounded-full bg-fuel-yellow-500"
            aria-describedby="search button">
            <Icon name="material-symbols:arrow-right-alt-rounded" size="32px" class="text-white" />
        </button>
    </div>
</template>

<script setup>
    import testDatas from '~/datas/test-datas.json'
    const searchedLocation = ref('')
    const envVars = useRuntimeConfig().public
    const dataAreFetched = ref(false)
    const weatherDatasPending = ref(false)

    const choicedHistoryLocation = useChoicedHistoryLocation()
    watch(choicedHistoryLocation, (newValue) => {
        console.log('choicedHistoryLocation', newValue);
        fetchWeatherDatas(newValue)
    })
    const fetchWeatherDatas = async (location) => {
        if (searchedLocation.value || choicedHistoryLocation.value) {
            clearNuxtData('weatherDatas')
            const dateNow = useDateNow()
            const apiCallUrl =
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?iconSet=icons2&key=${envVars.weatherVisualCrossingApiKey}&unitGroup=metric&lang=fr`
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
    }
</script>