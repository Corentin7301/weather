<template>
    <section class="relative px-5 py-3 rounded-2xl bg-grad-perso">
        <nuxt-img :src="`/images/${iconChoice.icon}.png`" :alt="props.biggerCardDayDatas.icon" sizes="sm:75vw"
            class="absolute -right-4 bottom-1 fly-animation max-w-[140px]" />
        <div class="flex items-center justify-between ">
            <p class="text-2xl font-medium">{{usePeriodChoiced().value.label}}</p>
            <p class="z-10 text-sm font-extralight first-letter:capitalize">{{dayjs(dateNow).locale('fr').format('ddd DD MMMM')}}</p>
        </div>
        <div class="flex items-end my-3 ml-5">
            <p class="flex font-bold text-7xl">{{Math.round(biggerCardDayDatas.temp)}}
                <span class="ml-1 text-2xl font-medium text-fuel-yellow-500">°C</span>
            </p>
            <p class="flex flex-col items-center mb-[0.35rem] ml-1 font-thin divide-y">
                <p>
                    <span class="">{{Math.round(biggerCardDayDatas.minTemp)}}</span>
                    <span class=" ml-[2px] text-[12px] font-medium text-fuel-yellow-500">°</span>
                </p>
                <p>
                    <span class="self-end ">{{Math.round(biggerCardDayDatas.maxTemp)}}</span>
                    <span class=" ml-[2px] text-[12px] font-medium text-fuel-yellow-500">°</span>
                </p>
            </p>
        </div>
        <div class="flex gap-2 ">
            <Icon name="majesticons:location-marker" size="24px" class="text-fuel-yellow-500" />
            <p class="font-light">{{addressParser}}</p>
        </div>
    </section>
</template>

<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/fr'

    const props = defineProps({
        biggerCardDayDatas: {
            type: Object,
            required: true
        },
    })

    const dateNow = useDateNow()
    
    const periodChoiced = usePeriodChoiced()

    const addressParser = computed(() => {
        const address = props.biggerCardDayDatas.resolvedAddress
        const addressArray = address.split(',')
        return `${addressArray[0]}, ${addressArray[2]}`
    })

    const iconChoice = computed(() => {
        return weatherIconChoice(
            props.biggerCardDayDatas,
        )
    })
</script>

<style scoped>
    .bg-grad-perso {
        background: -webkit-linear-gradient(304deg, #202020 0%, #6b6b6b9b 100%);
        background: linear-gradient(320deg, #202020 0%, #202020 30%, #6b6b6b9b 100%);
        border: 1px solid rgba(255, 255, 255, 0.25);
    }
</style>