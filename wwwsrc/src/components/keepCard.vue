<template>
  <div class="m-2 animate__animated animate__fast animate__fadeIn" v-if="show">
    <div class="placholderyt" :class="{ isCurrent: isCurrent }">
      <youtube
        :video-id="keep.img"
        width="300px"
        height="200px"
        ref="youtube"
        @ended="nextSong"
        @playing="setCurrentPlayingVideo"
      ></youtube>
    </div>
    <!-- <img class="placholderyt img-fluid" :src="keep.img" alt="" /> -->

    <router-link
      v-if="$auth.isAuthenticated"
      :to="{ name: 'keepDetail', params: { keepId: keep.id } }"
    >
      <div class=" remove-underline rounded-bottom pl-2 py-1 keep">
        <h6 class="keep-title ">{{ keep.name }}</h6>
      </div>
    </router-link>
    <router-link
      v-else
      :to="{ name: 'keepDetailPublic', params: { keepId: keep.id } }"
    >
      <div class=" remove-underline rounded-bottom text-center py-1 keep">
        <h6 class="keep-title">{{ keep.name }}</h6>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "keepCard",
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 200 * this.index);
  },
  data() {
    return {
      show: false,
    };
  },
  props: ["keep", "index"],
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
  },
  methods: {
    nextSong() {
      let nextSong = this.currentlyPlayingVideo + 1;
      this.$store.dispatch("changeSong", nextSong);
    },
    setCurrentPlayingVideo() {
      this.$store.dispatch("setCurrentPlayingVideo", this.index);
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
  /* background-color: black; */
  transition-duration: 0.5s;
  /* box-shadow: 2px 2px 4px 1px; */
}

.placholderyt:hover {
  /* width: 301px;
  height: 201px; */
  box-shadow: 0 0 4px 1px;
}

.isCurrent {
  box-shadow: 0 0 4px 1px;
}

a:hover {
  text-decoration: none;
}
</style>
