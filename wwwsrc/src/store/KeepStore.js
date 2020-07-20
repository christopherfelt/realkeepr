import { api } from "./AxiosService";

export const KeepStore = {
  state: {
    activeKeeps: [],
    activeKeepDetail: {},
  },
  mutations: {
    setActiveKeeps(state, keeps) {
      state.activeKeeps = keeps;
    },
    setActiveKeepDetail(state, keep) {
      state.activeKeepDetail = keep;
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
    async getKeepById({ commit, state }, keepId) {
      try {
        let activeKeep = state.activeKeeps.find((k) => k.id == keepId);
        console.log(activeKeep);
        if (activeKeep == undefined) {
          activeKeep = await api.get("keeps/" + keepId);
          activeKeep = activeKeep.data;
        }
        console.log("hello from keep id dispath");
        commit("setActiveKeepDetail", activeKeep);
      } catch (error) {
        console.error(error);
      }
    },
    async createNewKeep({ commit, dispatch }, newKeep) {
      try {
        let keepRes = await api.post("keeps", newKeep);
        newKeep.keepId = keepRes.data.id;
        let dtoRes = await api.post("vaultkeeps", newKeep);
        dispatch("getKeepsByVaultId", newKeep.vaultId);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
