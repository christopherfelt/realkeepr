<template>
  <div
    class="dashboard-container m-3 p-3 animate__animated animate__fast animate__fadeIn"
  >
    <h1 class="ailerons text-center ">
      DASHBOARD
    </h1>
    <button class="btn btn-danger" @click="logout">logout</button>
    <!-- <button class="btn btn-success" @click="addKeep">Add Keep</button> -->
    <button class="btn btn-success" @click="addVault">Add Vault</button>
    <div
      v-for="vault in vaults"
      :key="vault.id"
      class="card d-inline-block card-dems"
    >
      <img class="card-img-top" src="" alt="" />
      <div class="card-body">
        <router-link
          :to="{ name: 'vaultDetail', params: { vaultId: vault.id } }"
        >
          <h4 class="card-title">{{ vault.name }}</h4>
        </router-link>
        <h6>Description</h6>
        <p class="card-text">{{ vault.description }}</p>
      </div>
    </div>

    <!-- public {{ publicKeeps }} user {{ userKeeps }} -->
    <!-- TODO Loop through vaults and have a spot for total stats or something -->
    <!-- TODO create a vault details page that includes all the videos and name (I want to add creation date and last updated) -->
    <!-- TODO in dasboard will be the place to add a vault and a keep -->
  </div>
</template>

<script>
import "animate.css";
export default {
  mounted() {
    this.$store.dispatch("getAllUserVaults");
  },
  computed: {
    vaults() {
      return this.$store.state.VaultStore.activeVaults;
    },
  },
  methods: {
    async logout() {
      this.$store.dispatch("resetBearer");
      await this.$auth.logout({ returnTo: window.location.origin });
    },
    addKeep() {
      $("#addKeepModal").modal("show");
    },
    addVault() {
      $("#addVaultModal").modal("show");
    },
  },
};
</script>

<style>
@font-face {
  font-family: "anurati";
  src: url("../assets/fonts/anurati/Anurati-Regular.otf");
}

@font-face {
  font-family: "ailerons";
  src: url("../assets/fonts/ailerons/Ailerons-Regular.otf");
}

.anurati {
  font-family: "anurati", sans-serif;
}

.ailerons {
  font-family: "ailerons", sans-serif;
}
.dashboard-container {
  position: absolute;
  top: 0;
  left: 18%;
  width: 80%;
  height: auto;
}

.test-card {
  width: 150px;
  height: 300px;
  background-color: black;
}
</style>
