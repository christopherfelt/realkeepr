<template>
  <div class="navPanelVideos">
    <NavPanelVideo
      v-for="(subredditId, index) in subredditPosts"
      :key="index"
      :subredditId="subredditId"
      :index="index"
    />
  </div>
</template>

<script>
import NavPanelVideo from "./navPanelVideo.vue";
export default {
  name: "navPanelVideos",
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
    NavPanelVideo,
  },
};
</script>

<style scoped></style>
