<template>
  <NavBar />
  <ColumnList />
  <router-view></router-view>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
import ColumnList from "@/components/ColumnList.vue";
export default {
  name: "BoardView",
  created() {
    this.$store.dispatch("initApp");
  },
  components: {
    NavBar,
    ColumnList
  }
};
</script>
