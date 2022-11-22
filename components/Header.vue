<template>
    <div class="flex items-center justify-between mt-3 mb-7">
        <button name="return to home" aria-describedby="return to home" @click="returnToHome()" :class="[`p-2 ml-2 rounded-full bg-grad-card-perso opacity-80 ${!useDeferredPrompt().value ? 'no-tap-highlighting' : ''}`]">
            <Icon name="material-symbols:arrow-right-alt-rounded" size="32px" class="text-white rotate-180" />
        </button>
        <h1 class="text-xl text-center opacity-80">{{global.siteName}}</h1>
        <span class="spacer w-[50px]"></span>
    </div>
</template>

<script setup>
import global from '~/site.config.json'
    const returnToHome = () => {
        setPeriodChoice('today')
        useChoicedHistoryLocation().value = null
        return navigateTo('/')
    }
</script>