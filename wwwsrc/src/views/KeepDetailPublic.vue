<template>
  <div
    class="keep-detail-container m-3 p-3 animate__animated animate__fast animate__fadeIn"
  >
    <h1 class="ailerons text-center ">{{ activeKeep.name }}</h1>
    <div class="d-flex justify-content-center">
      <div>
        <img class="placeholder" :src="activeKeep.img" />
        <div class="my-3">
          <h6>{{ activeKeep.description }}</h6>
        </div>
        <div>
          <h6>Views: {{ activeKeep.views }} | Adds: {{ activeKeep.keeps }}</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onAuth } from "@bcwdev/auth0-vue";
export default {
  name: "keepDetail",
  async mounted() {
    this.$store.dispatch("getKeepById", this.$route.params.keepId);
  },
  data() {
    return {};
  },
  computed: {
    activeKeep() {
      return this.$store.state.KeepStore.activeKeepDetail;
    },
  },
  methods: {},
  components: {},
};
</script>

<style scoped>
.keep-detail-container {
  position: absolute;
  top: 0;
  left: 18%;
  width: 80%;
  height: auto;
}

.placeholder {
  width: 40vw;
  height: 50vh;
}
</style>
