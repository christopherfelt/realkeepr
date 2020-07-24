<template>
  <div
    class="subreddit-detail-container container-fluid p-3 animate__animated animate__fast animate__fadeIn"
  >
    <h1 class="ailerons text-center ">
      {{ $route.params.subreddit }}
    </h1>

    <div class="row d-flex justify-content-center">
      <div class="col">
        <div class="keep-container">
          <SubredditPostCard
            v-for="(subredditId, index) in subredditPosts"
            :key="subredditId"
            :subredditId="subredditId"
            :index="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SubredditPostCard from "@/components/subredditPostCard";
export default {
  name: "subredditDetail",
  mounted() {
    this.$store.dispatch("getSubredditVideos", this.$route.params.subreddit);
  },
  data() {
    return {};
  },
  computed: {
    subredditPosts() {
      return this.$store.state.RedditStore.activeSubredditPosts;
    },
  },
  methods: {},
  components: {
    SubredditPostCard,
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
</style>
