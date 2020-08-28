<template>
  <div
    class="dashboard-container container-fluid  animate__animated animate__fadeIn"
  >
    <div class="row">
      <!-- <div class="col">
        <button class="btn btn-danger dangerButton float-right" @click="logout">
          logout
        </button>
      </div> -->
    </div>
    <div class="row mb-5">
      <div class="col text-center">
        <div>
          <h1 class="ailerons">
            DASHBOARD
          </h1>
        </div>
        <div class="d-flex justify-content-center">
          <div class="logout">
            <button class="btn btn-outline-primary btn-sm" @click="logout">
              logout?
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="row d-flex justify-content-center mt-3">
      <div class="col-10 vault-container">
        <button
          class="btn btn-primary m-1 add-vault-button ailerons animate__animated animate__fadeIn "
          @click="addVault"
        >
          ADD
        </button>

        <VaultCard
          v-for="(vault, index) in vaults"
          :key="vault.id"
          :vault="vault"
          :index="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";
import VaultCard from "@/components/vaultCard";
import KeepCard from "@/components/keepCard";
export default {
  mounted() {
    this.$store.dispatch("getAllUserVaults");
    this.$store.dispatch("getAllUserCreatedKeeps");
    this.$store.dispatch("getAllUserKeeps");
  },
  data() {
    return {
      showVaultList: true,
    };
  },
  computed: {
    vaults() {
      return this.$store.state.VaultStore.activeVaults;
    },
    vaultListLength() {
      return this.vaults.length;
    },
    keeps() {
      return this.$store.state.KeepStore.activeUserKeeps;
    },
    userCreatedKeeps() {
      return this.$store.state.KeepStore.activeUserCreatedKeeps;
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
  components: {
    VaultCard,
    KeepCard,
  },
};
</script>

<style lang="scss">
@import "../assets/_variables.scss";
.keep-container {
  display: flex;
  flex-wrap: wrap;
}
.vault-container {
  display: flex;
  flex-wrap: wrap;
}
.add-vault-button {
  width: 175px;
  height: 200px;
  font-size: 30px;
}

.btn {
  transition-duration: 0.85s;
}

.logout {
  opacity: 10%;
  transition-duration: 0.5s;
}

.logout:hover {
  opacity: 100%;
}
</style>
