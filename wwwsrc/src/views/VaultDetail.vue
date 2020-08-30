<template>
  <div>
    <div
      class="vault-detail-container container-fluid m-3 p-3 animate__animated animate__fadeIn"
    >
      <div class="row"></div>
      <div class="row text-center">
        <div class="col">
          <div class="d-flex justify-content-center">
            <div class="align-self-center backButton" @click="goToDashboard">
              <i class="fas fa-chevron-left"></i>
            </div>
            <div v-if="!editOptionChosen">
              <h1 class="ailerons">{{ activeVault.name }}</h1>
            </div>
            <div v-if="editOptionChosen" class="mb-2">
              <input type="text" v-model="activeVault.name" />
            </div>
            <div class="align-self-center" @click="changeOptionVisibility">
              <span
                class="anurati options"
                :class="{ optionsClicked: optionsVisible }"
                >I</span
              >
            </div>
          </div>
          <div
            class="d-flex justify-content-center mb-1 animate__animated animate__fadeInDown"
            v-if="optionsVisible"
          >
            <div
              class="mx-1 option edit"
              :class="{ editChosen: editOptionChosen }"
              @click="changeEditOptionStatus"
            >
              <small>Edit</small>
            </div>
            <div
              class="mx-1 option delete"
              @click="openDeleteVaultConfirmationModal"
            >
              <small>Delete</small>
            </div>
            <div
              v-if="editOptionChosen"
              class="mx-1  animate__animated animate__fadeInRight "
              @click="updateVault"
            >
              <small class="option save">Save</small>
            </div>
          </div>
          <div v-if="!editOptionChosen">
            <p class="">{{ activeVault.description }}</p>
          </div>
          <div v-if="editOptionChosen" class="mt-2">
            <input type="text" v-model="activeVault.description" />
          </div>
        </div>
      </div>
      <div class="row d-flex justify-content-center">
        <div class="col-10 ">
          <div class="keep-container">
            <!-- <button
              class="btn btn-success m-2 add-keep-button"
              @click="openAddKeepModal"
            >
              Add Keep
            </button> -->
            <!-- <KeepCard
              v-for="(keep, index) in activeKeeps"
              :key="keep.id"
              :keep="keep"
              :index="index"
            /> -->
            <SubredditPostCard
              v-for="(keep, index) in activeKeeps"
              :key="keep.img"
              :subredditId="keep.img"
              :index="index"
              :inVault="true"
              :keepId="keep.id"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KeepCard from "@/components/keepCard.vue";
import SubredditPostCard from "@/components/subredditPostCard.vue";
export default {
  name: "vaultDetail",
  mounted() {
    this.$store.dispatch("setActiveVaultDetail", this.$route.params.vaultId);
    this.$store.dispatch("getKeepsByVaultId", this.$route.params.vaultId);
  },
  data() {
    return {
      optionsVisible: false,
      editOptionChosen: false,
    };
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
      $("#addKeepModal").data("vault", this.$route.params.vaultId);
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
    openDeleteVaultConfirmationModal() {
      $("#deleteConfirmationModal").data("model", "vault");
      $("#deleteConfirmationModal").data("vaultid", this.activeVault.id);
      $("#deleteConfirmationModal")
        .find("#span-title")
        .text("Vault");
      $("#deleteConfirmationModal")
        .find("#span-body")
        .text("vault " + this.activeVault.name);
      $("#deleteConfirmationModal").modal("toggle");
    },
    changeOptionVisibility() {
      if (this.optionsVisible) {
        this.optionsVisible = false;
        this.editOptionChosen = false;
      } else {
        this.optionsVisible = true;
      }
    },
    changeEditOptionStatus() {
      this.editOptionChosen = !this.editOptionChosen;
    },
    updateVault() {
      this.$store.dispatch("updateVault", this.activeVault);
      this.editOptionChosen = false;
      this.optionsVisible = false;
    },
    goToDashboard() {
      this.$router.push({ name: "dashboard" });
    },
  },
  components: {
    KeepCard,
    SubredditPostCard,
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/_variables.scss";
/* .vault-detail-container {
  position: absolute;
  top: 0;
  left: 18%;
  width: 80%;
  height: auto;
} */

.keep-container {
  display: flex;
  flex-wrap: wrap;
}

.add-keep-button {
  width: 300px;
  height: 200px;
}

.options {
  border: 1px solid black;
  border-radius: 50%;
  padding: 0 6px;
  font-size: 12px;
  opacity: 0.3;
  transition-duration: 0.5s;
  cursor: pointer;
}

.options:hover {
  opacity: 0.9;
}

.optionsClicked {
  opacity: 1;
}

.option {
  cursor: pointer;
  opacity: 0.5;
  transition-duration: 0.5s;
}

.option:hover {
  opacity: 0.9;
}

.edit {
  color: $deep-jungle-green;
}

.editChosen {
  text-decoration: underline;
}

.delete {
  color: $international-orange-engineering;
}

.save {
  color: $shadow-blue;
}

.backButton {
  opacity: 0.3;
  transition-duration: 0.5s;
  cursor: pointer;
}

.backButton:hover {
  opacity: 0.9;
}
</style>
