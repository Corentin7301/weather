<template>
    <section class="relative px-5 py-3 shadow-2xl rounded-2xl bg-grad-card-perso">
        <div v-if="useDisplayType().value === 'hourly'">
            <img :src="`${global.imagesLink}/${iconChoice.icon}`" :alt="props.biggerCardDayDatas.icon"
                class="absolute -right-4 bottom-1 fly-animation max-w-[140px]" />
            <div class="flex items-start justify-between ">
                <p class="text-2xl font-medium">{{usePeriodChoiced().value.label}}</p>
                <p class="z-10 text-sm font-extralight first-letter:capitalize">
                    {{dayjs(useDateNow().value).locale('fr').format('ddd DD MMMM')}}</p>
            </div>
            <div class="flex items-end my-3 ml-5">
                <p class="flex font-bold text-7xl">{{Math.round(biggerCardDatas.temp)}}
                    <span class="ml-1 text-2xl font-medium text-fuel-yellow-500">°C</span>
                </p>
                <div class="flex flex-col items-center mb-[0.35rem] ml-1 font-thin divide-y">
                    <p>
                        <span class="">{{Math.round(biggerCardDatas.tempmin)}}</span>
                        <span class=" ml-[2px] text-[12px] font-medium text-fuel-yellow-500">°</span>
                    </p>
                    <p>
                        <span class="self-end ">{{Math.round(biggerCardDatas.tempmax)}}</span>
                        <span class=" ml-[2px] text-[12px] font-medium text-fuel-yellow-500">°</span>
                    </p>
                </div>
            </div>
            <div class="flex gap-2 ">
                <Icon name="majesticons:location-marker" size="24px" class="text-fuel-yellow-500" />
                <p class="font-light">{{addressParser}}</p>
            </div>
        </div>
        <div v-else-if="useDisplayType().value === 'daily'">
            <p class="text-2xl font-medium text-center capitalize">
                {{dayjs(useDateNow().value).locale('fr').format('dddd DD MMMM')}}</p>
            <div class="flex items-center justify-between mx-5 my-3">
                <div class="flex items-end ">
                    <p class="flex font-bold text-7xl">{{Math.round(biggerCardDatas.temp)}}
                        <span class="ml-1 text-2xl font-medium text-fuel-yellow-500">°C</span>
                    </p>
                    <div class="flex flex-col items-center mb-[0.35rem] ml-1 font-thin divide-y">
                        <p>
                            <span class="">{{Math.round(biggerCardDatas.tempmin)}}</span>
                            <span class=" ml-[2px] text-[12px] font-medium text-fuel-yellow-500">°</span>
                        </p>
                        <p>
                            <span class="self-end ">{{Math.round(biggerCardDatas.tempmax)}}</span>
                            <span class=" ml-[2px] text-[12px] font-medium text-fuel-yellow-500">°</span>
                        </p>
                    </div>
                </div>
                <div class="flex flex-col items-center gap-2 font-thin">
                    <p class="flex items-center justify-between w-[70px]">
                        <Icon name="mingcute:sunrise-fill" size="20px" class=" text-fuel-yellow-500" />
                        <span>{{biggerCardDatas.sunrise.slice(0, 2)}}h{{biggerCardDatas.sunrise.slice(3, 5)}}</span>
                    </p>
                        <p class="flex items-center justify-between w-[70px]">
                            <Icon name="mingcute:sunset-fill" size="20px" class=" text-fuel-yellow-500" />
                            <span>{{biggerCardDatas.sunset.slice(0, 2)}}h{{biggerCardDatas.sunset.slice(3, 5)}}</span>
                        </p>
                        <p class="flex items-center justify-between w-[70px]">
                            <Icon name="ion:moon-sharp" size="20px" class=" text-fuel-yellow-500" />
                            <span>{{calcMoonPercent(biggerCardDatas.moonphase)}} %</span>
                        </p>
                    </div>
            </div>
            <div class="flex items-center justify-between mr-5">
                <div class="flex gap-2 ">
                    <Icon name="majesticons:location-marker" size="24px" class="text-fuel-yellow-500" />
                    <p class="font-light">{{addressParser}}</p>
                </div>
                <p class="flex items-center justify-between gap-2 text-sm font-thin">
                        <Icon name="carbon:windy-strong" size="20px" class=" text-fuel-yellow-500" />
                        <span>{{biggerCardDatas.windspeed}} km/h</span>
                </p>
            </div>
        </div>
    </section>
</template>

<script setup>
    import global from '~/site.config.json'
    import dayjs from 'dayjs'
    import 'dayjs/locale/fr'

    const props = defineProps({
        biggerCardDayDatas: {
            type: Object,
            required: true
        },
    })

    const biggerCardDatas = ref(props.biggerCardDayDatas)
    const periodChoiced = usePeriodChoiced()


    const indexDayChoiced = useIndexDayChoiced()
    watch(indexDayChoiced, (newIndexDayChoiced) => {
        biggerCardDatas.value = typeDayChoicedInfos(indexDayChoiced.value)
        useDateNow().value = biggerCardDatas.value.datetime
        iconChoice
    })
    watch(periodChoiced, (newPeriodChoiced) => {
        useIndexDayChoiced().value = 0
        biggerCardDatas.value = typeDayChoicedInfos(indexDayChoiced.value)
        useDateNow().value = biggerCardDatas.value.datetime
        iconChoice
    })

    const typeDayChoicedInfos = (indexDayChoiced) => {
        if (useDisplayType().value === 'daily') {
            return {
                ...props.biggerCardDayDatas.days[indexDayChoiced],
            }
        } else {
            return {
                ...props.biggerCardDayDatas,
            }
        }
    }


    const addressParser = computed(() => {
        const address = props.biggerCardDayDatas.resolvedAddress
        const addressArray = address.split(',')
        if (addressArray.length >= 3) {
            return `${addressArray[0]}, ${addressArray[2]}`
        } else if(addressArray.length >= 2) {
            return `${addressArray[0]}, ${addressArray[1]}`
        }
        else {
            return `${addressArray[0]}`
        }
    })

    const iconChoice = computed(() => {
        return weatherIconChoice(
            props.biggerCardDayDatas,
        )
    })
</script>