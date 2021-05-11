<template>
  <draggable v-model="cards" group="cards" item-key="id">
    <template #item="{element}">
      <BoardCard :card="element" />
    </template>
  </draggable>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import draggable from "vuedraggable";
import BoardCard from "@/components/BoardCard.vue";
export default {
  name: "CardList",
  props: {
    column: {
      type: Object
    }
  },
  setup(props) {
    const store = useStore();
    const cards = computed({
      get: () => store.getters["boardModule/getCardsByColumn"](props.column.id),
      set: value =>
        store.dispatch("boardModule/updateCards", {
          column: props.column,
          cards: value
        })
    });
    return { cards };
  },
  components: {
    BoardCard,
    draggable
  }
};
</script>
