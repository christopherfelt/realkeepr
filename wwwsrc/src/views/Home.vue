<template>
  <div
    class="home-container p-3 animate__animated animate__fast animate__fadeIn"
  >
    <h1 class="ailerons text-center ">
      HOME
    </h1>
    <div
      v-for="keep in keeps"
      :key="keep.id"
      class="card d-inline-block card-dems"
    >
      <img class="card-img-top" src="" alt="" />
      <div class="card-body">
        <h4 class="card-title">{{ keep.name }}</h4>
        <h6>Description</h6>
        <p class="card-text">{{ keep.description }}</p>
        <h6>Private</h6>
        <p class="card-text">{{ keep.isPrivate }}</p>
        <h6>Views</h6>
        <p class="card-text">{{ keep.views }}</p>
        <h6>Keeps</h6>
        <p class="card-text">{{ keep.keeps }}</p>
      </div>
    </div>

    {{ keeps }}
  </div>
</template>

<script>
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
};
</script>

<style lang="css">
.home-container {
  position: absolute;
  top: 0;
  left: 18%;
  width: 80%;
  height: auto;
  /* border: 5px solid red; */
}

.card-dems {
  width: 200px;
  height: auto;
}

.placeholder {
  width: 300px;
  height: 200px;
  background-color: black;
}
</style>
