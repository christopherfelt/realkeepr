<template>
  <div class="redditGenre">
    <div class="rounded text-center backButton" @click="goBackToGenresMenu">
      <i class="fas fa-chevron-left fa-xs"></i>
    </div>
    <div class="ml-4 mt-2 subredditsContainer">
      <h6 class="">{{ genre }}</h6>
      <div class="" v-for="sub in subreddits" :key="sub">
        <router-link
          :to="{ name: 'subredditDetail', params: { subreddit: sub } }"
        >
          <p
            class="m-0"
            @click="
              getSubredditVideos(sub);
              playVideoInNavPanel();
            "
          >
            {{ sub }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "redditGenre",
  mounted() {},
  data() {
    return {};
  },
  props: ["genre", "index"],
  computed: {
    subreddits() {
      return this.$store.state.RedditStore.subreddits[this.genre];
    },
  },
  methods: {
    goBackToGenresMenu() {
      this.$emit("backButtonClicked");
    },
    getSubredditVideos(subreddit) {
      this.$store.dispatch("getSubredditVideos", subreddit);
      this.$store.dispatch("resetReadyIndicators");
      this.$store.dispatch("changePlayVideoInNavPanelStatus", false);
    },
    playVideoInNavPanel() {
      console.log("from reddit genre");
    },
    // toggleNavPanel(){
    //   this.
    // }
  },
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../../../../../assets/_variables.scss";

.redditGenre {
  width: 250px;
}

@media screen and (max-width: 767.98px) {
  .redditGenre {
    width: 225px;
  }
}

.subredditsContainer {
  color: $deep-jungle-green;
  font-size: 13px;
  height: 60vh;
  overflow-y: auto;
}

.subredditsContainer::-webkit-scrollbar {
  width: 0.5em;
}

.subredditsContainer::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
}

.subredditsContainer::-webkit-scrollbar-thumb {
  /* background-color: darkgrey;
  outline: 1px solid slategrey; */
}
</style>
