<template>
  <!-- animate__animated animate_faster animate__fadeIn -->
  <div class="spc-container m-2 ">
    <!-- <div
      width="300px"
      height="200px"
      style="background-color:black;"
      v-show="!show"
    ></div> -->
    <div class="yt-container " :class="{ isCurrent: isCurrent }">
      <youtube
        :video-id="subredditId"
        width="300px"
        height="200px"
        ref="youtube"
        @ended="nextSong"
        @playing="setCurrentPlayingVideo"
        @ready="updateReadyStatus"
      ></youtube>
    </div>
  </div>
</template>

<script>
export default {
  name: "subredditPostCard",
  mounted() {},
  data() {
    return {
      show: false,
    };
  },
  props: ["subredditId", "index"],
  computed: {
    currentlyPlayingVideo() {
      return this.$store.state.PlaybackStore.currentlyPlayingVideo;
    },
    playBackState() {
      return this.$store.state.PlaybackStore.playBackState;
    },
    isCurrent() {
      return this.currentlyPlayingVideo == this.index;
    },
    videosReady() {
      return this.$store.getters.videosReady;
    },
  },
  methods: {
    nextSong() {
      let nextSong = this.currentlyPlayingVideo + 1;
      this.$store.dispatch("changeSong", nextSong);
    },
    setCurrentPlayingVideo() {
      this.$store.dispatch("setCurrentPlayingVideo", this.index);
    },
    updateReadyStatus() {
      this.$store.dispatch("updateReadyStatus");
    },
  },
  components: {},
  watch: {
    playBackState: function() {
      if (
        this.playBackState == "playing" &&
        this.index == this.currentlyPlayingVideo
      ) {
        this.$refs.youtube.player.playVideo();
      } else if (
        this.playBackState == "paused" &&
        this.index == this.currentlyPlayingVideo
      ) {
        this.$refs.youtube.player.pauseVideo();
      } else {
        this.$refs.youtube.player.stopVideo();
      }
    },
    currentlyPlayingVideo: function() {
      if (this.currentlyPlayingVideo == this.index) {
        this.$refs.youtube.player.playVideo();
      } else {
        this.$refs.youtube.player.stopVideo();
      }
    },
    videosReady: function() {
      if (this.videosReady) {
        setTimeout(() => {
          this.show = true;
        }, 375 * (this.index + 1));
      } else {
        this.show = false;
      }
    },
  },
};
</script>

<style scoped>
.keep {
  transition-duration: 0.75s;
}

.keep:hover {
  background-color: #d8dbe2;
}
.placholderyt {
  width: 300px;
  height: 200px;
  background-color: black;
  /* transition-duration: 0.5s; */
  /* box-shadow: 2px 2px 4px 1px; */
}

.yt-container {
  width: 300px;
  height: 200px;
}

.placholderyt:hover {
  /* width: 301px;
  height: 201px; */
  /* box-shadow: 0 0 4px 1px; */
}

.isCurrent {
  box-shadow: 0 0 4px 1px;
}

a:hover {
  text-decoration: none;
}
</style>
