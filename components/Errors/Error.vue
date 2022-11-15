<template>
    <div class="flex items-center justify-between opacity-80">
        <p>{{errors[error].label}}<span
                class="block mt-3 text-lg font-medium text-fuel-yellow-500">{{errors[error].subLabel}}</span></p>
        <nuxt-img :src="`~/assets/images/${errors[error].icon}.png`" sizes="sm:75vw md:50vw lg:400px " alt="error" loading="lazy"
            class="fly-animation max-w-[35vw]" />
    </div>
</template>

<script setup>
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
            icon: "cloud/23",
        },
        "no-connexion": {
            label: "Malheureusement, vous semblez ne pas être connecté à internet...",
            subLabel: "Activez le wifi ou les données mobile ou réessayer ulterieurement !",
            icon: "cloud/25",
        },
    }

    console.log(props.error);
    console.log(errors[props.error]);
    
    
</script>