<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6 col-sm-12 mb-4">
        <searcher />
      </div>
      <div class="row justify-content-around">
        <selection-list :list="setoresCnaes" />
        <selection-list :list="municipiosEstados" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
import Searcher from "./components/Searcher.vue";
import SelectionList from "./components/SelectionList/index.vue";
import { List } from "./store/interfaces";

export default defineComponent({
  name: "App",
  components: {
    Searcher,
    SelectionList,
  },
  setup() {
    const store = useStore();
    store.dispatch("requestAPI");
    const setoresCnaes = computed((): List => store.getters.setoresCnaes);
    const municipiosEstados = computed(
      (): List => store.getters.municipiosEstados
    );

    return {
      setoresCnaes,
      municipiosEstados,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.h-280 {
  height: 280px;
}
</style>
