<template>
        <div class="absolute w-full">
            <section
                class="w-full py-8 shadow-2xl px-7 rounded-2xl bg-grad-card-perso backdrop-blur">
                <p class="relative inline-block mb-6 text-3xl">
                    Dernières recherches
                    <span class="absolute w-10 h-1 rounded-full -bottom-1 -right-3 bg-fuel-yellow-500"></span>
                </p>
                <div class="grid grid-cols-2 gap-5">
                    <button v-for="historyItem in historyItems" :key="historyItem.id" :class="[`p-4 text-center border border-yellow-500 rounded-xl ${!useDeferredPrompt().value ? 'no-tap-highlighting' : ''}`]" @click="useChoicedHistoryLocation().value = historyItem">
                        <p v-if="addressParser(historyItem)[0]" :class="[` ${addressParser(historyItem)[0].length > 8 ? 'text-base' : 'text-xl'} font-semibold`]">{{ addressParser(historyItem)[0] }}</p>
                        <p v-if="addressParser(historyItem)[1]" :class="[` ${addressParser(historyItem)[2].length > 8 ? 'text-sm' : 'text-base'} font-thin tracking-[0.3em]`]">{{ addressParser(historyItem)[2] }}</p>
                    </button>
                </div>
            </section>
            <div class="h-3 spacer"></div>
        </div>
</template>

<script setup>
    const props = defineProps({
        historyItems: {
            type: Array,
            required: true
        }
    })

    const addressParser = (location) => {
        const address = location
        const addressArray = address.split(',')
        return addressArray
    }
</script>