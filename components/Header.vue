<template>
    <div class="flex items-center justify-between mt-3 mb-7">
        <button @click="returnToSearchbar()" class="p-2 ml-2 rounded-full bg-grad-card-perso opacity-80">
            <Icon name="material-symbols:arrow-right-alt-rounded" size="32px" class="text-white rotate-180" />
        </button>
        <h1 class="text-xl text-center opacity-80">Wheather App</h1>
        <span class="spacer w-[50px]"></span>
    </div>
</template>

<script setup>
    const returnToSearchbar = () => {
        setWeatherDatas(null)
        return navigateTo('/')
    }
</script>