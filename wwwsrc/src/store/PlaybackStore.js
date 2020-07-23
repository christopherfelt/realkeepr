import { api, setBearer, resetBearer } from "./AxiosService";
import router from "../router";

export const PlaybackStore = {
  state: {
    playBackState: "stopped",
    currentlyPlayingVideo: 0,
  },
  mutations: {
    changePlayBackState(state, playBackState) {
      state.playBackState = playBackState;
    },
    changeCurrentPlayingVideoNumber(state, songNumber) {
      state.currentlyPlayingVideo = songNumber;
    },
  },
  actions: {
    setBearer({ commit }, bearer) {
      api.defaults.headers.authorization = bearer;
    },
    resetBearer() {
      api.defaults.headers.authorization = "";
    },
    changePlayBackState({ commit, dispatch }, playBackState) {
      commit("changePlayBackState", playBackState);
    },
    setCurrentPlayingVideo({ commit, dispatch }, playlistIndex) {
      commit("changeCurrentPlayingVideoNumber", playlistIndex);
    },
    changeSong({ commit, dispatch }, songNumber) {
      commit("changeCurrentPlayingVideoNumber", songNumber);
      commit("changePlayBackState", "playing");
    },
  },
};
