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
    <KeepCard v-for="keep in activeKeeps" :key="keep.id" :keep="keep" />
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
  components: {
    KeepCard,
  },
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
