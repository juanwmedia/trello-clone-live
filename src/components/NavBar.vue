<template>
  <div class="flex justify-center items-start | relative">
    <div class="flex items-center ">
      <div>
        <h1
          contenteditable
          @blur="editName"
          class="text-gray-700 font-semibold font-sans tracking-wide text-3xl text-center"
        >
          {{ board.name }}
        </h1>
        <a
          @click="createColumn"
          href="#"
          class="ml-2 text-sm block text-center mt-3"
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
      <a @click="userLogout" href="#" class="ml-2 text-sm">Logout</a>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import router from "@/router";
import UserAvatar from "@/components/UserAvatar.vue";
export default {
  name: "NavBar",
  setup() {
    const store = useStore();
    const board = computed(() => store.state.boardModule.board);
    const editName = evt => {
      store.dispatch("boardModule/updateBoard", {
        id: board.value.id,
        key: "name",
        value: evt.target.innerText
      });
    };
    async function userLogout() {
      try {
        await store.dispatch("userModule/userLogout");
        router.push("/");
      } catch (error) {
        console.error(error);
      }
    }
    async function createColumn() {
      try {
        await store.dispatch("boardModule/createColumn");
      } catch (error) {
        console.error(error.message);
      }
    }
    return { board, editName, userLogout, createColumn };
  },
  components: {
    UserAvatar
  }
};
</script>
