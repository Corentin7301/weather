<template>
    <div>
        <Header />
        <div v-if="datas">
            <CardsBiggerCard :dateNow="dateNow" :weatherDatas="datas" />
            <PeriodChoicer :weatherDatas="datas" />
        </div>
        <div v-else class="flex items-center justify-between opacity-80">
            <p>Malheureusement, nous avons eu du mal à récupérer les données...<span
                    class="block mt-3 text-lg font-medium text-fuel-yellow-500">Veuillez-réessayer ulterieurement
                    !</span></p>
            <nuxt-img src="/images/cloud/23.png" sizes="sm:75vw md:50vw lg:400px " loading="lazy" class="fly-animation max-w-[35vw]" />
        </div>
    </div>
</template>

<script setup>
    import dayjs from 'dayjs'
    import 'dayjs/locale/fr'
    import datas from '~/datas/test-datas.json'
    const dateNow = dayjs().locale('fr')
    console.table(datas)
</script>