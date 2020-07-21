<template>
  <div
    class="dashboard-container container-fluid m-3 p-3 animate__animated animate__fast animate__fadeIn"
  >
    <div class="row">
      <div class="col">
        <button class="btn btn-danger float-right" @click="logout">
          logout
        </button>
      </div>
    </div>
    <div class="row mb-5">
      <div class="col">
        <h1 class="ailerons text-center ">
          DASHBOARD
        </h1>
      </div>
    </div>

    <div class="row border-bottom">
      <div class="col">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item" @click="showVaultList = !showVaultList">
            <a
              class="nav-link active ailerons"
              id="pills-vault-tab"
              data-toggle="pill"
              href="#pills-vaults"
              role="tab"
              aria-controls="pills-vaults"
              aria-selected="true"
              ><h3>Vaults</h3></a
            >
          </li>
          <li class="nav-item ailerons">
            <a
              class="nav-link "
              id="pills-keeps-tab"
              data-toggle="pill"
              href="#pills-keeps"
              role="tab"
              aria-controls="pills-keeps"
              aria-selected="false"
              ><h3>Keeps</h3></a
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="tab-content" id="pills-tabContent" v-if="showVaultList">
      <div
        class="tab-pane fade show active"
        id="pills-vaults"
        role="tabpanel"
        aria-labelledby="pills-vaults-tab"
      >
        <div class="row d-flex justify-content-center mt-3">
          <div class="col-10 d-flex justify-content-start">
            <VaultCard
              v-for="(vault, index) in vaults"
              :key="vault.id"
              :vault="vault"
              :index="index"
            />
            <button
              v-if="showAddButton"
              class="btn btn-primary mr-1 animate__animated animate__fadeIn"
              @click="addVault"
            >
              Add Vault
            </button>
          </div>
        </div>
      </div>
      <div
        class="tab-pane fade"
        id="pills-keeps"
        role="tabpanel"
        aria-labelledby="pills-keeps-tab"
      >
        ...
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
import VaultCard from "@/components/vaultCard";
export default {
  mounted() {
    this.$store.dispatch("getAllUserVaults");
    this.$store.dispatch("getAllUserKeeps");
    this.$store.dispatch("getAllUserDTOs");
    this.showAddButton = false;
    setTimeout(() => {
      this.showAddButton = true;
    }, 200 * this.vaultListLength);
  },
  data() {
    return {
      showAddButton: false,
      showVaultList: false,
    };
  },
  computed: {
    vaults() {
      return this.$store.state.VaultStore.activeVaults;
    },
    vaultListLength() {
      return this.vaults.length;
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
