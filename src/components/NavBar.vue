<template>
  <div class="flex justify-center items-start | relative">
    <div class="flex items-center ">
      <div>
        <h1
          class="text-gray-700 font-semibold font-sans tracking-wide text-3xl text-center"
        >
          {{ boardName }}
        </h1>
        <a href="#" class="ml-2 text-sm block text-center mt-3"
          >Create column</a
        >
      </div>
    </div>
    <div class="flex items-center absolute right-0 top-0 ">
      <a href="#" class="mr-2 text-sm">Change background</a>
      <input
        type="search"
        class="bg-gray-300 rounded p-1 text-gray-600 text-sm mr-3"
        placeholder="Search cards"
      />
      <UserAvatar />
      <a href="#" class="ml-2 text-sm">Logout</a>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import UserAvatar from "@/components/UserAvatar.vue";
export default {
  name: "NavBar",
  setup() {
    const store = useStore();
    const boardName = computed(() => store.getters["boardModule/getBoardName"]);
    return { boardName };
  },
  components: {
    UserAvatar
  }
};
</script>
