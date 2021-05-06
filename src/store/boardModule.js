import { board, columns, cards } from "@/seed.js";
export default {
  namespaced: true,
  state: {
    board,
    columns,
    cards
  },
  getters: {
    getBoardName: state => state.board.name
  },
  mutations: {},
  actions: {}
};
