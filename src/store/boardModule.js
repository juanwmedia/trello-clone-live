// import { board, columns, cards } from "@/seed.js";
import { db } from "@/firebase.js";
import { useStore } from "vuex";

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
      Math.max(...state.columns.map(column => column.order)) + 1,
    getNextCardOrder: state =>
      Math.max(...state.cards.map(card => card.order)) + 1
  },
  mutations: {
    setBoard(state, board) {
      state.board = board;
    },
    setColumns(state, columns) {
      state.columns = columns;
    },
    setCards(state, cards) {
      state.cards = cards;
    }
  },
  actions: {
    // Board actions
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

    // Column actions
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

    updateColumns({ dispatch }, columns) {
      columns.forEach((column, index) => {
        if (column.order !== index) {
          column.order = index;
          dispatch("updateColumnOrder", column);
        }
      });
    },

    async updateColumnOrder(context, column) {
      await db
        .collection("columns")
        .doc(column.id)
        .update({ order: column.order });
    },

    async updateColumnName(context, { id, name }) {
      await db
        .collection("columns")
        .doc(id)
        .update({ name });
    },

    async deleteColumn(contex, id) {
      await db
        .collection("columns")
        .doc(id)
        .delete();
    },

    // Card actions
    async getCards({ commit, rootState }) {
      await db
        .collection("cards")
        .where("board", "==", rootState.userModule.user.uid)
        .onSnapshot(doSnapshot);

      function doSnapshot(querySnapshot) {
        const cards = [];
        querySnapshot.forEach(doc => {
          cards.push(doc.data());
        });
        commit("setCards", cards);
      }
    },

    async createCard({ rootState, state, getters }, column) {
      const ref = db.collection("cards");
      const { id } = ref.doc();
      const card = {
        name: "New Card",
        description: "This is a Card description",
        id,
        board: rootState.userModule.user.uid,
        column,
        date: new Date().getTime() + 5 * 24 * 60 * 60 * 1000,
        done: false,
        order: state.cards.length ? getters["getNextCardOrder"] : 0
      };
      await ref.doc(id).set(card);
    },

    async updateCardMeta(context, card) {
      await db
        .collection("cards")
        .doc(card.id)
        .update({ order: card.order, column: card.column });
    },

    checkCard({ state }, id) {
      const store = useStore();
      return new Promise((resolve, reject) => {
        // Buscamos localmente en el estado
        if (state.cards.length) {
          findCard();
        } else {
          const unsubscribe = store.subscribe(mutation => {
            if (mutation.type === "boardModule/setCards") {
              findCard();
              unsubscribe();
            }
          });
        }

        function findCard() {
          const card = state.cards.find(card => card.id === id);
          if (card) {
            resolve(card);
          } else {
            reject("Card not found");
          }
        }
      });
    },

    updateCards({ dispatch }, { column, cards }) {
      cards.forEach((card, index) => {
        if (card.order !== index || card.column !== column.id) {
          card.order = index;
          card.column = column.id;
          dispatch("updateCardMeta", card);
        }
      });
    },

    async updateCard(context, card) {
      const [id, key, value] = Object.values(card);
      await db
        .collection("cards")
        .doc(id)
        .update({ [key]: value });
    }
  }
};
