<template>
  <div class="addKeepModal">
    <div
      class="modal fade"
      id="addKeepModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="addKeepModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addKeepLabel">Add Keep</h5>
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
                <label for="keep-name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="keep-name"
                  aria-describedby="emailHelp"
                  placeholder="Name your keep"
                  v-model="keepForm.name"
                />
              </div>
              <div class="form-group">
                <label for="Description">Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="keep-description"
                  placeholder="Description"
                  v-model="keepForm.description"
                />
              </div>
              <div class="form-group">
                <label for="keep-video-url">Video</label>
                <input
                  type="url"
                  class="form-control"
                  id="keep-video-url"
                  placeholder="youtube/?watch="
                  v-model="keepForm.img"
                />
                <small>Insert a url for a youtube video</small>
              </div>
              <div class="form-group dropdown show">
                <label for="keep-vault">Vault</label>
                <!-- <input
                  type="text"
                  class="form-control"
                  id="keep-vault"
                  placeholder="vault"
                /> -->
                <select
                  class="custom-select"
                  name="vault-select"
                  id="vault-select"
                  @click="getVaultIdFromOption($event)"
                >
                  <option value="14">this one</option>
                  <option value="12">Postman vault</option>
                  <option value="13">Postman vault 2</option>
                </select>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="keep-public-indication"
                  v-model="keepForm.isPrivate"
                />
                <label class="form-check-label" for="keep-public-indication"
                  >Private</label
                >
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
              @click="createNewKeep"
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
  name: "addKeepModal",
  mounted() {},
  data() {
    return {
      keepForm: {
        isPrivate: true,
        vaultName: "",
      },
    };
  },
  computed: {},
  methods: {
    getVaultIdFromOption() {
      console.log(event.currentTarget.value);
      this.keepForm.vaultId = event.currentTarget.value;
    },
    createNewKeep() {
      let modalForm = document.getElementById("addKeepModal");
      if (!("vaultId" in this.keepForm)) {
        this.keepForm.vaultId = modalForm.dataset.vault
          ? modalForm.dataset.vault
          : "";
      }
      console.log(this.keepForm);
      this.keepForm.vaultId = parseInt(this.keepForm.vaultId);
      this.$store.dispatch("createNewKeep", this.keepForm);
      $("#addKeepModal").modal("toggle");
      this.keepForm = {};
    },
  },
  components: {},
};
</script>

<style scoped></style>
