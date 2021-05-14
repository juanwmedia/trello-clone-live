<template>
  <draggable v-model="columns" class="board" item-key="key" group="columns">
    <template #item="{element}">
      <AppColumn :column="element">
        <CardList :column="element" />
      </AppColumn>
    </template>
  </draggable>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import draggable from "vuedraggable";
import AppColumn from "@/components/AppColumn.vue";
import CardList from "@/components/CardList.vue";
export default {
  name: "ColumnList",
  setup() {
    const store = useStore();
    const columns = computed({
      get: () => store.getters["boardModule/getColumns"],
      set: value => store.dispatch("boardModule/updateColumns", value)
    });
    return { columns };
  },
  components: {
    AppColumn,
    CardList,
    draggable
  }
};
</script>

<style>
.board {
  min-height: 50vh;
  @apply py-10 flex overflow-x-scroll;
}
</style>
