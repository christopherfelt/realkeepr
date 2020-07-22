<template>
  <div
    class="keep-detail-container m-3 p-3 animate__animated animate__fast animate__fadeIn"
  >
    <h1 class="ailerons text-center ">{{ activeKeep.name }}</h1>
    <div class="d-flex justify-content-center">
      <div>
        <img class="placeholder" :src="activeKeep.img" />
        <div class="my-3">
          <h6>{{ activeKeep.description }}</h6>
        </div>
        <div>
          <h6>Views: {{ activeKeep.views }} | Adds: {{ activeKeep.keeps }}</h6>
        </div>
        <div>
          <div
            class="d-inline"
            v-if="
              $auth.isAuthenticated &&
                activeKeep.userId != $auth.user.sub &&
                !keepInUserKeeps
            "
          >
            <button
              class="btn btn-primary mx-1"
              @click="openAddKeepToVaultModal"
            >
              Add to Vault
            </button>
          </div>
          <div
            class="d-inline"
            v-if="
              $auth.isAuthenticated &&
                activeKeep.userId == $auth.user.sub &&
                activeKeep.isPrivate
            "
          >
            <button class="btn btn-primary" @click="openEditKeepModal">
              Edit
            </button>
            <button
              class="btn btn-danger mx-1"
              @click="openDeleteKeepConfirmationModal"
            >
              Delete Keep
            </button>
          </div>
          <div class="d-inline" v-if="$auth.isAuthenticated && keepInUserKeeps">
            <!-- <button class="btn btn-primary mx-1" @click="removeFromVault">
              Change Vault
            </button> -->
            <button
              class="btn btn-primary mx-1"
              @click="openAddKeepToVaultModal"
            >
              Add to Another Vault
            </button>
          </div>
          <div class="d-inline" v-if="$auth.isAuthenticated && keepInUserKeeps">
            <button class="btn btn-danger mx-1" @click="removeFromVault">
              Remove from vault
            </button>
          </div>
          <!-- <div
            class="d-inline"
            v-if="$auth.isAuthenticated && activeKeep.userId == $auth.user.sub"
          >
            <button
              class="btn btn-danger mx-1"
              @click="openDeleteKeepConfirmationModal"
            >
              Delete Keep
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "keepDetail",
  async mounted() {
    await onAuth();
    this.$store.dispatch("setBearer", this.$auth.bearer);
    this.$store.dispatch("getKeepById", this.$route.params.keepId);
    this.$store.dispatch("getAllUserKeeps");
  },
  data() {
    return {};
  },
  computed: {
    activeKeep() {
      return this.$store.state.KeepStore.activeKeepDetail;
    },
    activeVault() {
      return this.$store.state.VaultStore.activeVaultDetail;
    },
    activeUserKeeps() {
      return this.$store.state.KeepStore.activeUserKeeps;
    },
    keepInUserKeeps() {
      return (
        this.activeUserKeeps.filter((k) => k.id == this.$route.params.keepId)
          .length > 0
      );
    },
  },
  methods: {
    openEditKeepModal() {
      $("#editKeepModal")
        .find("#keep-edit-name")
        .val(this.activeKeep.name);
      $("#editKeepModal")
        .find("#keep-edit-description")
        .val(this.activeKeep.description);
      $("#editKeepModal")
        .find("#keep-edit-video-url")
        .val(this.activeKeep.img);
      $("#editKeepModal")
        .find("#keep-edit-video-url")
        .val(this.activeKeep.img);
      $("#editKeepModal")
        .find("#keep-edit-public-indication")
        .prop("checked", true);
      console.log(this.activeKeep.id);
      $("#editKeepModal").data("keepid", this.activeKeep.id);
      $("#editKeepModal").modal("toggle");
    },
    openAddKeepToVaultModal() {
      this.$store.dispatch("getAllUserVaults");
      $("#addKeepToVaultModal").data("keepid", this.activeKeep.id);
      $("#addKeepToVaultModal").modal("toggle");
    },
    removeFromVault() {
      let dto = { vaultId: this.activeVault.id, keepId: this.activeKeep.id };
      console.log(dto);
      this.$store.dispatch("removeKeepFromVault", dto);
      this.$router.push({ name: "dashboard" });
    },
    openDeleteKeepConfirmationModal() {
      $("#deleteConfirmationModal").data("model", "keep");
      $("#deleteConfirmationModal").data("keepid", this.activeKeep.id);
      $("#deleteConfirmationModal")
        .find("#span-title")
        .text("Keep");
      $("#deleteConfirmationModal")
        .find("#span-body")
        .text("Keep " + this.activeKeep.name);
      $("#deleteConfirmationModal").modal("toggle");
    },
  },
  components: {},
};
</script>

<style scoped>
.keep-detail-container {
  position: absolute;
  top: 0;
  left: 18%;
  width: 80%;
  height: auto;
}

.placeholder {
  width: 40vw;
  height: 50vh;
}
</style>
