<template>
  <div id="app">
    <!-- <div class="d-none">
      <navbar />
      <router-view />
    </div> -->
    <div>
      <navpanel />
      <router-view />
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
import { onAuth } from "@bcwdev/auth0-vue";
import AddKeepModal from "@/components/addKeepModal";
import EditKeepModal from "@/components/editKeepModal";
import AddVaultModal from "@/components/addVaultModal";
import AddKeepToVaultModal from "@/components/addKeepToVaultModal";
import DeleteConfirmationModal from "@/components/deleteConfirmationModal";

export default {
  name: "App",
  async beforeCreate() {
    await onAuth();
    this.$store.dispatch("setBearer", this.$auth.bearer);
    // this.$store.dispatch("getAllUserVaults");
  },
  components: {
    Navbar,
    Navpanel,
    AddKeepModal,
    AddVaultModal,
    AddKeepToVaultModal,
    EditKeepModal,
    DeleteConfirmationModal,
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
