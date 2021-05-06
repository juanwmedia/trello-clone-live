<template>
  <img :src="userAvatar" alt="Avatar" class="w-8 h-8 rounded-full" />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  name: "UserAvatar",
  setup() {
    const store = useStore();
    const userAvatar = computed(
      () => store.getters["userModule/getUserAvatar"]
    );
    return { userAvatar };
  }
};
</script>
