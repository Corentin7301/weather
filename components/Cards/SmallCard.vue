<template>
    <div class="px-3 py-3 rounded-2xl bg-mine-shaft-400 min-w-[170px]">
        <div class="flex items-end justify-between">
            <nuxt-img :src="`/images/${iconChoice.icon}.png`" sizes="sm:75vw md:50vw lg:400px" loading="lazy"
                class="max-w-[100px]" />
            <p class="mb-2 text-xl">{{hourData.datetime}}h</p>
        </div>
        <div class="flex justify-between">
            <div v-if="precipitation">
                <p v-if="precipitation.value === 'rain'" class="flex items-center gap-1 mt-3">
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
</template>

<script setup>
    const props = defineProps({
        hourData: {
            type: Object,
            required: true
        },
        sunTimes: {
            type: Object,
            required: true
        }
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