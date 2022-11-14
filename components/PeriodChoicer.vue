<template>
    <section>
        <div class="flex gap-3 period-choicer">
            <div class="hour" v-for="(period,index) in periodChoice" :key="index">
                <button @click="periodChoiced = period.value">{{period.label}}</button>
            </div>
        </div>
        <div class="flex gap-3 hours">
            <div v-for="(hourData,index) in choicedPeriodHours" :key="index">
                <CardsSmallCard :hourData="hourData" />
            </div>
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
        dateNow: {
            type: Object,
            required: true
        }
    })
    const periodChoiced = ref('today')
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
    const choicedPeriodHours = computed(() => {
        if (periodChoiced.value === 'today') {
            const todayHours = props.weatherDatas.days[0].hours
            todayHours.map(hour => {
                hour.datetime = hour.datetime.slice(0,2)
            })
            return todayHours.filter(hour => hour.datetime >= props.dateNow.hour())
        } else if (periodChoiced.value === 'tomorrow') {
            return hours
        } else if (periodChoiced.value === 'in-7-days') {
            return hours
        }
    })
</script>