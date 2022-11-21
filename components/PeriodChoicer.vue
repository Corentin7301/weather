<template>
    <section>
        <div @click="periodButtonIsClicked = !periodButtonIsClicked" class="relative flex gap-[15%] my-6 overflow-x-scroll scrollable period-choicer snap-x">
            <Button :unelevated="usePeriodChoiced().value.value !== period.value"
                v-for="(period,index) in usePeriodItems().value" :key="index" roundedFull
                @click="setPeriodChoice(period)" :class="[`snap-start snap-mandatory ${!useDeferredPrompt().value ? 'no-tap-highlighting' : ''}`]">
                <template #content>
                    {{period.label}}
                </template>
            </Button>
        </div>
        <div class="flex gap-3 overflow-x-scroll scrollable hours snap-x scroll-smooth" ref="hoursContainer">
            <CardsSmallCard v-for="(hourData,index) in choicedPeriodHours" :key="index" :hourData="hourData" :index="index"
                :sunTimes="sunTimes" class="snap-start snap-mandatory" />
        </div>
    </section>
</template>

<script setup>
    import dayjs from "dayjs"

    // format hour for display
    const hoursFormater = (hours) => {
        return hours.map(hour => {
            hour.datetime = hour.datetime.slice(0, 2)
            return hour
        })
    }
    // get user's choiced period (dynamic)
    const periodChoiced = usePeriodChoiced()
    
    // get weather datas
    const weatherFetchedDatas = useWeatherDatas()

    const hoursContainer = ref()
    // choice start hours to display
    const choicedPeriodHours = computed(() => {
        if (periodChoiced.value.value === 'today') {
            const todayHours = hoursFormater(weatherFetchedDatas.value.days[0].hours)
            return todayHours.filter(hour => hour.datetime >= dayjs().hour())
        } else if (periodChoiced.value.value === 'tomorrow') {
            return hoursFormater(weatherFetchedDatas.value.days[1].hours)
        } else if (periodChoiced.value.value === 'in-7-days') {
            const in7Days = []
            for (let i = 0; i < 7; i++) {
                in7Days.push(weatherFetchedDatas.value.days[i])
            }
            return in7Days
        } else {
            console.log(periodChoiced.value.value);
        }
        hoursContainer.value.scrollLeft = 0
    })

    // bring the slider to 0 when period is changed
    const periodButtonIsClicked = ref(false)
    watch(periodButtonIsClicked, () => {
        hoursContainer.value.scrollLeft = 0
    })


</script>