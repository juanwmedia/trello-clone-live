<template>
  <div
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
import UserAvatar from "@/components/UserAvatar.vue";
export default {
  name: "BoardCard",
  props: {
    card: {
      type: Object
    }
  },
  setup(props) {
    return {
      cardDate: computed(() =>
        new Date(+props.card.date).toLocaleDateString("es-ES")
      )
    };
  },
  components: {
    UserAvatar
  }
};
</script>
