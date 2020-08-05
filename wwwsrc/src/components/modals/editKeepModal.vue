<template>
  <div class="editKeepModal">
    <div
      class="modal fade"
      id="editKeepModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="editKeepModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="addKeepLabel">Edit Keep</h5>
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
                <label for="keep-edit-name">Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="keep-edit-name"
                  aria-describedby="name of keep"
                  placeholder="Name your keep"
                />
              </div>
              <div class="form-group">
                <label for="keep-edit-description">Description</label>
                <input
                  type="text"
                  class="form-control"
                  id="keep-edit-description"
                  placeholder="Description"
                />
              </div>
              <div class="form-group">
                <label for="keep-edit-video-url">Video</label>
                <input
                  type="url"
                  class="form-control"
                  id="keep-edit-video-url"
                  placeholder="youtube/?watch="
                />
                <small>Insert a url for a youtube video</small>
              </div>
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="keep-edit-public-indication"
                />
                <label
                  class="form-check-label"
                  for="keep-edit-public-indication"
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
            <button type="button" class="btn btn-primary" @click="editKeep">
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
    editKeep() {
      let editKeepForm = {
        id: $("#editKeepModal").data("keepid"),
        name: $("#editKeepModal")
          .find("#keep-edit-name")
          .val(),
        description: $("#editKeepModal")
          .find("#keep-edit-description")
          .val(),
        img: $("#editKeepModal")
          .find("#keep-edit-video-url")
          .val(),
        isPrivate: $("#editKeepModal")
          .find("#keep-edit-public-indication")
          .is(":checked"),
      };

      console.log(editKeepForm);
      //   this.keepForm.vaultId = parseInt(this.keepForm.vaultId);
      this.$store.dispatch("editKeep", editKeepForm);
      $("#editKeepModal").modal("toggle");
      this.keepForm = {};
    },
  },
  components: {},
};
</script>

<style scoped></style>
