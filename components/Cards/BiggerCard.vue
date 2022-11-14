<template>
    <section class="relative px-5 py-3 rounded-2xl bg-grad-perso">
        <nuxt-img src="/images/cloud/22.png" sizes="sm:75vw"
            class="absolute -right-4 bottom-1 fly-animation max-w-[140px]" />
        <div class="flex items-center justify-between ">
            <p class="text-2xl font-medium">Aujourd'hui</p>
            <p class="z-10 text-sm font-extralight first-letter:capitalize">{{dateNow.format('ddd DD MMMM')}}</p>
        </div>
        <p class="flex my-3 ml-5 font-bold text-7xl">{{Math.round(weatherDatas.days[0].temp)}}<span
                class="ml-1 text-2xl font-medium text-fuel-yellow-500">°C</span></p>
        <div class="flex gap-2 ">
            <Icon name="majesticons:location-marker" size="24px" class="text-fuel-yellow-500" />
            <p class="font-light">{{addressParser}}</p>
        </div>
    </section>
</template>

<script setup>
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

    const addressParser = computed(() => {
        const address = props.weatherDatas.resolvedAddress
        const addressArray = address.split(',')
        return `${addressArray[0]}, ${addressArray[2]}`


    })
</script>

<style scoped>
    .bg-grad-perso {
        background: -webkit-linear-gradient(304deg, #202020 0%, #6b6b6b9b 100%);
        background: linear-gradient(320deg, #202020 0%, #202020 30%, #6b6b6b9b 100%);
        border: 1px solid rgba(255, 255, 255, 0.25);
    }
</style>