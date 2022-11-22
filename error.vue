<template>
    <div class="flex relative flex-col items-center justify-center w-screen h-screen text-white font-Karla max-w-[90%] lg:max-w-6xl mx-auto">
        <img src="https://res.cloudinary.com/corentin7301/image/upload/f_auto/q_auto/c_scale/weather_app/cloud/29_rw1omz" alt="404 error" width="100" height="100" class="w-[60%] lg:w-[30%] absolute top-[15%] right-3 fly-animation">
        <h1 class="mb-5 font-black text-7xl">Oups <span class="text-fuel-yellow-500">!</span></h1>
        <h2 class="mb-10 text-center">Je ne vais pas pouvoir te donner la météo sur cette page...</h2>
        <NuxtLink to="/">
            <Button customIcon roundedFull btnTitle="return to home" aria-label="return to home">
                <template #content>
                        Retourner à l'accueil
                </template>
                <template #icon>
                    <Icon name="material-symbols:arrow-right-alt-rounded" size="30px" class="ml-2 text-white LtoR-animation" />
                </template>
            </Button>
        </NuxtLink>
    </div>
</template>

<style scoped>
    .LtoR-animation {
        animation: LtoR 1s ease-in-out infinite;
    }

    @keyframes LtoR {
        0% {
            transform: translateX(-2px);
        }
        35% {
            transform: translateX(2px);
        }
        100% {
            transform: translateX(-2px);
        }
    }
</style>