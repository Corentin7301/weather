<template>
    <button class=" button-container text-ecstasy-500" v-if="deferredPrompt" @click="clickCallback()">
        <div class="label-container">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
            <span>Installer l'application</span>
        </div>
        <div class="w-2 h-2 mr-2 rounded-full bg-ecstasy-500 animate-ping"></div>
    </button>
</template>

<script setup>
onMounted(() => {
    captureEvent()
    // window.addEventListener('beforeinstallprompt', (e) => {
    //     e.preventDefault()
    //     deferredPrompt = e
    // })
})

const deferredPrompt = ref(null)
  const captureEvent = () => {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      // Stash the event so it can be triggered later.
      deferredPrompt.value = e
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
    })
  }
</script>