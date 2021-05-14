import { createStore } from "vuex";
import boardModule from "./boardModule.js";
import userModule from "./userModule.js";

export default createStore({
  actions: {
    initApp({ dispatch }) {
      dispatch("boardModule/getBoard");
      dispatch("boardModule/getColumns");
    }
  },
  modules: { boardModule, userModule }
});
