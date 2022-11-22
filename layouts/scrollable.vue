<template>
    <div class="min-h-screen text-gray-50 bg-grad-perso font-Karla">
        <div class="max-w-[90%] lg:max-w-6xl mx-auto py-4">
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