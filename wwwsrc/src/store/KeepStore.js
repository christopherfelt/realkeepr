import { api } from "./AxiosService";

export const KeepStore = {
  state: {
    activeKeeps: [],
  },
  mutations: {
    setActiveKeeps(state, keeps) {
      state.activeKeeps = keeps;
    },
  },
  actions: {
    async getAllPublicKeeps({ commit, dispatch }) {
      try {
        let res = await api.get("keeps");
        commit("setActiveKeeps", res.data);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
