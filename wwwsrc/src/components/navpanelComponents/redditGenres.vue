<template>
  <div class="redditGenres postion-relative">
    <div class="rounded text-center backButton" @click="goBackToMainBrowseMenu">
      <i class="fas fa-chevron-left fa-xs"></i>
    </div>
    <div
      class="ml-4 mt-2 genresContainer animate__animated"
      :class="{
        animate__fadeInLeft: false,
        animate__fadeOutLeft: !genreMenuVisibilityStatus,
        animate__fast: false,
      }"
    >
      <h6 class="ml-3">Genres</h6>
      <div class="genreContainer">
        <ul class="nav flex-column nav-tab" id="myTab" role="tablist">
          <li class="nav-item" v-for="genre in genres" :key="genre">
            <a
              class="nav-link py-0"
              data-toggle="tab"
              role="tab"
              :href="'#' + genre"
              @click="changeVisibilityStatus()"
            >
              {{ genre }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div
      class="tab-content position-absolute animate__animated position-zero"
      id="myTabContent"
      :class="{
        animate__fadeInRight: tabsPanelsVisibilityStatus,
        animate__faster: !tabsPanelsVisibilityStatus,
        animate__fadeOutRight: !tabsPanelsVisibilityStatus,
      }"
    >
      <div
        class="tab-pane fade "
        :id="genre"
        role="tabpanel"
        aria-labelledby="muscaic-tab"
        v-for="(genre, index) in genres"
        :key="genre"
      >
        <RedditGenre
          :genre="genre"
          :index="index"
          @backButtonClicked="changeVisibilityStatusBack"
        />
      </div>
    </div>
  </div>
</template>

<script>
import RedditGenre from "@/components/navpanelComponents/redditGenre.vue";
export default {
  name: "redditGenres",
  mounted() {
    this.$store.dispatch("getSubredditsByGenre");
  },
  data() {
    return {
      genreMenuVisibilityStatus: true,
      tabsPanelsVisibilityStatus: false,
    };
  },
  computed: {
    genres() {
      return this.$store.state.RedditStore.genres;
    },
  },
  methods: {
    goBackToMainBrowseMenu() {
      this.$emit("backButtonClick");
    },
    changeVisibilityStatus() {
      this.genreMenuVisibilityStatus = false;
      this.tabsPanelsVisibilityStatus = true;
    },
    changeVisibilityStatusBack() {
      this.tabsPanelsVisibilityStatus = false;
      this.genreMenuVisibilityStatus = true;
    },
  },
  components: {
    RedditGenre,
  },
};
</script>

<style scoped>
.backButton {
  color: #6f9b98;
  width: 18px;
  height: 18px;
  transition-duration: 500ms;
  cursor: pointer;
}

.backButton:hover {
  color: #1c3534;
}

.genreList {
  border: 1px solid red;
}

.genreContainer {
  font-size: 13px;
}

.genresContainer {
  color: #155f59;
}

.position-zero {
  top: 0;
  left: 0;
}
</style>
