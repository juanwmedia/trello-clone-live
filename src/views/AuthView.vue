<template>
  <div v-if="!$store.state.userModule.user">
    <div class="container">
      <a
        @click="userLogin"
        class="w-full h-screen | flex justify-center items-center | underline"
        href="#"
        >Login please</a
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "AuthView",
  methods: {
    async userLogin() {
      try {
        await this.$store.dispatch("userModule/userLogin");
        this.$router.push("/board");
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>
