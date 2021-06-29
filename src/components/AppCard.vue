<template>
  <div
    @click.self="closeCard"
    class="wrapper w-full h-full flex justify-center items-center bg-black absolute top-0 left-0 z-10 cursor-pointer"
  >
    <div class="w-1/3 bg-white p-3 rounded">
      <div class="flex items-center">
        <UserAvatar />
        <h1
          contenteditable
          @blur="updateCard('name', $event)"
          class="font-semibold ml-2 font-sans tracking-wide text-2xl text-center"
        >
          {{ card.name }}
        </h1>
        <a @click="deleteCard" class="flex-grow block text-right" href="#"
          >Delete Card</a
        >
      </div>
      <div class="flex justify-between items-center my-3">
        <div>
          <label class="mr-3 text-lg" for="done">Mark as done</label>
          <input
            type="checkbox"
            id="done"
            :checked="card.done"
            @change="updateCard('done', $event)"
          />
        </div>
        <input
          class="p-1 bg-gray-200"
          type="date"
          :value="cardDate"
          @change="updateCard('date', $event)"
        />
      </div>
      <p
        contenteditable
        class="text-xl"
        @blur="updateCard('description', $event)"
      >
        {{ card.description }}
      </p>
    </div>
  </div>
</template>

<script>
import UserAvatar from "@/components/UserAvatar.vue";
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  name: "AppCard",
  props: {
    card: {
      type: Object
    }
  },
  setup(props) {
    const store = useStore();
    const router = useRouter();

    const cardDate = computed(() =>
      new Date(props.card.date).toLocaleDateString("en-CA")
    );
    const updateCard = (key, evt) => {
      store.dispatch("boardModule/updateCard", {
        id: props.card.id,
        key,
        value: getValue()
      });

      function getValue() {
        if (key === "name" || key === "description") {
          return evt.target.innerText;
        } else if (key === "date") {
          return new Date(evt.target.value).getTime();
        } else if (key === "done") {
          return evt.target.checked;
        }
      }
    };
    const closeCard = () => router.go(-1);
    const deleteCard = () => {
      store.dispatch("boardModule/deleteCard", props.card.id);
      closeCard();
    };

    return {
      cardDate,
      updateCard,
      closeCard,
      deleteCard
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
