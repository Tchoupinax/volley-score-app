<template>
  <div class="w-full flex flex-col justify-center items-center">
    <ScoreTable :scores="scores" class="w-full"/>
  </div>

</template>

<script lang="ts">
export default {
  data() {
    return {
      scores: [
        {
          "team A": 0,
          "team B": 0
        }
      ],

    }
  },
  mounted() {
    const socket = new WebSocket('ws://localhost:12430');
    socket.addEventListener("message", (event) => {
      this.scores = JSON.parse(event.data).scores
    });
  },
}
</script>