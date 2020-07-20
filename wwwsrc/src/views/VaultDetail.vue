<template>
  <div
    class="vault-detail-container m-3 p-3 text-center animate__animated animate__fast animate__fadeIn"
  >
    <h1 class="ailerons text-center ">{{ activeVault.name }}</h1>
    <p class="text-center">{{ activeVault.description }}</p>
    <!-- {{ activeVault }} -->
    <button class="btn btn-success" @click="openAddKeepModal">
      Add Keep
    </button>
  </div>
</template>

<script>
export default {
  name: "vaultDetail",
  mounted() {
    this.$store.dispatch("setActiveVaultDetail", this.$route.params.vaultId);
  },
  data() {
    return {};
  },
  computed: {
    activeVault() {
      return this.$store.state.VaultStore.activeVaultDetail;
    },
  },
  methods: {
    openAddKeepModal() {
      $("#addKeepModal").attr("data-vault", this.$route.params.vaultId);
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
  },
  components: {},
};
</script>

<style scoped>
.vault-detail-container {
  position: absolute;
  top: 0;
  left: 18%;
  width: 80%;
  height: auto;
}
</style>
