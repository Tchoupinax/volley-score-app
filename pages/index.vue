<template>
  <div class="flex justify-between p-10 items-center">
    <div v-if="scores.length > 0" class="text-2xl font-extralight italic mb-4 text-center">
      {{ Object.keys(scores[0])[0] }}
    </div>

    <div v-if="scores.length > 0" class="text-2xl font-extralight italic mb-4 text-center">
      {{ Object.keys(scores[0])[1] }}
    </div>
  </div>

  <div class="flex justify-between p-10 items-center">
    <div v-if="scores.length > 0" class="text-5xl">
      {{ scores.at(-1)[Object.keys(scores[0])[0]] }}
    </div>
    
    <div class="text-6xl">-</div>

    <div v-if="scores.length > 0" class="text-5xl">
      {{ scores.at(-1)[Object.keys(scores[0])[1]] }}
    </div>
  </div>
  <Footer /> 
</template>

<script lang="ts">
export default {
  data() {
    return {
      scores: []
    }
  },
  mounted() {
    const socket = new WebSocket('ws://10.20.0.3:12430');
    socket.addEventListener("message", (event) => {
      this.scores = JSON.parse(event.data).scores
    });
  }
}
</script>
