<template>
  <div id="app">
    <!-- <div class="d-none">
      <navbar />
    </div> -->
    <div>
      <navpanel />
      <router-view />
      <!-- <SubredditDetail
        :to="{ name: 'subredditDetail', params: { subreddit: 'listenToThis' } }"
      /> -->
      <!-- <router-view
        :to="{ name: 'subredditDetail', params: { subreddit: 'listenToThis' } }"
      /> -->
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
import Navpanel from "@/components/navpanel";
import SubredditDetail from "@/views/SubredditDetail.vue";
import { onAuth } from "@bcwdev/auth0-vue";

import AddKeepModal from "@/components/modals/addKeepModal";
import EditKeepModal from "@/components/modals/editKeepModal";
import AddVaultModal from "@/components/modals/addVaultModal";
import AddKeepToVaultModal from "@/components/modals/addKeepToVaultModal";
import DeleteConfirmationModal from "@/components/modals/deleteConfirmationModal";

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
@import "bootstrap";
@import "./assets/_overrides.scss";

.wrapper {
  display: flex;
  width: 100%;
}

.btn-primary {
  border: none;
}
</style>
