<template>
    <div>
        <Header />
        <div v-if="useWeatherDatas().value">
            <CardsBiggerCard :biggerCardDayDatas="biggerCardDatas" />
            <PeriodChoicer />
        </div>
        <div v-else-if="weatherDatasPending">
            <img :src="`${global.imagesLink}/sun/26_rwr8lf`" alt="waiting" width="100" height="100" class="w-[300px] mx-auto mt-10 animate-spin" />
        </div>
        <ErrorsError v-else error="no-datas" />
        <NuxtLink to="/informations" class="block mt-10 text-sm text-center text-gray-400">Informations</NuxtLink>
    </div>
</template>

<script setup>
    import global from '~/site.config.json'
    const {weatherVisualCrossingApiKey} = useRuntimeConfig().public

    definePageMeta({
        layout: "scrollable",
    });
    
    const {query} = useRoute()
    
    const hasDatas = async () => {
        if (!useWeatherDatas().value) {
        if(query.l.length > 0) {
            const {
                    data
                } = await useAsyncData('weatherDatas', async () => {
                    const res = await $fetch(weatherApiCallUrl(query.l, weatherVisualCrossingApiKey));
                    return res
                })
                if(data.value) {
                    setWeatherDatas(data.value)
                    setPeriodChoice(usePeriodChoiced().value)
                    return
                } else {
                    return navigateTo('/')
                }
        } else {
            return navigateTo('/')
        }
    } else {
        historyStorage()
    }}
    onMounted(() => {
        hasDatas()
    })

    const periodChoiced = usePeriodChoiced()
    watch(periodChoiced, (newPeriodChoiced) => {
        biggerCardDatas
    })

    const biggerCardDatas = computed(() => {
        if (useWeatherDatas().value && periodChoiced.value) {
            if (usePeriodChoiced().value.value === 'in-7-days') {
                const in7Days = []
                for (let i = 0; i < 7; i++) {
                    in7Days.push(useWeatherDatas().value.days[i])
                }
                return {
                    days: [...in7Days],
                    resolvedAddress: useWeatherDatas().value.resolvedAddress,
                    temp: useWeatherDatas().value.days[usePeriodChoiced().value.index].temp,
                    tempmin: useWeatherDatas().value.days[usePeriodChoiced().value.index].tempmin,
                    tempmax: useWeatherDatas().value.days[usePeriodChoiced().value.index].tempmax,
                    icon: useWeatherDatas().value.days[usePeriodChoiced().value.index].icon,
                }
            } else {
                return {
                    resolvedAddress: useWeatherDatas().value.resolvedAddress,
                    datetime: useWeatherDatas().value.days[usePeriodChoiced().value.index].datetime,
                    temp: useWeatherDatas().value.days[usePeriodChoiced().value.index].temp,
                    tempmin: useWeatherDatas().value.days[usePeriodChoiced().value.index].tempmin,
                    tempmax: useWeatherDatas().value.days[usePeriodChoiced().value.index].tempmax,
                    icon: useWeatherDatas().value.days[usePeriodChoiced().value.index].icon,
                }
            }
        }
    })

    const historyStorage = () => {
        const history = localStorage.getItem('locationHistory')
        if (history) {
            const newLocation = useWeatherDatas().value.resolvedAddress
            const historyArray = JSON.parse(history)
            if (!historyArray.includes(newLocation)) {
                if (historyArray.length >= 4) {
                    historyArray.pop()
                }
                const newHistoryArray = [newLocation, ...historyArray]
                localStorage.setItem('locationHistory', JSON.stringify(newHistoryArray))
            } else {
                const newHistoryArray = historyArray.filter((item) => item !== newLocation)
                localStorage.setItem('locationHistory', JSON.stringify([newLocation, ...newHistoryArray]))
            }
        } else {
            const newLocation = [useWeatherDatas().value.resolvedAddress]
            localStorage.setItem('locationHistory', JSON.stringify(newLocation));
        }
    }
</script>