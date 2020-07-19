<template>
  <div class="dashboard-container m-3 p-3">
    <h1 class="ailerons text-center">DASHBOARD</h1>
    <div class="row d-flex justify-content-between">
      <div class="col m-3 test-card"></div>
      <div class="col m-3 test-card"></div>
      <div class="col m-3 test-card"></div>
      <div class="col m-3 test-card"></div>
      <div class="col m-3 test-card"></div>
      <div class="col m-3 test-card"></div>
    </div>

    <!-- public {{ publicKeeps }} user {{ userKeeps }} -->
    <!-- TODO Loop through vaults and have a spot for total stats or something -->
    <!-- TODO create a vault details page that includes all the videos and name (I want to add creation date and last updated) -->
    <!-- TODO in dasboard will be the place to add a vault and a keep -->
  </div>
</template>

<script>
export default {
  mounted() {},
  computed: {},
};
</script>

<style>
@font-face {
  font-family: "anurati";
  src: url("../assets/fonts/anurati/Anurati-Regular.otf");
}

@font-face {
  font-family: "ailerons";
  src: url("../assets/fonts/ailerons/Ailerons-Regular.otf");
}

.anurati {
  font-family: "anurati", sans-serif;
}

.ailerons {
  font-family: "ailerons", sans-serif;
}
.dashboard-container {
  position: absolute;
  top: 0;
  left: 18%;
  width: 80%;
  height: auto;
}

.test-card {
  width: 150px;
  height: 300px;
  background-color: black;
}
</style>
