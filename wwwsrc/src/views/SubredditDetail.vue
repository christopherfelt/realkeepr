<template>
  <div
    class="subreddit-detail-container container-fluid p-3 animate__animated animate__fast animate__fadeIn"
  >
    <h1 class="ailerons text-center ">
      {{ $route.params.subreddit }}
    </h1>
    <!-- <h2>Videos Ready: {{ readyIndicators }}</h2>
    <h2>Number of Video: {{ subredditPosts.length }}</h2>
    <h2>Videos Ready Indicator: {{ videosReady }}</h2> -->
    <div
      class="d-flex justify-content-center animate__animated animate__fadeIn"
      :class="{ animate__fadeOut: videosReady }"
    >
      <div>
        <div class="spinner-border " role="status">
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </div>
    <div
      class="row d-flex justify-content-center mt-1 animate__animated animate__fadeIn"
      :class="{ animate__fadeOut: videosReady }"
    >
      <div class="col-2">
        <ProgressIndicator />
      </div>
    </div>

    <div class="row">
      <div
        class="col d-flex justify-content-center flex-wrap animate__animated animate__fast animate__fadeIn"
        :class="{ animate__fadeOut: !videosReady }"
        v-show="videosReady"
      >
        <SubredditPostCard
          v-for="(subredditId, index) in subredditPosts"
          :key="subredditId"
          :subredditId="subredditId"
          :index="index"
        />
        <!-- <div
          class="w-100 animate__animated animate__fadeIn"
          :class="{ animate__fadeOut: !videosReady }"
          v-show="videosReady"
        >
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import SubredditPostCard from "@/components/subredditPostCard";
import ProgressIndicator from "@/components/utilities/progressIndicator";
export default {
  name: "subredditDetail",
  mounted() {
    // this.$store.dispatch("getSubredditVideos", this.$route.params.subreddit);
    this.$store.dispatch("resetReadyIndicators");
  },
  data() {
    return {};
  },
  computed: {
    subredditPosts() {
      return this.$store.state.RedditStore.activeSubredditPosts;
    },
    readyIndicators() {
      return this.$store.state.RedditStore.readyIndicators;
    },
    videosReady() {
      return this.$store.getters.videosReady;
      // return false;
    },
  },
  methods: {},
  components: {
    SubredditPostCard,
    ProgressIndicator,
  },
};
</script>

<style scoped>
.subreddit-detail-container {
  position: absolute;
  top: 0;
  left: 18%;
  width: 80%;
  height: auto;
  /* border: 5px solid red; */
}

/* * {
  border: 1px solid red;
} */
</style>
