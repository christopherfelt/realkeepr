import Vue from "vue";
import axios from "axios";
import router from "../router";
import rp from "../../ResponseProcessing";

let gl = require("../../genrelist.json");

let allSubreddits = [];
for (const key in gl) {
  allSubreddits.push(...gl[key]);
}

const api = axios.create({
  baseURL: "https://www.reddit.com/r/",
  timeout: 3000,
});

export const RedditStore = {
  state: {
    genres: [
      "Any",
      "Classical",
      "Electronic",
      "Hip-hop",
      "Rock",
      "Decades",
      "Culture",
      "Artist-Band",
      "Redditor-made",
      "Instrument",
      "Community",
      "Other",
    ],
    subreddits: [],
    activeSubredditPosts: [],
    readyIndicators: 0,
    allSubreddits: allSubreddits,
  },
  mutations: {
    setSubreddits(state, data) {
      Vue.set(state.subreddits, data.id, data.data);
    },
    setActiveSubredditPosts(state, data) {
      state.activeSubredditPosts = data;
    },
    resetReadyIndicators(state) {
      state.readyIndicators = 0;
    },
    updateReadyStatus(state) {
      // Vue.set(state.readyIndicators, index, true);
      console.log("Number Ready: ", state.readyIndicators);
      state.readyIndicators = state.readyIndicators + 1;
    },
  },
  getters: {
    videosReady: (state) => {
      return state.activeSubredditPosts.length <= state.readyIndicators;
    },
  },
  actions: {
    getSubredditsByGenre({ commit, dispatch }) {
      let keys = Object.keys(gl);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let subredditsList = gl[key];
        // console.log("Key: ", key, " List: ", subredditsList);
        commit("setSubreddits", { id: key, data: subredditsList });
      }
    },
    resetReadyIndicators({ commit }) {
      commit("resetReadyIndicators");
    },
    updateReadyStatus({ commit }) {
      commit("updateReadyStatus");
    },
    async getSubredditVideos({ commit, dispatch }, subreddit) {
      try {
        let res = await api.get(subreddit + "/hot.json?limit=25");
        let result = rp.processResponseURls(res.data.data.children);
        console.log("subreddit videos");
        commit("setActiveSubredditPosts", result[0]);
        // commit("setCurrentPlaylist", subreddit);
        commit("changeCurrentPlayingVideoNumber", 0, { root: true });
        commit("changePlayBackState", "", { root: true });
      } catch (error) {
        console.error(error);
      }
    },
  },
};
