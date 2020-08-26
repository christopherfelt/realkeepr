<template>
  <div class="searchComponent">
    <!-- <h1>search is live</h1> -->
    <div class="animate__animated animate__fadeInUp">
      <input
        class="searchInput"
        type="text"
        v-model="searchInput"
        v-on:input="searchSubreddits"
      />
    </div>
    <div class="ml-4 mt-2 genresContainer">
      <div
        class="animate__animated animate__fadeInUp"
        v-for="(sub, index) in searchResults"
        :key="index"
      >
        <router-link
          :to="{ name: 'subredditDetail', params: { subreddit: sub } }"
        >
          <p class="m-0" @click="getSubredditVideos(sub)">
            {{ sub }}
          </p>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "searchComponent",
  data() {
    return {
      searchInput: "",
      searchResults: [],
    };
  },
  computed: {
    allSubreddits() {
      return this.$store.state.RedditStore.allSubreddits;
    },
  },
  methods: {
    searchSubreddits() {
      let tempSearchResults = this.allSubreddits.filter((a) =>
        a.includes(this.searchInput)
      );
      if (tempSearchResults.length == 0) {
        this.searchResults = ["no_results"];
      } else {
        this.searchResults = tempSearchResults;
      }
    },
    getSubredditVideos(subreddit) {
      this.$store.dispatch("getSubredditVideos", subreddit);
      this.$store.dispatch("resetReadyIndicators");
    },
  },
  components: {},
};
</script>

<style scoped>
.searchInput {
  /* opacity: 90%; */
  background-color: #f4f5f6;
  border: none;
  border-bottom: 0.5px solid #155f5956;
  color: #155f59;
}

.searchInput[type="text"]:focus {
  background-color: #f4f5f6;
  outline: none;
  border: none;
  border-bottom: 1px solid #155f5956;
  color: #155f59;
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
</style>
