<template>
  <div class="d-flex ps-3" @click="setSelected" v-if="item.value">
    <input type="checkbox" v-model="isSelected" />
    <h4 class="mt-1 ms-3">{{ item.label }}</h4>
    <span class="text-secondary mt-2 ms-3">{{ item.subline }}</span>
  </div>
</template>

<script lang="ts">
import { Item } from "@/store/interfaces";
import { computed, defineComponent, PropType } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "Item",
  props: {
    item: {
      type: Object as PropType<Item>,
      required: true,
      default: () => {
        return {
          value: "",
          label: "",
          tags: "",
        };
      },
    },
    selected: {
      type: Array,
      required: true,
      default: () => {
        return [];
      },
    },
  },
  setup(props) {
    const isSelected = computed(() =>
        props.selected.includes(props.item.value)
      ),
      store = useStore();

    function setSelected() {
      store.dispatch("select", props.item);
    }

    return {
      isSelected,
      setSelected,
    };
  },
});
</script>

<style scoped>
div:hover {
  background-color: rgb(250, 250, 250);
  cursor: pointer;
}
</style>
