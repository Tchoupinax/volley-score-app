<template>
  <div class="flex flex-col justify-center items-center">
    <div class="sm:text-2xl font-extralight italic mb-12 text-center">
      {{ teamName }}
    </div>

    <div class="text-2xl sm:text-5xl text-center mb-12">
      {{ currentScore }}
    </div>

    <button
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold sm:py-2 sm:px-4 border border-gray-400 rounded shadow text-2xl sm:text-8xl w-2/3 sm:w-full h-20 sm:h-full"
      @click="this.$emit('increase')"
    >
      +
    </button>
    <div class="mb-8"></div>
    <button
      class="bg-white hover:bg-gray-100 text-gray-800 font-semibold sm:py-2 sm:px-4 border border-gray-400 rounded shadow text-2xl sm:text-8xl w-2/3 sm:w-full h-20 sm:h-full"
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