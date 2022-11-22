<template>
    <div class="flex items-center gap-5">
        <div class="relative">
            <input @keyup.enter="fetchWeatherDatas()" type="text" autocomplete="false" placeholder="Chambéry, Savoie"
                :class="[`w-full px-5 py-2 pr-12 text-lg font-light bg-transparent rounded-full bg-grad-card-perso ${!useDeferredPrompt().value ? 'outline-none' : ''}`]"
                v-model="searchedLocation" aria-label="searchbar">
            <div v-if="searchedLocation" @click="searchedLocation = ''"
                class="absolute inset-y-0 right-0 flex items-center pr-3 ">
                <Icon v-if="searchedLocation" name="material-symbols:close-rounded" size="20px" class="text-gray-500" />
            </div>
        </div>
        <button @click="fetchWeatherDatas()"
            :class="[`p-3 ml-2 rounded-full ${errorIcon ? 'bg-red-400' : 'bg-fuel-yellow-500'}  ${!useDeferredPrompt().value ? 'no-tap-highlighting' : ''}`]"
            aria-label="search button" title="search button">
            <span @click="!searchedLocation ? gpsQueryLocation = true : gpsQueryLocation = false"
                class="w-full h-full ">
                <Icon v-if="searchedLocation" name="material-symbols:arrow-right-alt-rounded" size="32px"
                    class="text-white" />
                <span v-else>
                    <Icon v-if="gpsWaitingIcon" name="prime:spinner" size="32px" class="text-white animate-spin" />
                    <Icon v-else-if="errorIcon" name="system-uicons:cross" size="32px" class="text-white" />
                    <Icon v-else name="material-symbols:my-location-rounded" size="32px" class="p-[2px] text-white" />
                </span>
            </span>
        </button>
    </div>
</template>

<script setup>
    import testDatas from '~/datas/test-datas.json'
    const searchedLocation = ref('')
    const gpsQueryLocation = ref(false)
    const gpsWaitingIcon = ref(false)
    const errorIcon = ref(false)
    const envVars = useRuntimeConfig().public
    const dataAreFetched = ref(false)
    const weatherDatasPending = ref(false)

    const choicedHistoryLocation = useChoicedHistoryLocation()
    watch(choicedHistoryLocation, (newValue) => {
        fetchWeatherDatas(newValue)
    })
    const fetchWeatherDatas = async () => {
        if (searchedLocation.value || choicedHistoryLocation.value || gpsQueryLocation.value) {
            clearNuxtData('weatherDatas')
            const dateNow = useDateNow()
            const weatherApiCallUrl = (location) =>
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?iconSet=icons2&key=${envVars.weatherVisualCrossingApiKey}&unitGroup=metric&lang=fr`
            const weatherApiCall = async (location) => {
                if (envVars.environment === 'production') {
                    const {
                        data
                    } = await useAsyncData('weatherDatas', async () => {
                        const res = await $fetch(weatherApiCallUrl(location));
                        return res
                    })
                    if (data.value) {
                        weatherDatasPending.value = true
                        setWeatherDatas(data.value)
                        weatherDatasPending.value = false
                        dataAreFetched.value = true
                        setPeriodChoice(usePeriodChoiced().value)
                        return navigateTo('/forecast')
                    } else {
                        gpsWaitingIcon.value = true
                        setTimeout(() => {
                            gpsWaitingIcon.value = false
                            errorIcon.value = true
                        }, 1000)
                        setTimeout(() => {
                            errorIcon.value = false
                            console.log('bad location, test with other location');
                        }, 2000)
                        searchedLocation.value = ''
                    }
                } else if (envVars.environment === 'preproduction') {
                    const {
                        data
                    } = await useAsyncData('weatherDatas', async () => {
                        const res = await $fetch(weatherApiCallUrl(location));
                        return res
                    })
                    if (data.value) {
                        weatherDatasPending.value = true
                        setWeatherDatas(data.value)
                        weatherDatasPending.value = false
                        dataAreFetched.value = true
                        setPeriodChoice(usePeriodChoiced().value)
                        console.warn('PREPROD mode')
                        return navigateTo('/forecast')
                    } else {
                        gpsWaitingIcon.value = true
                        setTimeout(() => {
                            gpsWaitingIcon.value = false
                            errorIcon.value = true
                        }, 1000)
                        setTimeout(() => {
                            errorIcon.value = false
                            console.log('bad location, test with other location');
                        }, 2000)
                        searchedLocation.value = ''
                    }
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
            const reverseGeocodeApiCall = async (lat, lon) => {
                const {
                    data
                } = await useAsyncData('reverseGeocodeDatas', async () => {
                    // const res = await $fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${lon}&lat=${lat}`);
                    const res = await $fetch(
                        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=fr`
                    );
                    return res
                })
                const city = data.value.locality
                const subdivision = data.value.principalSubdivision
                const country = data.value.countryName
                const postcode = data.value.postcode
                return `${city}, ${postcode}, ${subdivision}, ${country}`
            }
            if (gpsQueryLocation.value && !searchedLocation.value) {
                gpsWaitingIcon.value = true
                // Is geolocation available ?
                if ('geolocation' in navigator) {
                    navigator.geolocation.getCurrentPosition(async (position) => {
                        const reverseGeocode = reverseGeocodeApiCall(position.coords.latitude,
                            position.coords.longitude)
                        weatherApiCall(await reverseGeocode)
                        gpsWaitingIcon.value = false
                    });
                } else {
                    console.warn('Geolocation is not available')
                    gpsWaitingIcon.value = false
                }
                gpsQueryLocation.value = false
            } else if (choicedHistoryLocation.value) {
                weatherApiCall(choicedHistoryLocation.value)
            } else {
                weatherApiCall(searchedLocation.value)
            }

        }
    }
</script>