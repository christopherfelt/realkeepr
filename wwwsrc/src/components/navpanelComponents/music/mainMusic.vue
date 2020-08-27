<template>
  <div class="mainMusic">
    <div
      class="d-flex justify-content-center p-1 animate__animated animate__fadeInUp"
    >
      <ul class="nav nav-pills" id="pills-tab" role="tablist">
        <li class="nav-item pill-style m-1">
          <a
            class="nav-link p-1"
            id="pills-browse-tab"
            data-toggle="pill"
            href="#pills-browse"
            role="tab"
            aria-controls="pills-browse"
            aria-selected="true"
          >
            <small> Browse </small>
          </a>
        </li>
        <li class="nav-item pill-style m-1">
          <a
            class="nav-link p-1"
            id="pills-search-tab"
            data-toggle="pill"
            href="#pills-search"
            role="tab"
            aria-controls="pills-search"
            aria-selected="false"
          >
            <small>Search</small></a
          >
        </li>
      </ul>
    </div>
    <div class="d-flex justify-content-start ml-5">
      <div class="tab-content" id="pills-tabContent">
        <div
          class="tab-pane"
          id="pills-browse"
          role="tabpanel"
          aria-labelledby="pills-browse-tab"
        >
          <Browse />
        </div>
        <div
          class="tab-pane fade"
          id="pills-search"
          role="tabpanel"
          aria-labelledby="pills-search-tab"
        >
          <Search />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Browse from "./browse/browse.vue";
import Search from "./search/search.vue";
export default {
  name: "mainMusic",
  data() {
    return {};
  },
  computed: {},
  methods: {},
  components: {
    Browse,
    Search,
  },
};
</script>

<style lang="scss" scoped>
@import "../../../assets/_variables.scss";

.nav-pills .nav-link.active,
.nav-pills .show > .nav-link {
  background-color: $deep-jungle-green;
}
</style>
