<template>
  <div v-if="currentGameId" class="bg-blue-200 w-full flex flex-col justify-center items-center">
    <div class="bg-red-100 flex flex-col p-6 xl:p-16 justify-between w-full xl:w-2/3">
      <div class="flex w-full justify-between">
        <div v-if="scores.length > 0" class="sm:text-2xl font-extralight italic mb-4 text-center">
          {{ Object.keys(scores[0])[0] }}
        </div>

        <div v-if="scores.length > 0" class="sm:text-2xl font-extralight italic mb-4 text-center">
          {{ Object.keys(scores[0])[1] }}
        </div>
      </div>

      <div class="flex w-full justify-between sm:mt-16">
        <div v-if="scores.length > 0" class="text-3xl sm:text-5xl ml-8 sm:ml-16">
          {{ scores.at(-1)[Object.keys(scores[0])[0]] }}
        </div>
        
        <div v-if="scores.length > 0" class="text-3xl sm:text-5xl mr-8 sm:mr-16">
          {{ scores.at(-1)[Object.keys(scores[0])[1]] }}
        </div>
      </div>
    </div>

    <ScoreTable :scores="scores" class="w-full"/>
  </div>
  
  <div v-else class="bg-blue-200 w-full flex flex-col justify-center items-center">
    <h1 class="mt-6 text-2xl sm:text-5xl">List of public games</h1>

    <div class="mt-12 text-xl bg-red-200 text-left w-1/2">
      <div v-for="game of games">
        <NuxtLink :to="`/public-view?gameId=${game.id}`">
          {{ game.name }}
        </NuxtLink>
      </div>
    </div>
  </div>

  <Footer /> 
</template>

<script lang="ts">
import type { Game } from '../server/domain/entities/game';

type Store = {
  scores: Array<Record<"homeTeamScore" | "externalTeamScore", number>>,
  games: Array<Game>;
}

export default {
  data(): Store {
    return {
      scores: [
        {
          homeTeamScore: 0,
          externalTeamScore: 0
        }
      ],
      games: []
    }
  },
  computed: {
    currentGameId(): string {
      return this.$route.query.gameId as string;
    }
  },
  async mounted() {
    const config = useRuntimeConfig()
    const socket = new WebSocket(config.public.wsEndpoint);
    
    socket.addEventListener("message", (event) => {
      const payload = JSON.parse(event.data)
      switch(payload.type) {
        case 'score-edited':
          this.scores.at(-1).externalTeamScore = payload.scores.externTeamScore;
          this.scores.at(-1).homeTeamScore = payload.scores.homeTeamScore;
          this.isHomeTeamWhichWonSet = undefined;
          break;
      }
    });

    console.log(this.currentGameId)

    if (this.currentGameId) {
      const data = await $fetch(`/api/game-status?gameId=${this.currentGameId}`);
      const a = data.sets;
      this.scores = a
    } else {
      this.games = await $fetch("/api/list-games")
    }
  }
}
</script>
