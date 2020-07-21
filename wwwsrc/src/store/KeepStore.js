import { api } from "./AxiosService";

export const KeepStore = {
  state: {
    activeKeeps: [],
    activeKeepDetail: {},
    activeUserKeeps: [],
  },
  mutations: {
    setActiveKeeps(state, keeps) {
      state.activeKeeps = keeps;
    },
    setActiveKeepDetail(state, keep) {
      state.activeKeepDetail = keep;
    },
    setActiveUserKeeps(state, keeps) {
      state.activeUserKeeps = keeps;
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
    async getAllUserKeeps({ commit, dispatch }) {
      try {
        let res = await api.get("keeps/user");
        commit("setActiveUserKeeps", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async getKeepById({ commit, state }, keepId) {
      try {
        let activeKeep = state.activeKeeps.find((k) => k.id == keepId);
        if (activeKeep == undefined) {
          activeKeep = await api.get("keeps/" + keepId);
          activeKeep = activeKeep.data;
        }

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
    async editKeep({ commit, state }, editKeep) {
      try {
        let res = await api.put("keeps/" + editKeep.id, editKeep);
        state.name = editKeep.name;
        state.description = editKeep.description;
        state.img = editKeep.img;
        state.isPrivate = editKeep.isPrivate;
        commit("setActiveKeepDetail", state);
      } catch (error) {
        console.error(error);
      }
    },
    async addKeepToVault({ commit }, dto) {
      try {
        let res = await api.post("vaultkeeps/", dto);
      } catch (error) {
        console.error(error);
      }
    },
    async removeKeepFromVault({ commit }, dto) {
      try {
        let res = await api.delete(
          "vaultkeeps/" + dto.keepId + "/" + dto.vaultId
        );
      } catch (error) {
        console.error(error);
      }
    },
  },
};
