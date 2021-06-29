<template>
  <div
    @click="openCard"
    :class="{ done: card.done, overdue }"
    class="px-3 pt-3 pb-5 mb-3 | bg-white shadow rounded border border-white cursor-move"
  >
    <h4 class="text-gray-700 font-semibold font-sans tracking-wide text-md">
      {{ card.name }}
    </h4>
    <div class="flex mt-4 justify-between items-center">
      <p class="text-sm text-gray-600">{{ cardDate }}</p>
      <UserAvatar />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";

import UserAvatar from "@/components/UserAvatar.vue";
export default {
  name: "BoardCard",
  props: {
    card: {
      type: Object
    }
  },
  setup(props) {
    const router = useRouter();
    const openCard = () => {
      router.push({ name: "card", params: { id: props.card.id } });
    };
    return {
      openCard,
      cardDate: computed(() =>
        new Date(+props.card.date).toLocaleDateString("es-ES")
      ),
      overdue: computed(() => {
        if (props.card.done) return false;
        return props.card.date < Date.now();
      })
    };
  },
  components: {
    UserAvatar
  }
};
</script>

<style scoped>
.done {
  opacity: 0.5;
  background-color: lightgreen;
}

.overdue {
  background-color: tomato;
}
</style>
