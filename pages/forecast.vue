<template>
    <div>
        <Header />
        <div v-if="useWeatherDatas().value">
            <CardsBiggerCard :biggerCardDayDatas="biggerCardDatas" />
            <PeriodChoicer />
        </div>
        <div v-else-if="weatherDatasPending">
            <nuxt-img :src="`~/assets/images/sun/26.png`" alt="waiting" sizes="sm:30vw" class="mx-auto mt-10 animate-spin" />
        </div>
        <ErrorsError v-else error="no-datas" />
    </div>
</template>

<script setup>
onMounted(() => {
    if(!useWeatherDatas().value) {
        navigateTo('/')
    }
})

    const biggerCardDatas = computed(() => {
        if(useWeatherDatas().value && usePeriodChoiced().value) {
            return {
                resolvedAddress: useWeatherDatas().value.resolvedAddress,
                temp: useWeatherDatas().value.days[usePeriodChoiced().value.index].temp,
                minTemp: useWeatherDatas().value.days[usePeriodChoiced().value.index].tempmin,
                maxTemp: useWeatherDatas().value.days[usePeriodChoiced().value.index].tempmax,
                icon: useWeatherDatas().value.days[usePeriodChoiced().value.index].icon,
            }
        }
    })
</script>