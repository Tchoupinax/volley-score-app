<template>
  <div class="w-full flex flex-col justify-center items-center">

    <ScoreTable :scores="scores" class="w-full"/>

    <div class="flex p-6 xl:p-16 justify-between w-full xl:w-2/3">
      <ScoreIncreaser :teamName="Object.keys(scores[0])[0]" :currentScore="scores.at(-1)[Object.keys(scores[0])[0]]"
        @increase="increaseScore(Object.keys(scores[0])[0])" @decrease="descreaseScore(Object.keys(scores[0])[0])" />
      <ScoreIncreaser :teamName="Object.keys(scores[0])[1]" :currentScore="scores.at(-1)[Object.keys(scores[0])[1]]"
        @increase="increaseScore(Object.keys(scores[0])[1])" @decrease="descreaseScore(Object.keys(scores[0])[1])" />
    </div>
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
  methods: {
    async increaseScore(team: string) {
      await $fetch('/api/score', {
        method: "POST",
        body: {
          team,
          score: 1
        }
      })
    },
    async descreaseScore(team: string) {
      await $fetch('/api/score', {
        method: "POST",
        body: {
          team,
          score: -1
        }
      })
    }
  },
}
</script>