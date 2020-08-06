<template>
  <div
    class="home-container container-fluid p-3 animate__animated animate__fast animate__fadeIn"
  >
    <h1 class="ailerons text-center ">
      HOME
    </h1>

    <div class="row d-flex justify-content-center">
      <div class="col">
        <div class="keep-container">
          <KeepCard
            v-for="(keep, index) in keeps"
            :key="keep.id"
            :keep="keep"
            :index="index"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import KeepCard from "@/components/keepCard.vue";
export default {
  name: "home",
  mounted() {
    this.$store.dispatch("getAllPublicKeeps");
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    keeps() {
      return this.$store.state.KeepStore.activeKeeps;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  components: {
    KeepCard,
  },
};
</script>

<style lang="css">
/* .home-container {
  position: absolute;
  top: 0;
  left: 18%;
  width: 80%;
  height: auto;
} */

.card-dems {
  width: 200px;
  height: auto;
}

.placeholder {
  width: 300px;
  height: 200px;
  background-color: black;
}

.keep-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>
