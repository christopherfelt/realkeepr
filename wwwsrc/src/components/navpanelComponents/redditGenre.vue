<template>
  <div class="redditGenre">
    <div class="rounded text-center backButton" @click="goBackToGenresMenu">
      <i class="fas fa-chevron-left fa-xs"></i>
    </div>
    <div class="ml-4 mt-2 genresContainer">
      <h6 class="">{{ genre }}</h6>
      <div class="" v-for="sub in subreddits" :key="sub">
        <router-link
          :to="{ name: 'subredditDetail', params: { subreddit: sub } }"
        >
          <p class="m-0">{{ sub }}</p>
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
  },
  components: {},
};
</script>

<style scoped>
.backButton {
  color: #6f9b98;
  width: 18px;
  height: 18px;
  transition-duration: 500ms;
  cursor: pointer;
}

.backButton:hover {
  color: #1c3534;
}

.genresContainer {
  color: #155f59;
  font-size: 13px;
  height: 60vh;
  overflow-y: auto;
}

.genresContainer::-webkit-scrollbar {
  width: 0.5em;
}

.genresContainer::-webkit-scrollbar-track {
  /* box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3); */
}

.genresContainer::-webkit-scrollbar-thumb {
  /* background-color: darkgrey;
  outline: 1px solid slategrey; */
}
</style>
