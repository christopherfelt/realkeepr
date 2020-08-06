<template>
  <div>
    <div
      class="vault-detail-container container-fluid m-3 p-3 animate__animated animate__fadeIn"
    >
      <div class="row">
        <div class="col">
          <button
            class="btn btn-danger float-right"
            @click="openDeleteVaultConfirmationModal"
          >
            Delete Vault
          </button>
        </div>
      </div>
      <div class="row text-center">
        <div class="col">
          <h1 class="ailerons">{{ activeVault.name }}</h1>
          <p class="">{{ activeVault.description }}</p>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-10 ">
          <div class="keep-container">
            <button
              class="btn btn-success m-2 add-keep-button"
              @click="openAddKeepModal"
            >
              Add Keep
            </button>
            <KeepCard
              v-for="(keep, index) in activeKeeps"
              :key="keep.id"
              :keep="keep"
              :index="index"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KeepCard from "@/components/keepCard.vue";
export default {
  name: "vaultDetail",
  mounted() {
    this.$store.dispatch("setActiveVaultDetail", this.$route.params.vaultId);
    this.$store.dispatch("getKeepsByVaultId", this.$route.params.vaultId);
  },
  data() {
    return {};
  },
  computed: {
    activeVault() {
      return this.$store.state.VaultStore.activeVaultDetail;
    },
    activeKeeps() {
      return this.$store.state.KeepStore.activeKeeps;
    },
  },
  methods: {
    openAddKeepModal() {
      $("#addKeepModal").data("vault", this.$route.params.vaultId);
      let options = $("#addKeepModal")
        .find("#vault-select")
        .children();
      console.log(options);
      for (let i = 0; i < options.length; i++) {
        let option = options[i];
        if (option.value == this.$route.params.vaultId) {
          option.selected = true;
          break;
        }
      }
      $("#addKeepModal").modal("toggle");
    },
    openDeleteVaultConfirmationModal() {
      $("#deleteConfirmationModal").data("model", "vault");
      $("#deleteConfirmationModal").data("vaultid", this.activeVault.id);
      $("#deleteConfirmationModal")
        .find("#span-title")
        .text("Vault");
      $("#deleteConfirmationModal")
        .find("#span-body")
        .text("vault " + this.activeVault.name);
      $("#deleteConfirmationModal").modal("toggle");
    },
  },
  components: {
    KeepCard,
  },
};
</script>

<style scoped>
/* .vault-detail-container {
  position: absolute;
  top: 0;
  left: 18%;
  width: 80%;
  height: auto;
} */

.keep-container {
  display: flex;
  flex-wrap: wrap;
}

.add-keep-button {
  width: 300px;
  height: 200px;
}
</style>
