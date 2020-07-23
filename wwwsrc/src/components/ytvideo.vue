<template>
  <div class="yt-video d-inline">
    <youtube
      :video-id="videoId"
      width="300px"
      height="200px"
      ref="youtube"
      @ended="nextSong"
      @playing="setCurrentPlayingVideo"
    ></youtube>
    <!-- <div class="test">
      hello
    </div> -->
  </div>
</template>

<script>
export default {
  name: "yt-video",
  data() {
    return {};
  },
  props: ["videoId", "playlistIndex"],
  computed: {
    currentlyPlayingVideo() {
      return this.$store.state.currentlyPlayingVideo;
    },
    playBackState() {
      return this.$store.state.playBackState;
    },
  },
  methods: {
    nextSong() {
      let nextSong = this.currentlyPlayingVideo + 1;
      this.$store.dispatch("changeSong", nextSong);
    },
    setCurrentPlayingVideo() {
      this.$store.dispatch("setCurrentPlayingVideo", this.playlistIndex);
    },
  },
  components: {},
  watch: {
    playBackState: function() {
      if (
        this.playBackState == "playing" &&
        this.playlistIndex == this.currentlyPlayingVideo
      ) {
        this.$refs.youtube.player.playVideo();
      } else if (
        this.playBackState == "paused" &&
        this.playlistIndex == this.currentlyPlayingVideo
      ) {
        this.$refs.youtube.player.pauseVideo();
      } else {
        this.$refs.youtube.player.stopVideo();
      }
    },
    currentlyPlayingVideo: function() {
      if (this.currentlyPlayingVideo == this.playlistIndex) {
        console.log("match");
        console.log(this.videoId);
        this.$refs.youtube.player.playVideo();
      } else {
        this.$refs.youtube.player.stopVideo();
      }
    },
  },
};
</script>

<style scoped>
.test {
  border: 1px solid black;
  display: inline-block;
  height: 200px;
  width: 300px;
}
</style>
