import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router";
import { KeepStore } from "./KeepStore";
import { VaultStore } from "./VaultStore";
import { PlaybackStore } from "./PlaybackStore";
import { RedditStore } from "./RedditStore";

Vue.use(Vuex);

let baseUrl = location.host.includes("localhost")
  ? "https://localhost:5001/"
  : "/";

let api = Axios.create({
  baseURL: baseUrl + "api/",
  timeout: 3000,
  withCredentials: true,
});

export default new Vuex.Store({
  state: {
    publicKeeps: [],
    playVideoInNavPanel: false,
    mobileNavPanelIsOpen: true,
  },
  mutations: {
    setPlayVideoInNavPanelStatus(state, playVideoInNavPanelValue) {
      state.playVideoInNavPanel = playVideoInNavPanelValue;
    },
  },
  actions: {
    setBearer({}, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    changePlayVideoInNavPanelStatus({ commit }, playVideoInNavPanelValue) {
      console.log("changePlayVideo status change");
      commit("setPlayVideoInNavPanelStatus", playVideoInNavPanelValue);
    },
    toggleMobileNavPanel({ commit }, mobileNavPanelStatus) {
      commit("changeMobileNavPanelStatus", mobileNavPanelStatus);
    },
  },
  modules: {
    KeepStore,
    VaultStore,
    PlaybackStore,
    RedditStore,
  },
});
