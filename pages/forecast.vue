<template>
    <div>
        <Header />
        <div v-if="useWeatherDatas().value">
            <CardsBiggerCard :biggerCardDayDatas="biggerCardDatas" />
            <PeriodChoicer />
        </div>
        <div v-else-if="weatherDatasPending">
            <img :src="`${global.imagesLink}/sun/26_rwr8lf`" alt="waiting" format="webp" provider="cloudinary" width="300" class="mx-auto mt-10 animate-spin" />
        </div>
        <ErrorsError v-else error="no-datas" />
    </div>
</template>

<script setup>
import global from '~/site.config.json'

onMounted(() => {
    if(!useWeatherDatas().value) {
        navigateTo('/')
    }
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
</script>