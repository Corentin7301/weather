<template>
    <div class="mt-3 ">
        <HomeIcons />
        <div class="absolute top-0 left-0 w-screen h-screen">
            <div class="relative w-screen h-screen overflow-scroll scrollable">
                <HomeSearchbarContainer />
            </div>
        </div>
    </div>
</template>

<script setup>
    onMounted(() => {
        setWeatherDatas(null)
    })
</script>