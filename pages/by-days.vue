<template>
    <div>
        <div v-if="weatherDatas">
            <CardsBiggerCard :dateNow="dateNow.value" :biggerCardDayDatas="biggerCardDatas" :periodChoiced="periodChoiced" />
            <PeriodChoicer :weatherDatas="weatherDatas" />
        </div>
        <ErrorsError v-else error="no-datas" />
    </div>
</template>

<script setup>
    import dayjs from 'dayjs'
    import 'dayjs/locale/fr'
    // TODO:replace datas with datas from api
    import datas from '~/datas/test-datas.json'
    setWeatherDatas(datas)
    setPeriodChoice(usePeriodChoiced().value)
    const dateNow = useDateNow()
    const periodChoiced = usePeriodChoiced()
    const weatherDatas = useWeatherDatas()
    
    const biggerCardDatas = computed(() => {
        return {
            resolvedAddress: weatherDatas.value.resolvedAddress,
            temp: weatherDatas.value.days[periodChoiced.value.index].temp,
            minTemp: weatherDatas.value.days[periodChoiced.value.index].tempmin,
            maxTemp: weatherDatas.value.days[periodChoiced.value.index].tempmax,
            icon: weatherDatas.value.days[periodChoiced.value.index].icon,
        }
    })
</script>