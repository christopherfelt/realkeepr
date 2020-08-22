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
    <Playback />
    <div
      class="d-flex justify-content-center p-1 mt-3 animate__animated animate__fadeInUp"
    >
      <ul class="nav nav-pills" id="pills-tab" role="tablist">
        <li class="nav-item pill-style m-1">
          <a
            class="nav-link p-1"
            id="pills-home-tab"
            data-toggle="pill"
            href="#pills-home"
            role="tab"
            aria-controls="pills-home"
            aria-selected="true"
          >
            <small> Browse </small>
          </a>
        </li>
        <li class="nav-item pill-style m-1">
          <a
            class="nav-link p-1"
            id="pills-profile-tab"
            data-toggle="pill"
            href="#pills-profile"
            role="tab"
            aria-controls="pills-profile"
            aria-selected="false"
          >
            <small>Search</small></a
          >
        </li>
        <li class="nav-item pill-style m-1 ">
          <a
            class="nav-link p-1"
            id="pills-contact-tab"
            data-toggle="pill"
            href="#pills-about"
            role="tab"
            aria-controls="pills-contact"
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
          id="pills-home"
          role="tabpanel"
          aria-labelledby="pills-home-tab"
        >
          <Browse />
        </div>
        <div
          class="tab-pane fade"
          id="pills-profile"
          role="tabpanel"
          aria-labelledby="pills-profile-tab"
        >
          <Search />
        </div>
        <div
          class="tab-pane fade"
          id="pills-about"
          role="tabpanel"
          aria-labelledby="pills-contact-tab"
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
import "animate.css";
export default {
  name: "NavPanel",
  data() {
    return {
      fadeStatus: false,
      renderList: false,
    };
  },
  computed: {},
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
</style>
