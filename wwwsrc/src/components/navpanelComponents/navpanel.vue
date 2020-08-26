<template>
  <nav id="sidebar" class="bg-panel">
    <div class="sidebar-header m-3 d-flex justify-content-center">
      <h1 class="anurati heading-1-color cursor-pointer" @click="routeToRandom">
        MUS<span class="heading-4-color mr-2">A</span
        ><span class="mr-2">I</span>C
      </h1>
    </div>
    <!-- <button class="btn btn-primary" @click="toggleMobileNavPanel">
      close
    </button> -->
    <div
      v-show="playVideoInNavPanel"
      class="animate__animated "
      :class="{
        animate__fadeInDown: playVideoInNavPanel,
        animate__fadeInUp: !playVideoInNavPanel,
      }"
    >
      <div class="d-flex justify-content-center">
        <NavPanelVideos />
      </div>
    </div>
    <Playback />

    <div
      class="d-flex justify-content-center p-1  animate__animated animate__fadeInUp"
    >
      <ul class="nav nav-tabs main-tab" id="myTab" role="tablist">
        <li class="nav-item" role="presentation">
          <a
            class="nav-link active"
            id="music-tab"
            data-toggle="tab"
            href="#music"
            role="tab"
            aria-controls="music"
            aria-selected="true"
            >Music</a
          >
        </li>
        <li class="nav-item" role="presentation">
          <a
            class="nav-link"
            id="idles-tab"
            data-toggle="tab"
            href="#idles"
            role="tab"
            aria-controls="idles"
            aria-selected="false"
            >Idles</a
          >
        </li>
        <li class="nav-item" role="presentation">
          <a
            class="nav-link"
            id="dashboard-tab"
            data-toggle="tab"
            href="#dashboard"
            role="tab"
            aria-controls="dashboard"
            aria-selected="false"
            >Dashboard</a
          >
        </li>
      </ul>
    </div>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane fade show active"
        id="music"
        role="tabpanel"
        aria-labelledby="music-tab"
      >
        <MainMusic />
      </div>
      <div
        class="tab-pane fade"
        id="idles"
        role="tabpanel"
        aria-labelledby="idles-tab"
      >
        <h6>Idle Stuff</h6>
      </div>
      <div
        class="tab-pane fade"
        id="dashboard"
        role="tabpanel"
        aria-labelledby="dashboard-tab"
      >
        <DashboardPanel />
      </div>
    </div>
  </nav>
</template>

<script>
import NavPanelVideos from "@/components/navpanelComponents/navpanelVideo/navPanelVideos.vue";
import Playback from "@/components/navpanelComponents/playback/playback.vue";
import MainMusic from "@/components/navpanelComponents/music/mainMusic.vue";
import DashboardPanel from "@/components/navpanelComponents/dashboard/dashboardPanel.vue";
import "animate.css";
export default {
  name: "NavPanel",
  data() {
    return {
      fadeStatus: false,
      renderList: false,
    };
  },
  computed: {
    playVideoInNavPanel() {
      return this.$store.state.playVideoInNavPanel;
    },
  },
  methods: {
    routeToDashboard() {
      this.$router.push({ name: "dashboard" });
    },
    routeToRandom() {
      this.$store.dispatch("getSubredditVideos", "listentothis");
      this.$store.dispatch("resetReadyIndicators");
      this.$router.push({
        name: "subredditDetail",
        params: { subreddit: "listentothis" },
      });
    },
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
    toggleMobileNavPanel() {
      this.$emit("backButtonClick");
    },
  },
  components: {
    NavPanelVideos,
    Playback,
    MainMusic,
    DashboardPanel,
  },
};
</script>

<style lang="scss">
@import "../../assets/_variables.scss";

@font-face {
  font-family: "ailerons";
  src: url("../../assets/fonts/ailerons/Ailerons-Regular.otf");
}

@font-face {
  font-family: "anurati";
  src: url("../../assets/fonts/anurati/Anurati-Regular.otf");
}

@font-face {
  font-family: "nordic";
  src: url("../../assets/fonts/nordic/nordic.ttf");
}

.bg-panel {
  background-color: $body-bg;
}

.heading-1-color {
  color: $heading-1;
}

.heading-2-color {
  color: $heading-2;
}

.heading-3-color {
  color: $heading-3;
}

.heading-4-color {
  color: $heading-4;
}

.a-in-title {
  color: $a-in-title;
}

.ailerons {
  font-family: "ailerons", sans-serif;
}

.anurati {
  font-family: "anurati", sans-serif;
}

.nordic {
  font-family: "nordic", sans-serif;
}

.remove-underline {
  text-decoration: none;
}
.remove-underline:hover {
  text-decoration: none;
}

.cursor-pointer {
  cursor: pointer;
}

.main-tab {
  font-size: 12px;
}

.displayNone {
  display: none;
}
</style>
