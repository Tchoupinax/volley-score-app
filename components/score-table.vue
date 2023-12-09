<template>
  <div class="flex flex-col">
    <div class="container mx-auto px-4 sm:px-8 w-full">
      <div class="py-8">
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Teams
                  </th>

                  <th
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Score
                  </th>

                  <th
                    v-for="(_, index) of scores"
                    class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider"
                  >
                    Set {{  index + 1 }}
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
                        <img class="w-full h-full rounded-full"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/ASUL_Lyon_Volley.png/260px-ASUL_Lyon_Volley.png"
                          alt="" />
                      </div>
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Home Team
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-2xl font-bold">
                    <p class="text-gray-900 whitespace-no-wrap text-center">
                      {{ scores.slice(0, -1).filter(set => set["homeTeamScore"] > set["externalTeamScore"]).length }}
                    </p>
                  </td>

                  <td v-for="set of scores" class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap text-center">
                      {{ set["homeTeamScore"] }}
                    </p>
                  </td>

                </tr>
                <tr>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
                        <img class="w-full h-full rounded-full"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/ASUL_Lyon_Volley.png/260px-ASUL_Lyon_Volley.png"
                          alt="" />
                      </div>
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap">
                          External Team
                        </p>
                      </div>
                    </div>
                  </td>

                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-2xl font-bold">
                    <p class="text-gray-900 whitespace-no-wrap text-center">
                      {{ scores.slice(0, -1).filter(set => set["externalTeamScore"] > set["homeTeamScore"]).length }}
                    </p>
                  </td>

                  <td v-for="set of scores" class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap text-center">
                      {{ set["externalTeamScore"] }}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    scores: {
      type: Array,
      required: true
    }
  }
}
</script>