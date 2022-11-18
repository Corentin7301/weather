<template>
    <div class="relative max-h-screen min-h-screen overflow-hidden text-gray-50 bg-grad-perso font-Karla">
        <div class="max-w-[90%] mx-auto py-4">
            <slot v-if="online" />
            <ErrorsError v-else error="no-connexion" />
        </div>
    </div>
</template>

<script setup>
import { useOnline } from '@vueuse/core'
const online = useOnline()
</script>

<style scoped>
    .bg-grad-perso {
        background: #2b2b2b;
        background: -webkit-linear-gradient(160deg, #202020 0%, #202020 50%, #2b2b2b 100%);
        background: linear-gradient(160deg, #202020 0%, #202020 50%, #2b2b2b 100%);
    }
</style>