<template>
    <div class="max-h-screen min-h-screen text-white bg-grad-perso font-Karla">
        <div class="max-w-[90%] mx-auto py-4">
            <slot />
        </div>
    </div>
</template>

<style scoped>
    .bg-grad-perso {
        background: #2b2b2b;
        background: -webkit-linear-gradient(160deg, #202020 0%, #202020 50%, #2b2b2b 100%);
        background: linear-gradient(160deg, #202020 0%, #202020 50%, #2b2b2b 100%);
    }
</style>