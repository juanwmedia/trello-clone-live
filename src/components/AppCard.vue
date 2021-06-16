<template>
  <div
    class="wrapper w-full h-full flex justify-center items-center bg-black absolute top-0 left-0 z-10 cursor-pointer"
  >
    <div class="w-1/3 bg-white p-3 rounded">
      <div class="flex items-center">
        <UserAvatar />
        <h1
          contenteditable
          class="font-semibold ml-2 font-sans tracking-wide text-2xl text-center"
        >
          {{ card.name }}
        </h1>
        <a class="flex-grow block text-right" href="#">Delete Card</a>
      </div>
      <div class="flex justify-between items-center my-3">
        <div>
          <label class="mr-3 text-lg" for="done">Mark as done</label>
          <input type="checkbox" id="done" :checked="card.done" />
        </div>
        <input class="p-1 bg-gray-200" type="date" :value="cardDate" />
      </div>
      <p contenteditable class="text-xl">
        {{ card.description }}
      </p>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";
import { computed } from "vue";
export default {
  name: "AppCard",
  props: {
    card: {
      type: Object
    }
  },
  setup(props) {
    const cardDate = computed(() =>
      new Date(props.card.date).toLocaleDateString("en-CA")
    );
    return {
      cardDate
    };
  },
  components: {
    UserAvatar
  }
};
</script>

<style scoped>
.wrapper {
  background-color: rgba(0, 0, 0, 0.8);
}
</style>
