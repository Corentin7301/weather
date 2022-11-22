<template>
    <div :class="[`px-3 py-3 rounded-2xl bg-mine-shaft-400 min-w-[170px] transition-colors border ${useDisplayType().value === 'daily' && useIndexDayChoiced().value === index ? 'border-fuel-yellow-500':'border-transparent'}  `]">
        <!-- hourly -->
        <div v-if="useDisplayType().value === 'hourly'">
            <div class="flex items-end justify-between">
                <img :src="`${global.imagesLink}/${iconChoice.icon}`" :alt="props.hourData.icon"
                format="webp" width="100" height="100" class="w-[100px]" />
                <p class="mb-2 text-2xl">{{hourData.datetime}}h</p>
            </div>
            <div class="flex justify-between mt-3">
                <div v-if="precipitation">
                    <p v-if="precipitation.value === 'rain'" class="flex items-center gap-1">
                        <Icon name="ph:drop-fill" size="12px" class="text-fuel-yellow-500" />
                        {{hourData.precip}} mm
                    </p>
                    <p v-else-if="precipitation.value === 'snow'">
                        <span class="flex items-center gap-1">
                            <Icon name="mingcute:snow-line" size="12px" class="text-fuel-yellow-500" />
                            {{hourData.snow}} cm
                        </span>
                        <span class="flex items-center gap-1">
                            <Icon name="gis:measure" size="12px" class="text-fuel-yellow-500" />
                            {{hourData.snowdepth}} cm
                        </span>
                    </p>
                    <span class="flex items-center gap-1 mt-1 text-xs">
                        <Icon name="ic:baseline-question-mark" size="12px" class="text-fuel-yellow-500" />
                        {{hourData.precipprob}} %
                    </span>
                </div>
                <div v-else class="spacer"></div>
                <p class="flex my-3 ml-5 text-4xl font-bold">{{Math.round(hourData.temp)}}<span
                        class="text-lg font-medium text-fuel-yellow-500">°C</span></p>
            </div>
        </div>
        <!-- daily -->
        <div v-else-if="useDisplayType().value === 'daily'" @click="useIndexDayChoiced().value = props.index" class="flex flex-col items-center ">
            <p class="mb-3 text-xl font-semibold text-center capitalize ">
                {{dayjs(hourData.datetime).locale('fr').format('ddd DD')}}<br />
                <span
                    class="text-xs font-normal tracking-[0.5em] block">{{dayjs(hourData.datetime).locale('fr').format('MMMM')}}</span>
            </p>

            <img :src="`${global.imagesLink}/${iconChoice.icon}`" :alt="props.hourData.icon"
            format="webp" width="100" height="100" class="w-[100px] mx-auto" />
            <div :class="[`flex  w-full ${precipitation? 'flex-col justify-between' : 'flex-row justify-around'}`]">
                <p class="flex justify-center my-3 text-5xl font-bold">{{Math.round(hourData.temp)}}<span
                        class="text-lg font-medium text-fuel-yellow-500">°C</span></p>
                <div class="flex items-center justify-around ">
                    <div v-if="precipitation">
                        <p v-if="precipitation.value === 'rain'" class="flex items-center gap-1">
                            <Icon name="ph:drop-fill" size="12px" class="text-fuel-yellow-500" />
                            {{hourData.precip}} mm
                        </p>
                        <p v-else-if="precipitation.value === 'snow'">
                            <span class="flex items-center gap-1">
                                <Icon name="mingcute:snow-line" size="12px" class="text-fuel-yellow-500" />
                                {{hourData.snow}} cm
                            </span>
                            <span class="flex items-center gap-1">
                                <Icon name="gis:measure" size="12px" class="text-fuel-yellow-500" />
                                {{hourData.snowdepth}} cm
                            </span>
                        </p>
                        <span class="flex items-center gap-1 mt-1 text-xs">
                            <Icon name="ic:baseline-question-mark" size="12px" class="text-fuel-yellow-500" />
                            {{hourData.precipprob}} %
                        </span>
                    </div>
                    <div class="flex flex-col items-center font-thin divide-y">
                        <p>
                            <span class="">{{Math.round(hourData.tempmin)}}</span>
                            <span class=" ml-[2px] text-[12px] font-medium text-fuel-yellow-500">°</span>
                        </p>
                        <p>
                            <span class="self-end ">{{Math.round(hourData.tempmax)}}</span>
                            <span class=" ml-[2px] text-[12px] font-medium text-fuel-yellow-500">°</span>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>
</template>

<script setup>
import global from '~/site.config.json'
    import dayjs from 'dayjs'
    import 'dayjs/locale/fr'

    const props = defineProps({
        hourData: {
            type: Object,
            required: true
        },
        index: {
            type: Number,
            required: true
        },
    })

    const sunTimes = useSunTimes()

    const precipitation = computed(() => {
        const hourData = props.hourData
        if (hourData.preciptype) {
            if (hourData.preciptype.includes('rain') && hourData.precip > 0 || hourData.precipprob > 0) {
                return {
                    value: 'rain',
                }
            } else if (hourData.preciptype.includes('snow') && hourData.snow > 0 && hourData.precip > 0 ||
                hourData.precipprob > 0) {
                return {
                    value: 'snow',
                }
            } else {
                return false
            }
        }
    })
    // choice of the icon to display
    const iconChoice = computed(() => {
        const hourData = props.hourData
        return weatherIconChoice(hourData)
    })
</script>