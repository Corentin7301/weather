<template>
    <section>
        <div class="relative flex gap-16 my-6 overflow-x-scroll scrollable period-choicer snap-x">
            <Button :unelevated="usePeriodChoiced().value.value !== period.value"
                v-for="(period,index) in usePeriodItems().value" :key="index" roundedFull
                @click="setPeriodChoice(period)" class="snap-start snap-mandatory">
                <template #content>
                    {{period.label}}
                </template>
            </Button>
        </div>
        <div class="flex gap-3 overflow-x-scroll scrollable hours snap-x scroll-smooth" ref="hoursContainer">
            <CardsSmallCard v-for="(hourData,index) in choicedPeriodHours" :key="index" :hourData="hourData"
                :sunTimes="sunTimes" class="snap-start snap-mandatory" />
        </div>
    </section>
</template>

<script setup>
    import dayjs from "dayjs"

    const props = defineProps({
        weatherDatas: {
            type: Object,
            required: true
        },
    })
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
    
    const sunTimes = computed(() => {
        switch (periodChoiced.value.value) {
            case 'today':
                return {
                    sunrise: props.weatherDatas.days[0].sunrise.slice(0, 2), sunset: props.weatherDatas.days[0]
                        .sunset.slice(0, 2)
                }
                case 'tomorrow':
                    return {
                        sunrise: props.weatherDatas.days[1].sunrise.slice(0, 2), sunset: props.weatherDatas
                            .days[1]
                            .sunset.slice(0, 2)
                    }
                    default:
                        return null
        }
    })
    
    // choice start hours to display
    const choicedPeriodHours = computed(() => {
        if (periodChoiced.value.value === 'today') {
            const todayHours = hoursFormater(weatherFetchedDatas.value.days[0].hours)
            return todayHours.filter(hour => hour.datetime >= dayjs().hour())
        } else if (periodChoiced.value.value === 'tomorrow') {
            return hoursFormater(weatherFetchedDatas.value.days[1].hours)
        } else if (periodChoiced.value.value === 'in-7-days') {
            return hours
        } else {
            console.log(periodChoiced.value.value);
        }
    })
    
    // don't work
    watch(periodChoiced.value, () => {
        debugger
        sunTimes
        hoursContainer.value.scrollLeft = 0
    })
    
    const hoursContainer = ref()
</script>

<style scoped>
    /* Hide scrollbar for Chrome, Safari and Opera */
    .scrollable::-webkit-scrollbar {
        display: none;
    }

    /* Hide scrollbar for IE, Edge and Firefox */
    .scrollable {
        -ms-overflow-style: none;
        /* IE and Edge */
        scrollbar-width: none;
        /* Firefox */
    }
</style>