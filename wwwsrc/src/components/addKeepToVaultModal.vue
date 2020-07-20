<template>
  <div class="addKeepToVaultModal">
    <div
      class="modal fade"
      id="addKeepToVaultModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addKeepModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addKeepToVaultLabel">
              Add to another vault
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <div class="form-group dropdown show">
                  <label for="keep-vault">Vault</label>
                  <select
                    class="custom-select"
                    name="vault-select"
                    id="vault-select"
                    @click="getVaultIdFromOption($event)"
                  >
                    <option value="no choice">Choose Vault</option>
                    <option
                      v-for="vault in activeVaults"
                      :key="vault.id"
                      :value="vault.id"
                    >
                      {{ vault.name }}
                    </option>
                    <!-- <option value="14">this one</option>
                  <option value="12">Postman vault</option>
                  <option value="13">Postman vault 2</option> -->
                  </select>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              @click="addKeepToAnotherVault"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addKeepToVaultModal",
  mounted() {},
  data() {
    return {
      vaultSelection: "",
    };
  },
  computed: {
    activeVaults() {
      return this.$store.state.VaultStore.activeVaults;
    },
  },
  methods: {
    getVaultIdFromOption() {
      this.vaultSelection = event.currentTarget.value;
    },
    addKeepToAnotherVault() {
      let keepId = $("#addKeepToVaultModal").data("keepid");
      let dto = {
        vaultId: parseInt(this.vaultSelection),
        keepId: parseInt(keepId),
      };
      if (dto.vaultId != "no choice") {
        this.$store.dispatch("addKeepToVault", dto);
      }
      $("#addKeepToVaultModal").modal("toggle");
    },
  },
  components: {},
};
</script>

<style scoped></style>
