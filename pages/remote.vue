<template>
  <div class="bg-blue-200 w-full flex flex-col justify-center items-center">
    <div class="bg-red-100 flex p-6 xl:p-16 justify-between items-center w-full xl:w-2/3">
      <ScoreIncreaser
        teamName="homeTeamScore"
        :currentScore="scores.at(-1)!['homeTeamScore']"
        @increase="increaseScore(true)"
        @decrease="descreaseScore(true)"
      />

      <button
        v-if="isHomeTeamWhichWonSet !== undefined"
        @click="persistSetWonBy()"
        class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 h-16 rounded shadow text-sm sm:text-xl"
      >
        Did {{ isHomeTeamWhichWonSet ? "Home Team": "External Team" }} won the set?
      </button>

      <ScoreIncreaser
        teamName="externalTeamScore"
        :currentScore="scores.at(-1)!['externalTeamScore']"
        @increase="increaseScore(false)"
        @decrease="descreaseScore(false)"
      />
    </div>
      
    <ScoreTable :scores="scores" class="w-full"/>
  </div>

  <Footer />
</template>

<script lang="ts">
import type { GameCreationPayload } from '../server/types/game-creation.payload';
import type { UpdateScorePayload } from '../server/types/score.payload.post';
import type { ValidateSetPayload } from '../server/types/validate-set.payload';

type Store = {
  scores: Array<Record<"homeTeamScore" | "externalTeamScore", number>>;
  isHomeTeamWhichWonSet?: boolean;
  setFinished: boolean;
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
      isHomeTeamWhichWonSet: undefined,
      setFinished: false,
    }
  },
  computed: {
    currentGameId(): string {
      return this.$route.query.gameId as string;
    }
  },
  async mounted() {
    if (!this.currentGameId) {
      const gameName = prompt("Create new game")!
      if (gameName === null) {
        window.location = `/`
        return;
      }

      const { gameId } = await this.createGame(gameName);
      window.location = `/remote?gameId=${gameId}`
    }

    const socket = new WebSocket('ws://10.20.0.3:12430');
    socket.addEventListener("message", async (event) => {
      const payload = JSON.parse(event.data)
      switch(payload.type) {
        case 'score-edited': {
          this.isHomeTeamWhichWonSet = undefined;
          if (!this.setFinished) {
            this.scores.at(-1).externalTeamScore = payload.scores.externTeamScore;
            this.scores.at(-1).homeTeamScore = payload.scores.homeTeamScore;
          } else {
            this.setFinished = false;
            setTimeout(async () => {
              const data = await $fetch(`/api/game-status?gameId=${this.currentGameId}`);
              const a = data.sets;
              this.scores = [...a]
            }, 10)
          }
          break;
        }
        case 'set-won':
          this.isHomeTeamWhichWonSet = payload.data.isHomeTeamWhichWonSet;
          break;
      }
    });

    const data = await $fetch(`/api/game-status?gameId=${this.currentGameId}`);
    const a = data.sets;
    this.scores = a
  },
  methods: {
    async increaseScore(isHomeTeam: boolean) {
      await $fetch('/api/update-score', {
        method: "POST",
        body: {
          isHomeTeam,
          score: 1,
          gameId: this.currentGameId,
        } satisfies UpdateScorePayload
      })
    },
    async descreaseScore(isHomeTeam: boolean) {
      await $fetch('/api/update-score', {
        method: "POST",
        body: {
          isHomeTeam,
          score: -1,
          gameId: this.currentGameId,
        } satisfies UpdateScorePayload
      })
    },
    async persistSetWonBy() {
      this.setFinished = true;
      await $fetch('/api/validate-set', {
        method: "POST",
        body: {
          gameId: this.currentGameId,
        } satisfies ValidateSetPayload
      })
    },
    async createGame(gameName: string) {
      return $fetch('/api/create-game', {
        method: "POST",
        body: {
          name: gameName,
        } satisfies GameCreationPayload
      })
    }
  },
}
</script>