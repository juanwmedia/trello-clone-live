import { createStore } from "vuex";
import boardModule from "./boardModule.js";
import userModule from "./userModule.js";

export default createStore({
  actions: {
    initApp({ dispatch }) {
      dispatch("boardModule/getBoard");
    }
  },
  modules: { boardModule, userModule }
});
