<template>
  <div
    class="dashboard-container container-fluid m-3 p-3 animate__animated animate__fadeIn"
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

    <!-- <div class="row border-bottom">
      <div class="col">
        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
          <li class="nav-item">
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
    </div> -->
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

    <!-- <div class="tab-content" id="pills-tabContent" v-if="showVaultList">
      <div
        class="tab-pane fade show active"
        id="pills-vaults"
        role="tabpanel"
        aria-labelledby="pills-vaults-tab"
      >
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
      <div
        class="tab-pane fade"
        id="pills-keeps"
        role="tabpanel"
        aria-labelledby="pills-keeps-tab"
      >
        <div class="row my-2">
          <div class="col-10">
            <button
              class="btn btn-primary mr-2"
              type="button"
              data-toggle="collapse"
              data-target="#allKeeps"
              aria-expanded="false"
              aria-controls="allKeeps"
            >
              All Keeps
            </button>
            <button
              class="btn btn-primary mr-2"
              type="button"
              data-toggle="collapse"
              data-target="#userCreatedKeeps"
              aria-expanded="false"
              aria-controls="userCreatedKeeps"
            >
              User Created Keeps
            </button>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-10">
            <h6>All Keeps</h6>
            <div class="collapse  keep-container" id="allKeeps">
              <KeepCard v-for="keep in keeps" :key="keep.id" :keep="keep" />
            </div>
          </div>
        </div>

        <div class="row my-2">
          <div class="col-10">
            <h6>User Created Keeps</h6>
            <div class="collapse keep-container" id="userCreatedKeeps">
              <KeepCard
                v-for="keep in userCreatedKeeps"
                :key="keep.id"
                :keep="keep"
              />
            </div>
          </div>
        </div>
      </div>
    </div> -->

    <!-- public {{ publicKeeps }} user {{ userKeeps }} -->
    <!-- TODO Loop through vaults and have a spot for total stats or something -->
    <!-- TODO create a vault details page that includes all the videos and name (I want to add creation date and last updated) -->
    <!-- TODO in dasboard will be the place to add a vault and a keep -->
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
/* .dashboard-container {
  position: absolute;
  top: 0;
  left: 18%;
  width: 80%;
  height: auto;
} */

.test-card {
  width: 150px;
  height: 300px;
  background-color: black;
}

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
</style>
