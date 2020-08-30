<template>
  <div class="deleteConfimationModal">
    <div
      class="modal fade"
      tabindex="-1"
      role="dialog"
      id="deleteConfirmationModal"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header ">
            <h5 class="modal-title ">
              Confirm Delete of <span id="span-title"> </span>
            </h5>
            <button
              type="button"
              class="close  text-white"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p>
              Are you sure you want to delete <span id="span-body"></span> ?
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary border-0"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-danger dangerButton"
              @click="deleteVault"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "deleteConfimationModal",
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteVault() {
      let type = $("#deleteConfirmationModal").data("model");
      let objectId;
      if (type == "keep") {
        objectId = $("#deleteConfirmationModal").data("keepid");
        this.$store.dispatch("deleteKeep", objectId);
      } else if (type == "vault") {
        objectId = $("#deleteConfirmationModal").data("vaultid");
        this.$store.dispatch("deleteVault", objectId);
      }
      $("#deleteConfirmationModal").modal("toggle");
    },
  },
  components: {},
};
</script>

<style scoped>
.modal-header {
  color: white;
  background-color: #b80c09;
}
</style>
