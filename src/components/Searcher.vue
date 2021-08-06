<template>
  <input
    type="text"
    class="rounded-pill w-md-50 bg-light border-0 w-100 p-2 ps-4"
    placeholder="Digite aqui..."
    v-model="search"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";
import { debounce } from "lodash";

export default defineComponent({
  name: "Searcher",
  setup() {
    const store = useStore(),
      search = ref(""),
      deboucedSearch = debounce(function () {
        store.dispatch("search", search.value);
      }, 300);

    watch(search, () => {
      deboucedSearch();
    });

    return {
      search,
    };
  },
});
</script>
