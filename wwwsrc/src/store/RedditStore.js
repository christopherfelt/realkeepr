import Vue from "vue";
import axios from "axios";
import router from "../router";
import rp from "../../ResponseProcessing";

let gl = require("../../genrelist.json");

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
  },
  mutations: {
    setSubreddits(state, data) {
      console.log("in mutionat");
      console.log(data);
      Vue.set(state.subreddits, data.id, data.data);
    },
    setActiveSubredditPosts(state, data) {
      state.activeSubredditPosts = data;
    },
  },
  actions: {
    getSubredditsByGenre({ commit, dispatch }) {
      console.log("in action");
      let keys = Object.keys(gl);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let subredditsList = gl[key];
        // console.log("Key: ", key, " List: ", subredditsList);
        commit("setSubreddits", { id: key, data: subredditsList });
      }
    },
    async getSubredditVideos({ commit, dispatch }, subreddit) {
      try {
        let res = await api.get(subreddit + "/hot.json?limit=50");
        let result = rp.processResponseURls(res.data.data.children);
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
