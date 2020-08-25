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
      class="animate__animated"
      :class="{
        animate__fadeInDown: playVideoInNavPanel,
        animate__fadeInUp: !playVideoInNavPanel,
      }"
    >
      <NavPanelVideos />
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
            id="distractions-tab"
            data-toggle="tab"
            href="#distractions"
            role="tab"
            aria-controls="distractions"
            aria-selected="false"
            >Distractions</a
          >
        </li>
        <li class="nav-item" role="presentation">
          <a
            class="nav-link"
            id="distractions-tab"
            data-toggle="tab"
            href="#distractions"
            role="tab"
            aria-controls="distractions"
            aria-selected="false"
            >Dashboard</a
          >
        </li>
      </ul>
    </div>

    <div
      class="d-flex justify-content-center p-1 animate__animated animate__fadeInUp"
    >
      <ul class="nav nav-pills" id="pills-tab" role="tablist">
        <li class="nav-item pill-style m-1">
          <a
            class="nav-link p-1"
            id="pills-browse-tab"
            data-toggle="pill"
            href="#pills-browse"
            role="tab"
            aria-controls="pills-browse"
            aria-selected="true"
          >
            <small> Browse </small>
          </a>
        </li>
        <li class="nav-item pill-style m-1">
          <a
            class="nav-link p-1"
            id="pills-search-tab"
            data-toggle="pill"
            href="#pills-search"
            role="tab"
            aria-controls="pills-search"
            aria-selected="false"
          >
            <small>Search</small></a
          >
        </li>
        <li class="nav-item pill-style m-1 ">
          <a
            class="nav-link p-1"
            id="pills-dashboard-tab"
            data-toggle="pill"
            href="#pills-dashboard"
            role="tab"
            aria-controls="pills-dashboard"
            aria-selected="false"
          >
            <small v-if="$auth.isAuthenticated">Dashboard</small>
            <small v-else> Login </small>
          </a>
        </li>
      </ul>
    </div>
    <div class="d-flex justify-content-start ml-5">
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane"
          id="pills-browse"
          role="tabpanel"
          aria-labelledby="pills-browse-tab"
        >
          <Browse />
        </div>
        <div
          class="tab-pane fade"
          id="pills-search"
          role="tabpanel"
          aria-labelledby="pills-search-tab"
        >
          <Search />
        </div>
        <div
          class="tab-pane fade"
          id="pills-dashboard"
          role="tabpanel"
          aria-labelledby="pills-dashboard-tab"
        >
          <DashboardPanel />
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import Playback from "@/components/playback.vue";
import NavpanelVaultList from "@/components/navpanelVaultList.vue";
import Browse from "@/components/navpanelComponents/browse.vue";
import Search from "@/components/navpanelComponents/search.vue";
import DashboardPanel from "@/components/navpanelComponents/dashboardPanel.vue";
import SubredditPostCard from "@/components/subredditPostCard.vue";
import NavPanelVideos from "@/components/navpanelComponents/navPanelVideos.vue";
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
    Playback,
    NavpanelVaultList,
    Browse,
    Search,
    DashboardPanel,
    SubredditPostCard,
    NavPanelVideos,
  },
};
</script>

<style lang="scss">
@import "../assets/_variables.scss";

@font-face {
  font-family: "ailerons";
  src: url("../assets/fonts/ailerons/Ailerons-Regular.otf");
}

@font-face {
  font-family: "anurati";
  src: url("../assets/fonts/anurati/Anurati-Regular.otf");
}

@font-face {
  font-family: "nordic";
  src: url("../assets/fonts/nordic/nordic.ttf");
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
  font-size: 11px;
}
</style>
