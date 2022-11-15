<template>
    <section>
        <div class="relative flex gap-16 my-6 overflow-x-scroll scrollable period-choicer snap-x">
            <Button :unelevated="periodChoiced.value !== period.value" v-for="(period,index) in periodChoice"
                :key="index" roundedFull @click="periodChoiced = period" class="snap-start snap-mandatory">
                <template #content>
                    {{period.label}}
                </template>
            </Button>
        </div>
        <div class="flex gap-3 overflow-x-scroll scrollable hours snap-x scroll-smooth" ref="hours">
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
    const emit = defineEmits(["period-choice"])
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
    const periodChoiced = ref({
        value: 'today',
        label: 'Aujourd\'hui'
    })
    const periodChoice = [{
            label: 'Aujourd\'hui',
            value: 'today'
        },
        {
            label: 'Demain',
            value: 'tomorrow'
        },
        {
            label: '7 prochains jours',
            value: 'in-7-days'
        },
    ]
    const hoursFormater = (hours) => {
        return hours.map(hour => {
            hour.datetime = hour.datetime.slice(0, 2)
            return hour
        })
    }
    const choicedPeriodHours = computed(() => {
        if (periodChoiced.value.value === 'today') {
            const todayHours = hoursFormater(props.weatherDatas.days[0].hours)
            return todayHours.filter(hour => hour.datetime >= dayjs().hour())
        } else if (periodChoiced.value.value === 'tomorrow') {
            return hoursFormater(props.weatherDatas.days[1].hours)
        } else if (periodChoiced.value.value === 'in-7-days') {
            return hours
        }
    })
    watch(periodChoiced, () => {
        emit('period-choice', periodChoiced.value)
        hours.value.scrollLeft = 0
    })
    const hours = ref()
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