import { api, setBearer, resetBearer } from "./AxiosService";

export const VaultStore = {
  state: {
    activeVaults: [],
    activeVaultDetail: {},
    authToken: {},
  },
  mutations: {
    setActiveVaults(state, vaults) {
      state.activeVaults = vaults;
    },
    setActiveVaultDetail(state, activeVault) {
      state.activeVaultDetail = activeVault;
    },
    setAuthToken(state, authToken) {
      console.log("auth token", authToken);
      state.authToken = authToken;
    },
  },
  actions: {
    setBearer({ commit }, bearer) {
      api.defaults.headers.authorization = bearer;
      commit("setAuthToken", bearer);
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    async getAllUserVaults({ commit, dispatch }) {
      try {
        let res = await api.get("vaults");
        commit("setActiveVaults", res.data);
      } catch (error) {
        console.error(error);
      }
    },
    async setActiveVaultDetail({ commit, state }, vaultId) {
      let activeVault = state.activeVaults.find((v) => v.id == vaultId);
      if (activeVault == undefined) {
        activeVault = await api.get(`vaults/${vaultId}`);
        activeVault = activeVault.data;
      }
      commit("setActiveVaultDetail", activeVault);
    },
    async getKeepsByVaultId({ commit, dispatch }, vaultId) {
      try {
        let res = await api.get(`vaults/${vaultId}/keeps`);
        commit("setActiveKeeps", res.data, { root: true });
      } catch (error) {
        console.error(error);
      }
    },
    // async addKeepToVault({ commit, dispatch }, dtoData) {
    //   try {
    //     let res = await api.get()
    //   } catch (error) {

    //   }
    // }
  },
};