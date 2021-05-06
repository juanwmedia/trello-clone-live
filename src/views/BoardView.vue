<template>
  <NavBar />
  <router-view></router-view>
</template>

<script>
import NavBar from "@/components/NavBar.vue";
export default {
  name: "BoardView",
  components: {
    NavBar
  }
};
</script>
