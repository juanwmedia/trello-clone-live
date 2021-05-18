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
    getColumns: state => state.columns.sort((a, b) => a.order - b.order),
    getCardsByColumn: state => column =>
      state.cards
        .filter(card => card.column === column)
        .sort((a, b) => a.order - b.order),
    getNextColumnOrder: state =>
      Math.max(...state.columns.map(column => column.order)) + 1
  },
  mutations: {
    setBoard(state, board) {
      state.board = board;
    },
    setColumns(state, columns) {
      state.columns = columns;
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

    async getColumns({ commit, rootState }) {
      await db
        .collection("columns")
        .where("board", "==", rootState.userModule.user.uid)
        .onSnapshot(doSnapshot);

      function doSnapshot(querySnapshot) {
        const columns = [];
        querySnapshot.forEach(doc => {
          columns.push(doc.data());
        });
        commit("setColumns", columns);
      }
    },

    async createColumn({ rootState, state, getters }) {
      const ref = db.collection("columns");
      const { id } = ref.doc();
      const column = {
        name: "New Column",
        id,
        board: rootState.userModule.user.uid,
        order: state.columns.length ? getters["getNextColumnOrder"] : 0
      };
      await ref.doc(id).set(column);
    },

    updateColumns(context, columns) {
      console.log(columns);
    },
    async updateColumnName(context, { id, name }) {
      await db
        .collection("columns")
        .doc(id)
        .update({ name });
    },

    updateCards(context, { column, cards }) {
      console.log(column, cards);
    }
  }
};
