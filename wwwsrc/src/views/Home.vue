<template>
  <div class="home-container p-3">
    <div class="placeholder"></div>
  </div>
</template>

<script>
export default {
  name: "home",
  computed: {
    user() {
      return this.$store.state.user;
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

.placeholder {
  width: 300px;
  height: 200px;
  background-color: black;
}
</style>
