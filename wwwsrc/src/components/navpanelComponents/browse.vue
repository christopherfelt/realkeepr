<template>
  <div class="browse position-relative">
    <div
      class="animate__animated"
      :class="{ animate__fadeOutLeft: invisibleStatus }"
    >
      <ul class="nav flex-column nav-tab" id="myTab" role="tablist">
        <li class="nav-item">
          <a
            class="nav-link"
            data-toggle="tab"
            role="tab"
            href="#musaic-community"
            @click="changeInvisibilityStatus()"
            >Musaic Community</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" role="tab" href="#reddit"
            >Reddit</a
          >
        </li>
        <li class="nav-item">
          <a class="nav-link" data-toggle="tab" role="tab" href="#">Link</a>
        </li>
      </ul>
    </div>
    <div class="tab-content position-absolute position-zero" id="myTabContent">
      <div
        class="tab-pane fade animate__animated animate__fadeInRight"
        id="musaic-community"
        role="tabpanel"
        aria-labelledby="muscaic-tab"
      >
        Musaic Community
      </div>
      <div
        class="tab-pane fade"
        id="reddit"
        role="tabpanel"
        aria-labelledby="reddit-tab"
      >
        reddit stuff
      </div>
    </div>
  </div>
</template>

<script>
import "animate.css";
export default {
  name: "browse",
  data() {
    return {
      invisibleStatus: false,
    };
  },
  computed: {},
  methods: {
    changeInvisibilityStatus() {
      console.log("invisibeStatus");
      this.invisibleStatus = true;
    },
  },
  components: {},
};
</script>

<style scoped>
.position-zero {
  top: 0;
  left: 0;
}
</style>
