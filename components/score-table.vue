<template>
  <div class="flex flex-col">
    <div class="container mx-auto px-4 sm:px-8 w-full">
      <div class="py-8">
        <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div class="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table class="min-w-full leading-normal">
              <tbody>
                <tr>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
                        <img class="w-full h-full"
                          src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/ASUL_Lyon_Volley.png/260px-ASUL_Lyon_Volley.png"
                          alt="" />
                      </div>
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Team A
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap text-center">
                      {{ scores.at(-1)[Object.keys(scores[0])[0]] }}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm w-2/5">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10 hidden sm:table-cell">
                        <img class="w-full h-full rounded-full"
                          src="https://upload.wikimedia.org/wikipedia/fr/8/8a/Mende_Volley_Loz%C3%A8re_%28logo%29.png"
                          alt="" />
                      </div>
                      <div class="ml-3">
                        <p class="text-gray-900 whitespace-no-wrap">
                          Team B
                        </p>
                      </div>
                    </div>
                  </td>
                  <td class="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                    <p class="text-gray-900 whitespace-no-wrap text-center">
                      {{ scores.at(-1)[Object.keys(scores[0])[1]] }}
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