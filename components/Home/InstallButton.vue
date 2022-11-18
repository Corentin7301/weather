<template>
    <button :class="[`absolute -top-4 -right-3 animate-bounce ${!useDeferredPrompt().value ? 'no-tap-highlighting' : ''}`]" aria-describedby="application install button" v-if="deferredPrompt" @click="clickCallback()">
        <div class="p-3 ml-2 rounded-full bg-fuel-yellow-500">
            <Icon name="ic:baseline-install-mobile" size="24px" class="text-white" />
        </div>
        <div class="w-2 h-2 mr-2 rounded-full bg-ecstasy-500 animate-ping"></div>
    </button>
</template>

<script setup>
onMounted(() => {
    captureEvent()
})

const deferredPrompt = ref(null)
  const captureEvent = () => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt.value = e
      useDeferredPrompt().value = e
    })
  }
  const clickCallback = () => {
    // Show the prompt
    deferredPrompt.value.prompt()
    // Wait for the user to respond to the prompt
    deferredPrompt.value.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        // Call another function?
      }
      deferredPrompt.value = null
      useDeferredPrompt().value = null
    })
  }
</script>