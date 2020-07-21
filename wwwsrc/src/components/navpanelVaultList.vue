<template>
  <div class="navpanelVaultList">
    <h6>Vaults</h6>
    <!-- <div v-for="vault in vaults" :key="vault.id" v-show="vault.show">
      {{ vault.name }}
    </div> -->
    <NavpanelVaultListItem
      v-for="(vault, index) in vaults"
      :key="vault.id"
      :vault="vault"
      :index="index"
    />
  </div>
</template>

<script>
import NavpanelVaultListItem from "@/components/navpanelVaultListItem";
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "navpanelVaultList",
  //   async mounted() {
  //     await onAuth();
  //     this.$store.dispatch("setBearer", this.$auth.bearer);
  //     this.$store.dispatch("getAllUserVaults");
  //   },
  data() {
    return {};
  },
  computed: {
    vaults() {
      return this.$store.state.VaultStore.activeVaults;
    },
    authToken() {
      return this.$store.state.VaultStore.authToken;
    },
  },
  methods: {},
  components: {
    NavpanelVaultListItem,
  },
  watch: {
    authToken: function() {
      this.$store.dispatch("getAllUserVaults");
    },
  },
};
</script>

<style scoped></style>
