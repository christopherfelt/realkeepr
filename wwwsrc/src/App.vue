<template>
  <div id="app">
    <div>
      <div class="navpanel" :class="{ openNavPanel: navPanelIsOpen }">
        <navpanel @backButtonClick="toggleNavPanel" />
      </div>
      <div class="details">
        <button
          class="btn btn-primary m-1 d-sm-block d-md-none"
          @click="toggleNavPanel"
        >
          <span class="anurati">M</span>
        </button>
        <router-view />
        <div
          class="overlay d-sm-block d-md-none animate__animated"
          :class="{
            animate__fadeIn: navPanelIsOpen,
            animate__fadeOut: !navPanelIsOpen,
            displayNone: !navPanelIsOpen,
          }"
          @click="toggleNavPanel"
        ></div>
      </div>
    </div>
    <AddKeepModal />
    <EditKeepModal />
    <AddVaultModal />
    <AddKeepToVaultModal />
    <DeleteConfirmationModal />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import Navpanel from "@/components/navpanelComponents/navpanel";
import SubredditDetail from "@/views/SubredditDetail.vue";
import { onAuth } from "@bcwdev/auth0-vue";

import AddKeepModal from "@/components/modals/addKeepModal";
import EditKeepModal from "@/components/modals/editKeepModal";
import AddVaultModal from "@/components/modals/addVaultModal";
import AddKeepToVaultModal from "@/components/modals/addKeepToVaultModal";
import DeleteConfirmationModal from "@/components/modals/deleteConfirmationModal";

import "animate.css";

export default {
  name: "App",
  async beforeCreate() {
    await onAuth();
    this.$store.dispatch("setBearer", this.$auth.bearer);
    this.$store.dispatch("getAllUserVaults");
  },
  mounted() {
    this.$router.push({
      name: "subredditDetail",
      params: { subreddit: "listentothis" },
    });
    this.$store.dispatch("getSubredditVideos", this.$route.params.subreddit);
  },
  data() {
    return {
      navPanelIsOpen: true,
    };
  },
  computed: {
    navPanelIsOpen() {
      return this.$store.State.mobileNavPanelIsOpen;
    },
  },
  methods: {
    toggleNavPanel() {
      this.$store.dispatch("toggleMobileNavPanel", true);
    },
  },
  components: {
    Navbar,
    Navpanel,
    AddKeepModal,
    AddVaultModal,
    AddKeepToVaultModal,
    EditKeepModal,
    DeleteConfirmationModal,
    SubredditDetail,
  },
};
</script>

<style lang="scss">
@import "./assets/_variables.scss";
@import "./assets/_overrides.scss";

@font-face {
  font-family: "anurati";
  src: url("assets/fonts/anurati/Anurati-Regular.otf");
}
.anurati {
  font-family: "anurati", sans-serif;
}

@font-face {
  font-family: "ailerons";
  src: url("assets/fonts/ailerons/Ailerons-Regular.otf");
}

.ailerons {
  font-family: "ailerons", sans-serif;
}

body {
  background-color: $alice-blue;
}

a {
  color: $deep-jungle-green;
}

a:hover {
  color: $rich-black-FOGRA-29;
}

.app {
  display: flex;
  width: 100%;
}

.navpanel {
  position: fixed;
  width: 17%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: $alice-blue;
}

.details {
  position: absolute;
  top: 0;
  left: 18%;
  width: 80%;
  height: auto;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition-duration: 0.5s;
}
.displayNone {
  visibility: hidden;
  pointer-events: none;
  transition-delay: 1s;
}

// modals

.openNavPanel {
}

.disableFunctionality {
}

@media screen and (max-width: 767.98px) {
  .details {
    left: 0;
    width: 100%;
  }
  .navpanel {
    left: -315px;
    width: 75%;
    height: 100vh;
    transition-duration: 0.5s;
  }
  .openNavPanel {
    transition-duration: 0.5s;
    transform: translateX(300px);
  }
  .disableFunctionality {
    pointer-events: none;
  }
}
</style>
