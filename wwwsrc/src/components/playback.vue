<template>
  <div class="playback d-flex justify-content-between p-3">
    <span
      class="playback-button py-2 px-3 "
      :class="{ pbActive: paused }"
      @click="playBackClick('paused')"
      ><i class="fas fa-pause"></i
    ></span>
    <span
      class="playback-button py-2 px-3"
      :class="{ pbActive: playing }"
      @click="playBackClick('playing')"
      ><i class="fas fa-play"></i
    ></span>
    <span
      class="playback-button py-2 px-3"
      :class="{ pbActive: stopped }"
      @click="playBackClick('stopped')"
      ><i class="fas fa-stop"></i
    ></span>
    <span class="playback-button py-2 px-3" @click="previousClick"
      ><i class="fas fa-backward"></i
    ></span>
    <span class="playback-button py-2 px-3" @click="nextClick"
      ><i class="fas fa-forward"></i
    ></span>
  </div>
</template>

<script>
export default {
  name: "Playback",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {},
};
</script>

<style lang="scss" scoped>
@import "../assets/_variables.scss";

.heading-4-color {
  color: black;
}
</style>
