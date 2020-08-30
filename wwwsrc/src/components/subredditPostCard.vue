<template>
  <div class="spc-container mx-2">
    <div
      class="yt-container position-relative"
      :class="{ isCurrent: isCurrent, displayOpen: vaultsVisible }"
    >
      <div
        class="animate__animated animate__faster animate__fadeIn"
        :class="{
          disableFunctionality: vaultsVisible,
        }"
      >
        <youtube
          :video-id="subredditId"
          width="300px"
          height="200px"
          ref="youtube"
          :player-vars="playerVars"
          @ended="nextSong"
          @playing="setCurrentPlayingVideo"
          @ready="updateReadyStatus"
          @error="errorHandling"
        ></youtube>
      </div>

      <div
        class="animate__animated animate__faster animate__fadeIn position-absolute vaultsDisplay"
        :class="{
          animate__fadeOut: !vaultsVisible,
          disableFunctionality: !vaultsVisible,
        }"
      >
        <div class=" m-2 vault-display d-flex flex-wrap">
          <div
            v-for="vault in vaults"
            :key="vault.id"
            @click="addRedditKeepToVault(vault.id)"
            class="miniVault m-1"
          >
            {{ vault.name }}
          </div>
        </div>
      </div>
    </div>

    <div class="rounded-bottom text-center keep" v-if="$auth.isAuthenticated">
      <span class="videoButtons" v-if="!inVault" @click="displayVaults"
        ><i class="fas fa-plus"></i
      ></span>
      <span
        class="pl-2 videoButtons delete"
        v-if="inVault"
        @click="openDeleteKeepConfirmationModal"
        ><i class="fas fa-minus"></i
      ></span>
    </div>
    <div class="rounded-bottom text-center keep" v-else>
      <small class="m-0 p-0">login to create playlist</small>
    </div>
  </div>
</template>

<script>
export default {
  name: "subredditPostCard",
  mounted() {
    setTimeout(this.updateReadyStatus, 6000);
  },
  data() {
    return {
      show: false,
      ready: false,
      played: false,
      vaultsVisible: false,
      error: false,
      playerVars: {
        autoplay: 0,
        playsinline: 1,
        fs: 0,
      },
    };
  },
  props: ["subredditId", "index", "subredditName", "inVault", "keepId"],
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
    vaults() {
      return this.$store.state.VaultStore.activeVaults;
    },
  },
  methods: {
    nextSong() {
      console.log("next song");
      let nextSong = this.currentlyPlayingVideo + 1;
      this.$store.dispatch("changeSong", nextSong);
    },
    setCurrentPlayingVideo() {
      this.$store.dispatch("setCurrentPlayingVideo", this.index);
    },
    updateReadyStatus() {
      if (!this.ready) {
        this.$store.dispatch("updateReadyStatus");
        this.ready = true;
      }
    },
    errorHandling() {
      if (!this.error) {
        let nextSong = this.currentlyPlayingVideo + 1;
        this.$store.dispatch("changeSong", nextSong);
        this.error = true;
      }
      console.error("youtube error id: ", this.subredditId);
    },
    displayVaults() {
      console.log("display vaults");
      this.vaultsVisible = !this.vaultsVisible;
    },
    addRedditKeepToVault(vaultId) {
      let keepData = {
        name: "redditKeep",
        description: "found in " + this.subredditName,
        img: this.subredditId,
        isPrivate: false,
        vaultId: vaultId,
      };
      console.log(keepData);
      this.displayVaults();
      this.$store.dispatch("createNewKeep", keepData);
    },
    openDeleteKeepConfirmationModal() {
      $("#deleteConfirmationModal").data("model", "keep");
      $("#deleteConfirmationModal").data("keepid", this.keepId);
      $("#deleteConfirmationModal")
        .find("#span-title")
        .text("Keep");
      $("#deleteConfirmationModal")
        .find("#span-body")
        .text("Song ");
      $("#deleteConfirmationModal").modal("toggle");
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

<style lang="scss" scoped>
@import "../assets/_variables.scss";
.keep {
  opacity: 0;
  transition-duration: 0.5s;
}

.keep:hover {
  opacity: 1;
}

.vaultsDisplay {
  top: 0;
  left: 0;
  background-color: rgba(13, 19, 33, 0.5);
  width: 100%;
  height: 100%;
  overflow-y: auto;
}

.miniVault {
  height: 72px;
  width: 63px;
  transition-duration: 0.25s;
  background-color: rgba(216, 219, 226, 0.9);
  border-radius: 7%;
  font-size: 10px;
  padding: 3px;
  text-align: center;
  color: #155f59;
}

.miniVault:hover {
  background-color: rgba(216, 219, 226, 1);
  color: #1d2d44;
}

.vaultsDisplay::-webkit-scrollbar {
  width: 0em;
}

.disableFunctionality {
  pointer-events: none;
}

.placholderyt {
  width: 300px;
  height: 200px;
  background-color: black;
}

.yt-container {
  width: 300px;
  height: 200px;
  transition-duration: 0.5s;
}

.yt-container:hover {
  box-shadow: 0 0 4px 1px;
}

.isCurrent,
.displayOpen {
  box-shadow: 0 0 4px 1px;
}

.videoButtons {
  cursor: pointer;
}

.delete {
  color: $international-orange-engineering;
}
</style>
