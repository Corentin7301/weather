<template>
    <div class="flex items-center justify-between opacity-80">
        <p>{{errors[error].label}}<span
                class="block mt-3 text-lg font-medium text-fuel-yellow-500">{{errors[error].subLabel}}</span></p>
        <img :src="`${global.imagesLink}/${errors[error].icon}`" alt="error" width="100" height="100"
            class="fly-animation w-[35vw]" />
    </div>
</template>

<script setup>
import global from '~/site.config.json'

    const props = defineProps({
        error: {
            type: String,
            required: true,
        },
    })

    const errors = {
        "no-datas": {
            label: "Malheureusement, nous avons eu du mal à récupérer les données...",
            subLabel: "Veuillez-réessayer ulterieurement !",
            icon: "cloud/23_b39avr",
        },
        "no-connexion": {
            label: "Malheureusement, vous semblez ne pas être connecté à internet...",
            subLabel: "Activez le wifi ou les données mobile ou réessayer ulterieurement !",
            icon: "cloud/25_gqbuai",
        },
    }

    console.log(props.error);
    console.log(errors[props.error]);
    
    
</script>