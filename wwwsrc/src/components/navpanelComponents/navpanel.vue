<template>
  <nav id="sidebar" class="">
    <div class="sidebar-header m-3 d-flex justify-content-center">
      <h1 class="anurati musaic-logo cursor-pointer" @click="routeToRandom">
        MUS<span class="musaic-logo-a mr-2">A</span><span class="mr-2">I</span>C
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

.musaic-logo {
  color: $rich-black-FOGRA-29;
}

.musaic-logo-a {
  color: $shadow-blue;
}

.cursor-pointer {
  cursor: pointer;
}

.main-tab {
  font-size: 12px;
}

.nav-tabs .nav-item.show .nav-link,
.nav-tabs .nav-link.active {
  background-color: $alice-blue;
  border-bottom: 1px solid $alice-blue;
}
</style>
