<template>
  <div id="app">
    <div class="d-none">
      <navbar />
      <router-view />
    </div>
    <div>
      <navpanel />
      <router-view />
    </div>
    <AddKeepModal />
    <AddVaultModal />
  </div>
</template>

<script>
import Navbar from "@/components/navbar";
import Navpanel from "@/components/navpanel";
import { onAuth } from "@bcwdev/auth0-vue";
import AddKeepModal from "@/components/addKeepModal";
import AddVaultModal from "@/components/addVaultModal";
export default {
  name: "App",
  async beforeCreate() {
    await onAuth();
    this.$store.dispatch("setBearer", this.$auth.bearer);
  },
  components: {
    Navbar,
    Navpanel,
    AddKeepModal,
    AddVaultModal,
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
</style>
