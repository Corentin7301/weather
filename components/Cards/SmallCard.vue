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
    const weatherIcons = [
        {
            value:'snow',
            icon: 'cloud/23',
        },
        {
            value:'snow-showers-day',
            icon: 'cloud/18',
        },
        {
            value:'snow-showers-night',
            icon: 'moon/40',
        },
        {
            value:'thunder-rain',
            icon: 'cloud/17',
        },
        {
            value:'thunder-showers-day',
            icon: 'cloud/12',
        },
        {
            value:'thunder-showers-night',
            icon: 'cloud/11',
        },
        {
            value:'rain',
            icon: 'cloud/7',
        },
        {
            value:'showers-day',
            icon: 'sun/8',
        },
        {
            value:'showers-night',
            icon: 'moon/1',
        },
        {
            value:'fog',
            icon: 'sun/6',
        },
        {
            value:'wind',
            icon: 'sun/26',
        },
        {
            value:'cloudy',
            icon: 'cloud/35',
        },
        {
            value:'partly-cloudy-day',
            icon: 'sun/27',
        },
        {
            value:'partly-cloudy-night',
            icon: 'moon/31',
        },
        {
            value:'clear-day',
            icon: 'sun/26',
        },
        {
            value:'clear-night',
            icon: 'moon/10',
        },
    ]
    const weatherNightIcons = [
        {
            value:'snow',
            icon: 'moon/19',
        },
        {
            value:'snow-showers-day',
            icon: 'moon/40',
        },
        {
            value:'snow-showers-night',
            icon: 'moon/40',
        },
        {
            value:'thunder-rain',
            icon: 'cloud/17',
        },
        {
            value:'thunder-showers-day',
            icon: 'moon/11',
        },
        {
            value:'thunder-showers-night',
            icon: 'moon/11',
        },
        {
            value:'rain',
            icon: 'cloud/7',
        },
        {
            value:'showers-day',
            icon: 'moon/1',
        },
        {
            value:'showers-night',
            icon: 'moon/1',
        },
        {
            value:'fog',
            icon: 'moon/2.2',
        },
        {
            value:'wind',
            icon: 'moon/10',
        },
        {
            value:'cloudy',
            icon: 'moon/15',
        },
        {
            value:'partly-cloudy-day',
            icon: 'moon/31',
        },
        {
            value:'partly-cloudy-night',
            icon: 'moon/31',
        },
        {
            value:'clear-day',
            icon: 'moon/10',
        },
        {
            value:'clear-night',
            icon: 'moon/10',
        },
    ]
    const iconChoice = computed(() => {
        const hourData = props.hourData
        const sunTimes = props.sunTimes
        if(hourData.datetime < sunTimes.sunrise || hourData.datetime > sunTimes.sunset) {
            return weatherNightIcons.find(icon => icon.value === hourData.icon)
        } else {
            return weatherIcons.find(icon => icon.value === hourData.icon)
        }
    })
</script>