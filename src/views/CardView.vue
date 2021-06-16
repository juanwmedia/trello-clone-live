<template>
  <AppCard :card="card" />
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";
import AppCard from "@/components/AppCard.vue";
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
  },
  components: {
    AppCard
  }
};
</script>
