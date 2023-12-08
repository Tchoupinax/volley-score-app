<template>
  <div class="flex flex-col">
    <div class="text-2xl font-extralight italic mb-12 text-center">
      {{ teamName }}
    </div>

    <div class="text-5xl text-center mb-12">
      {{ currentScore }}
    </div>

    <button
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-8xl"
      @click="this.$emit('increase')"
    >
      +
    </button>
    <div class="mb-8"></div>
    <button
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow text-8xl"
      @click="this.$emit('decrease')"
    >
      -
    </button>
  </div>
</template>

<script lang="ts">
export default {
  emits: ["increase", "decrease"],
  props: {
    teamName: {
      type: String,
      required: true,
    },
    currentScore: {
      type: Number,
      required: true,
    },
  }
}
</script>