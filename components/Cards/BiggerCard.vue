<template>
    <div class="relative px-5 py-3 rounded-2xl bg-grad-perso">
        <nuxt-img src="/images/cloud/22.png" sizes="sm:35vw "
            class="absolute -right-4 bottom-1 icon-animation" />
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
    </div>
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
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.25);
    }

    .icon-animation {
        animation: bounce 8s infinite;
    }


    @keyframes bounce {

        0%,
        100% {
            transform: translateY(-10%);
        }

        30% {
            transform: translate(-2%,0);
            animation-timing-function: cubic-bezier(0, 0.02, 0.69, 1.02);

        }

        50% {
            transform: translate(3%,-2%);
        }
    }
</style>