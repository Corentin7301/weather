<template>
    <div class="flex items-center justify-between">
        <img :src="`${global.imagesLink}/sun/27_wpoosn`" class="fly-animation max-w-[50%] w-[50%]" alt="sun with cloud illustration" />
        <div class="grid gap-4">
            <img :src="`${global.imagesLink}/cloud/24_mkeql3`" class="max-w-[140px] w-[140px]" alt="flash with cloud, rain and snow illustration" />
            <img :src="`${global.imagesLink}/cloud/18_n4zix1`" class="max-w-[140px] w-[140px]" alt="cloud with snow illustration" />
            <img :src="`${global.imagesLink}/moon/41_kj7t7l`" class="max-w-[140px] w-[140px]" alt="moon with cloud illustration" />
        </div>
    </div>
</template>

<script setup>
import global from '~/site.config.json'
</script>