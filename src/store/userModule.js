import { user } from "@/seed.js";
export default {
  namespaced: true,
  state: {
    user
  },
  getters: {
    getUserAvatar: state => state.user.avatar
  },
  mutations: {},
  actions: {}
};
