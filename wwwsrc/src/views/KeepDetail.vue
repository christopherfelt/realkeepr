<template>
  <div
    class="keep-detail-container m-3 p-3 animate__animated animate__fast animate__fadeIn"
  >
    <h1 class="ailerons text-center ">{{ activeKeep.name }}</h1>
    <div class="d-flex justify-content-center">
      <div>
        <div class="placeholder">asdf</div>
        <div>
          <h3>Description:</h3>
          <p>{{ activeKeep.description }}</p>
        </div>
        <div>
          <div
            v-if="$auth.isAuthenticated && activeKeep.userId != $auth.user.sub"
          >
            <button class="btn btn-primary" @click="openAddKeepToVaultModal">
              Add to Vault
            </button>
          </div>
          <div
            v-else-if="
              $auth.isAuthenticated &&
                activeKeep.userId == $auth.user.sub &&
                activeKeep.isPrivate
            "
          >
            <button class="btn btn-primary" @click="openEditKeepModal">
              Edit
            </button>
            <button class="btn btn-primary">
              Change Vault
            </button>
            <button class="btn btn-primary" @click="openAddKeepToVaultModal">
              Add to another vault
            </button>
            <button class="btn btn-danger" @click="removeFromVault">
              Remove from vault
            </button>
          </div>
          <div v-else>
            <button class="btn btn-primary">
              Change Vault
            </button>
            <button class="btn btn-primary" @click="openAddKeepToVaultModal">
              Add to Another Vault
            </button>
          </div>
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
  width: 60rem;
  height: 40rem;
}
</style>
