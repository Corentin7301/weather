<template>
    <div class="min-w-fit">
        <Tag :type="Tag === 'button' && submitButton ? `submit` : ``"
        :class="`px-3  flex items-center justify-center transition-colors rounded-md md:py-1 md:px-10 md:text-lg
        ${!useDeferredPrompt().value ? 'no-tap-highlighting' : ''}
        ${outlined ? `text-fuel-yellow-500 bg-white border-2 border-fuel-yellow-500 hover:bg-fuel-yellow-500 hover:text-white` : 'border-2 border-transparent'} 
        ${inversed ? `bg-white text-fuel-yellow-500 hover:bg-fuel-yellow-500 hover:text-white` : ''} 
        ${unelevated ? `bg-transparent text-gray-50 font-normal hover:opacity-80 transition-opacity` : ''} 
        ${disabled ? `bg-fuel-yellow-500 text-white opacity-50 hover:opacity-50 cursor-not-allowed` : ''} 
        ${roundedNone ? `rounded-none` : ``}
        ${roundedFull ? 'rounded-full' : ``}
        ${!outlined && !inversed && !unelevated && !disabled ? `bg-fuel-yellow-500 text-white font-medium lg:hover:bg-fuel-yellow-50 lg:hover:text-fuel-yellow-500` : ''} 
        `"
        :href="href" 
        :target="`${newTab ? '_blank' : ''}`"
        :title="btnTitle"
        >
            <slot name="content" />
            <span v-if="customIcon" class="flex items-center ml-1 "><slot name="icon"></slot></span>
        </Tag>
    </div>
</template>

<script setup>
    const props = defineProps({
        selected: {
            type: Boolean,
            default: false
        },
        href: {
            type: String,
            required: false
        },
        unelevated: {
            type: Boolean,
            required: false
        },
        outlined: {
            type: Boolean,
            required: false
        },
        inversed: {
            type: Boolean,
            required: false
        },
        roundedNone: {
            type: Boolean,
            required: false
        },
        roundedFull: {
            type: Boolean,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false
        },
        customIcon: {
            type: Boolean,
            required: false
        },
        newTab: {
            type: Boolean,
            required: false
        },
        submitButton: {
            type: Boolean,
            required: false
        },
        btnTitle: {
            type: String,
            required: false
        },
    })
    const Tag = props.href ? 'a' : 'button'
</script>