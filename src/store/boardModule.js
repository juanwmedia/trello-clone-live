// import { board, columns, cards } from "@/seed.js";
import { db } from "@/firebase.js";

export default {
  namespaced: true,
  state: {
    board: {},
    columns: [],
    cards: []
  },
  getters: {
    getBoardName: state => state.board.name,
    getCardsByColumn: state => column =>
      state.cards
        .filter(card => card.column === column)
        .sort((a, b) => a.order - b.order)
  },
  mutations: {
    setBoard(state, board) {
      state.board = board;
    }
  },
  actions: {
    async getBoard({ rootState, commit }) {
      const uid = rootState.userModule.user.uid;
      const defaultBoard = {
        name: "Your first board 🔥",
        id: uid,
        backgroundColor: "#FFFFFF"
      };

      let board = await db
        .collection("boards")
        .doc(uid)
        .get();

      if (!board.exists) {
        await db
          .collection("boards")
          .doc(uid)
          .set(defaultBoard);
        board = defaultBoard;
      } else {
        board = board.data();
      }

      commit("setBoard", board);
    },
    updateColumns(context, columns) {
      console.log(columns);
    },
    updateCards(context, { column, cards }) {
      console.log(column, cards);
    }
  }
};
