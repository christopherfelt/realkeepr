<template>
  <div class="component">
    <div
      class="modal fade"
      tabindex="-1"
      role="dialog"
      id="deleteConfirmationModal"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              Confirm Delete of <span id="span-title"> </span>
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
            <p>
              Are you sure you want to delete <span id="span-body"></span> ?
            </p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="deleteVault">
              Delete
            </button>
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "component",
  data() {
    return {};
  },
  computed: {},
  methods: {
    deleteVault() {
      let vaultId = $("#deleteConfirmationModal").data("vaultid");
      this.$store.dispatch("deleteVault", vaultId);
      $("#deleteConfirmationModal").modal("toggle");
    },
  },
  components: {},
};
</script>

<style scoped></style>
