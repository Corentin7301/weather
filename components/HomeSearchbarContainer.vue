<template>
    <div>
        <section
            class="absolute w-[90%] mt-10 -translate-x-1/2 bottom-10 left-1/2 py-8 px-7 rounded-2xl bg-grad-card-perso backdrop-blur">
            <h1 class="mb-3 text-4xl font-semibold">{{global.siteName}}</h1>
            <h2 class="mb-8 text-xl font-light">Ne laisse pas le mauvais temps stopper tes activités</h2>
            <p class="mb-4 text-3xl">Recherche ta ville</p>
            <Searchbar />
        </section>
    </div>
</template>

<script setup>
import global from '~/site.config.json'
</script>