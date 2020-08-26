<template>
  <div class="playback d-flex justify-content-between p-1 mb-1">
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
    return {
      paused: false,
      playing: false,
      stopped: false,
    };
  },
  computed: {
    playBackState() {
      return this.$store.state.PlaybackStore.playBackState;
    },
    currentlyPlayingVideo() {
      return this.$store.state.PlaybackStore.currentlyPlayingVideo;
    },
  },
  methods: {
    playBackClick(event) {
      this.$store.dispatch("changePlayBackState", event);
    },
    nextClick() {
      let nextSong = this.currentlyPlayingVideo + 1;
      this.$store.dispatch("changeSong", nextSong);
    },
    previousClick() {
      let previousSong = this.currentlyPlayingVideo - 1;
      this.$store.dispatch("changeSong", previousSong);
    },
  },
  components: {},
  watch: {
    playBackState: function() {
      if (this.playBackState == "paused") {
        this.paused = true;
        this.playing = false;
        this.stopped = false;
      } else if (this.playBackState == "playing") {
        this.paused = false;
        this.playing = true;
        this.stopped = false;
      } else if (this.playBackState == "stopped") {
        this.paused = false;
        this.playing = false;
        this.stopped = true;
      } else {
        this.paused = false;
        this.playing = false;
        this.stopped = false;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.heading-4-color {
  color: black;
}

.playback-button {
  transition-duration: 250ms;
}

.playback-button:hover {
  background-color: lightgray;
}

.pbActive {
  // background-color: #3e5c76;
  color: #748cab;
}
</style>
