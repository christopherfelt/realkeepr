import { api, setBearer, resetBearer } from "./AxiosService";

export const VaultStore = {
  state: {
    activeVaults: [],
    activeVaultDetail: {},
  },
  mutations: {
    setActiveVaults(state, vaults) {
      state.activeVaults = vaults;
    },
    setActiveVaultDetail(state, activeVault) {
      state.activeVaultDetail = activeVault;
    },
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
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
    setActiveVaultDetail({ commit, state }, vaultId) {
      let activeVault = state.activeVaults.find((v) => v.id == vaultId);
      commit("setActiveVaultDetail", activeVault);
    },
    //   async getKeepsByVaultId({ commit, dispatch }, vaultId) {
    //     try {
    //         let res = await api.get(`vault/${vaultId}/keeps`);
    //         commit("setActive")
    //     } catch (error) {

    //     }
    // }
  },
};
