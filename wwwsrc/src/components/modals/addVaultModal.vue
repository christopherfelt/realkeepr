<template>
  <div class="addVaultModal">
    <div
      class="modal fade"
      id="addVaultModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addVaultModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog " role="document">
        <div class="modal-content border-0">
          <div class="modal-header">
            <h5 class="modal-title ailerons" id="addVaultModalLabel">
              Add Vault
            </h5>
            <button
              type="button"
              class="close text-light"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="vault-name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="vault-name"
                  aria-describedby="vaultName"
                  placeholder="Vault Name"
                  v-model="vaultForm.name"
                />
              </div>
              <div class="form-group">
                <label for="vault-description">Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="vault-description"
                  placeholder="Description"
                  v-model="vaultForm.description"
                />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary dangerButton"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary" @click="addNewVault">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "addVaultModal",
  data() {
    return {
      vaultForm: {},
    };
  },
  computed: {},
  methods: {
    addNewVault() {
      this.$store.dispatch("addNewVault", this.vaultForm);
      this.vaultForm = {};
      $("#addVaultModal").modal("toggle");
    },
  },
  components: {},
};
</script>

<style scoped>
.modal-header {
  color: white;
  background-color: #155f59;
}

.modal-title {
  font-size: 24px;
}
</style>
