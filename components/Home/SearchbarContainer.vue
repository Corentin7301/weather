<template>
    <div :class="[`absolute w-[90%] lg:max-w-xl mt-10 -translate-x-1/2 left-1/2 ${getHistory ? 'lg:-translate-x-full ' : ''} bottom-12 space-y-5 lg:space-y-0 lg:space-x-5`]">
            <section
                class="py-8 shadow-2xl px-7 rounded-2xl bg-grad-card-perso backdrop-blur">
                <h1 class="mb-3 text-4xl font-semibold">{{global.siteName}}</h1>
                <h2 class="mb-8 text-xl font-light">Ne laisse pas le mauvais temps stopper tes activités</h2>
                <p class="relative inline-block mb-6 text-3xl ">
                    Recherche ta ville
                    <span class="absolute w-10 h-1 rounded-full -bottom-1 -right-3 bg-fuel-yellow-500"></span>

                </p>
                <HomeInstallButton />
                <HomeSearchbar />
            </section>
            <HomeHistory v-if="getHistory" :historyItems="getHistory"/>
    </div>
</template>

<script setup>
import global from '~/site.config.json'
const getHistory = JSON.parse(localStorage.getItem('locationHistory'));
</script>