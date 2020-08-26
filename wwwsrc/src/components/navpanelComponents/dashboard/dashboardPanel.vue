<template>
  <div class="dashboardPanel animate__animated animate__fadeInRight">
    <div
      class="nav-item"
      v-if="$auth.isAuthenticated"
      @click="playVideoInNavPanel()"
    >
      <router-link class="nav-link" :to="{ name: 'dashboard' }"
        >Dashboard
      </router-link>
      <div class="ml-4 mt-2 genresContainer">
        <div
          class="animate__animated animate__fadeInRight"
          v-for="vault in vaults"
          :key="vault.id"
        >
          <router-link
            :to="{ name: 'vaultDetail', params: { vaultId: vault.id } }"
          >
            <p
              class="m-0"
              @click="
                setActiveVaultDetail(vault.id);
                getKeepsByVaultId(vault.id);
              "
            >
              {{ vault.name }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
    <button class="btn btn-success" @click="login" v-else>
      Login
    </button>
  </div>
</template>

<script>
export default {
  name: "dashboardPanel",
  data() {
    return {};
  },
  computed: {
    vaults() {
      return this.$store.state.VaultStore.activeVaults;
    },
  },
  methods: {
    setActiveVaultDetail(vaultId) {
      this.$store.dispatch("setActiveVaultDetail", vaultId);
    },
    getKeepsByVaultId(vaultId) {
      this.$store.dispatch("getKeepsByVaultId", vaultId);
    },
    playVideoInNavPanel() {
      this.$store.dispatch("changePlayVideoInNavPanelStatus", true);
    },
    async login() {
      await this.$auth.loginWithPopup();
      this.$store.dispatch("setBearer", this.$auth.bearer);
      console.log("this.$auth.user: ");
      console.log(this.$auth.user);
    },
  },
  components: {},
};
</script>

<style scoped>
.genresContainer {
  color: #155f59;
  font-size: 13px;
  height: 60vh;
  overflow-y: auto;
}

.genresContainer::-webkit-scrollbar {
  width: 0.5em;
}
</style>
