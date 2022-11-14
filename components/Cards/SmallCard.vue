<template>
    <div>
        <div>
            <p>icon</p>
            <p>{{hourData.datetime}}h</p>
            <div>
                <p v-if="precipitation">
                <span v-if="precipitation.value === 'rain'">{{hourData.precip}} | proba: {{hourData.precipprob}}</span>
                <span v-if="precipitation.value === 'snow'">{{hourData.snow}} | proba: {{hourData.snowdepth}}</span>
                </p>
                <p>{{Math.round(hourData.temp)}}°C</p>
            </div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        hour: {
            type: Object,
            required: true
        },
        hourData: {
            type: Object,
            required: true
        },
    })
    const precipitation = computed(() => {
        const hourData = props.hourData
        if (hourData.preciptype) {
            if (hourData.preciptype.includes('rain') && hourData.precip > 0 || hourData.precipprob > 0) {
                return {
                    value: 'rain',
                    label: 'Pluie',
                    color: 'blue'
                }
            } else if (hourData.preciptype.includes('snow') && hourData.snow > 0 && hourData.precip > 0 ||
                hourData.precipprob > 0) {
                return {
                    value: 'snow',
                    label: 'Neige',
                    snow: hourData.snow,
                    snowdepth: hourData.snowdepth,
                    color: 'gray'
                }
            } else {
                return false
            }
        }
    })
</script>