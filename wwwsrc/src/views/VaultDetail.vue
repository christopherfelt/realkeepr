<template>
  <div class="vault-detail-container text-center">
    <h1 class="ailerons text-center ">{{ activeVault.name }}</h1>
    <p class="text-center">{{ activeVault.description }}</p>
    <!-- {{ activeVault }} -->
    <button
      class="btn btn-success"
      data-toggle="modal"
      data-target="#addKeepModal"
    >
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
  methods: {},
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
