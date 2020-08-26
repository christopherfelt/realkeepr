<template>
  <div class="browse position-relative">
    <div
      class="animate__animated"
      :class="{
        animate__fadeInRight: firstBrowseMenuCreation,
        animate__fadeInLeft:
          mainBrowseMenuVisibilityStatus && !firstBrowseMenuCreation,
        animate__fadeOutLeft: !mainBrowseMenuVisibilityStatus,
        animate__fast: !mainBrowseMenuVisibilityStatus,
      }"
    >
      <ul class="nav flex-column nav-tab" id="myTab" role="tablist">
        <!-- <li class="nav-item">
          <a
            class="nav-link py-0"
            data-toggle="tab"
            role="tab"
            href="#musaic-community"
            @click="changeVisibilityStatus()"
            >Musaic Community</a
          >
        </li> -->
        <li class="nav-item">
          <a
            class="nav-link py-0"
            data-toggle="tab"
            role="tab"
            href="#reddit"
            @click="changeVisibilityStatus()"
            >Reddit Music</a
          >
        </li>
        <li class="nav-item">
          <a
            class="nav-link py-0"
            data-toggle="tab"
            role="tab"
            href="#mtv-news"
            @click="changeVisibilityStatus()"
            >MTV News</a
          >
        </li>
      </ul>
    </div>
    <div
      class="tab-content position-absolute animate__animated position-zero"
      :class="{
        animate__fadeInRight: tabsPanelsVisibilityStatus,
        animate__faster: !tabsPanelsVisibilityStatus,
        animate__fadeOutRight: !tabsPanelsVisibilityStatus,
      }"
      id="myTabContent"
    >
      <div
        class="tab-pane fade "
        id="musaic-community"
        role="tabpanel"
        aria-labelledby="muscaic-tab"
      >
        Musaic Tags
      </div>
      <div
        class="tab-pane fade"
        :class="{}"
        id="reddit"
        role="tabpanel"
        aria-labelledby="reddit-tab"
      >
        <RedditGenres @backButtonClick="changeVisibilityStatusBack" />
      </div>
      <div
        class="tab-pane fade"
        :class="{}"
        id="mtv-news"
        role="tabpanel"
        aria-labelledby="mtv-news-tab"
      >
        Mtv News
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";
import RedditGenres from "@/components/navpanelComponents/redditGenres.vue";
export default {
  name: "browse",
  mounted() {
    // this.changeVisibilityStatus();
  },
  data() {
    return {
      firstBrowseMenuCreation: true,
      mainBrowseMenuVisibilityStatus: true,
      tabsPanelsVisibilityStatus: false,
    };
  },
  computed: {},
  methods: {
    changeVisibilityStatus() {
      this.firstBrowseMenuCreation = false;
      this.mainBrowseMenuVisibilityStatus = false;
      this.tabsPanelsVisibilityStatus = true;
    },
    changeVisibilityStatusBack() {
      this.tabsPanelsVisibilityStatus = false;
      this.mainBrowseMenuVisibilityStatus = true;
    },
  },
  components: {
    RedditGenres,
  },
};
</script>

<style scoped>
.position-zero {
  top: 0;
  left: 0;
}
</style>
