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
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getAllPublicKeeps({ commit, dispatch }) {
      try {
        let res = await api.get("keeps");
        commit("setActiveKeeps", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async createNewKeep({ commit, dispatch }, newKeep) {
      try {
        let keepRes = await api.post("keeps", newKeep);
        newKeep.keepId = keepRes.data.id;
        let dtoRes = await api.post("vaultkeeps", newKeep);
        console.log(keepRes.data, dtoRes.data);
        // dispatch("")
      } catch (error) {
        console.error(error);
      }
    },
  },
};
