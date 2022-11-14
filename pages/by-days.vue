<template>
    <div>
        <section v-if="datas">
            <CardsBiggerCard :dateNow="dateNow" :weatherDatas="datas" />
            <section>
            </section>
        </section>
        <PeriodChoicer :dateNow="dateNow" :weatherDatas="datas" />
    </div>
</template>

<script setup>
import dayjs from 'dayjs'
import 'dayjs/locale/fr'
import datas from '~/datas/test-datas.json'
const dateNow = dayjs().locale('fr')
console.table(datas)
</script>

