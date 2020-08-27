<template>
  <div class="progressIndicator ">
    <div class=" d-flex flex-wrap position-absolute">
      <div
        v-for="p in subredditPosts"
        :key="p"
        class="indicator-box total mr-1 mt-1"
      ></div>
    </div>
    <div class=" d-flex flex-wrap position-absolute">
      <div
        v-for="r in readyIndicators"
        :key="r"
        class="indicator-box complete mr-1 mt-1"
      ></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "progressIndicator",
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
  },
  methods: {},
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../../assets/_variables.scss";

.indicator-box {
  height: 10px;
  width: 10px;
  /* background-color: black; */
  border-radius: 15%;
}

.total {
  background-color: $light-blue;
}

.complete {
  background-color: black;
}
</style>
