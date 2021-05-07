<template>
  <div class="board">
    <AppColumn v-for="column in columns" :key="column.id" :column="column">
    </AppColumn>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import AppColumn from "@/components/AppColumn.vue";
export default {
  name: "ColumnList",
  setup() {
    const store = useStore();
    const columns = computed(() => store.state.boardModule.columns);
    return { columns };
  },
  components: {
    AppColumn
  }
};
</script>

<style>
.board {
  min-height: 50vh;
  @apply py-10 flex overflow-x-scroll;
}
</style>
