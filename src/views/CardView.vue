<template>
  <div>Card View</div>
  <div>{{ card.name }}</div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

export default {
  name: "CardView",
  setup() {
    const store = useStore();
    const route = useRoute();
    const router = useRouter();
    const card = ref({});

    store
      .dispatch("boardModule/checkCard", route.params.id)
      .then(data => (card.value = data))
      .catch(() => router.push("/board"));

    return { card };
  }
};
</script>
