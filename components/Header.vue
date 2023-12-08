<template>
    <div class="flex items-center justify-between mt-3 mb-7">
        <button title="return to home" aria-label="return to home" @click="returnToHome()" :class="[`p-3 h-12 w-12 rounded-full bg-grad-card-perso opacity-80 md:transition-opacity md:hover:opacity-50 ${!useDeferredPrompt().value ? 'no-tap-highlighting' : ''}`]">
            <Icon name="material-symbols:arrow-left-alt-rounded" class="w-full h-full mb-[3px] text-white " />
        </button>
        <h1 class="text-xl text-center opacity-80">{{global.siteName}}</h1>
        <button v-if="shareIsAvailable" title="share" aria-label="return to home" @click="share()" :class="[`p-3 h-12 w-12 flex items-center justify-center rounded-full bg-fuel-yellow-500 md:transition-opacity md:hover:opacity-75 bg-share-button-perso ${!useDeferredPrompt().value ? 'no-tap-highlighting' : ''}`]">
            <Icon name="material-symbols:share" class="w-full h-full mr-[3px] text-white" />
        </button>
        <span class="spacer w-[50px]" v-else></span>
    </div>
</template>

<script setup>
import global from '~/site.config.json'
const {fullPath} = useRoute()
    const returnToHome = () => {
        setPeriodChoice('today')
        useChoicedHistoryLocation().value = null
        return navigateTo('/')
    }

    const shareIsAvailable = ref(navigator.share)
    const share = () => {
        const shareParams = {
            title: 'Météo Soleil',
            text: `Regardes la météo ${useWeatherDatas() ? 'à '+useWeatherDatas().value.resolvedAddress.split(',')[0].trim()+' ' : ''}en direct ! - `,
            url: `https://www.meteosoleil.com${fullPath}`,
        }
        navigator.share(shareParams)
            .catch((error) => console.error('Erreur de partage', error));
    }
</script>