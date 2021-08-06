<template>
  <div class="col-md-12 col-sm-12 border-bottom overflow-auto h-280 pb-1 mb-4">
    <template v-if="list.itens.length">
      <item
        v-for="(item, index) in list.itens"
        :item="item"
        :selected="list.selected"
        :key="index"
      />
    </template>
    <template v-else>
      <h1>Nenhum resultado encontrado.</h1>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Item from "./Item.vue";
import { List } from "@/store/interfaces";

export default defineComponent({
  name: "Selection List",
  components: { Item },
  props: {
    list: {
      type: Object as PropType<List>,
      required: true,
      default: () => {
        return {
          itens: [],
          selected: [],
        };
      },
    },
  },
});
</script>
