<template>
  <div class="column | p-3 mr-4 | rounded bg-gray-100 cursor-move">
    <div class="flex justify-between">
      <a
        v-show="emptyColumn"
        @click="deleteColumn"
        class="text-sm text-right block text-gray-600"
        href="#"
        >Delete</a
      >
      <a
        @click="createCard"
        class="text-sm text-right block text-gray-600"
        href="#"
        >Create Card</a
      >
    </div>
    <h3
      contenteditable
      @blur="onEdit"
      class="mb-3 | text-gray-700 font-semibold font-sans tracking-wide text-xl text-center"
    >
      {{ column.name }}
    </h3>
    <!-- Card -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "AppColumn",
  props: {
    column: {
      type: Object
    }
  },
  computed: {
    emptyColumn() {
      return (
        this.$store.getters["boardModule/getCardsByColumn"](this.column.id)
          .length === 0
      );
    }
  },
  methods: {
    onEdit(evt) {
      this.$store.dispatch("boardModule/updateColumnName", {
        id: this.column.id,
        name: evt.target.innerText
      });
    },
    createCard() {
      this.$store.dispatch("boardModule/createCard", this.column.id);
    },
    deleteColumn() {
      this.$store.dispatch("boardModule/deleteColumn", this.column.id);
    }
  }
};
</script>

<style scoped>
.column {
  flex-basis: 25%;
}
</style>
