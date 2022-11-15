<template>
    <div>
        <Header />
        <div v-if="datas">
            <CardsBiggerCard :dateNow="dateNow" :weatherDayDatas="biggerCardDatas" :periodChoiced="periodChoiced" />
            <PeriodChoicer :weatherDatas="datas" @period-choice="periodChoice" />
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
    const dateNow = ref(dayjs().locale('fr'))
    const periodChoiced = ref({
        label: 'Aujourd\'hui',
        value: 'today',
        index: 0
    })

    const periodChoice = (value) => {
        switch(value.value) {
            case 'today':
                periodChoiced.value = {
                    label: 'Aujourd\'hui',
                    value: 'today',
                    index: 0
                }
                break;
                case 'tomorrow':
                periodChoiced.value = {
                    label: 'Demain',
                    value: 'tomorrow',
                    index: 1
                }
                dateNow.value = dayjs().locale('fr').add(1,'day')
                break;
                case 'in-7-days':
                periodChoiced.value = {
                    label: 'Dans 7 jours',
                    value: 'in-7-days',
                    index: 0
                }
                break;
                default:
                periodChoiced.value = {
                    label: 'Aujourd\'hui',
                    value: 'today',
                    index: 0
                }
                break;
        }
    }
    
    const biggerCardDatas = computed(() => {
        return {
            resolvedAddress: datas.resolvedAddress,
            temp: datas.days[periodChoiced.value.index].temp,
            icon: datas.days[periodChoiced.value.index].icon,
        }
    })
</script>