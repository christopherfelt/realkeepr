<template>
  <!-- <div class="card d-inline-block card-dems">
    <img class="card-img-top" src="" alt="" />
    <div class="card-body">

      <div>
        <img src="//placehold.it/300x200" alt="" />
      </div>
      <p class="card-text">{{ keep.description }}</p>
      <h6>Private</h6>
      <p class="card-text">{{ keep.isPrivate }}</p>
      <h6>Views</h6>
      <p class="card-text">{{ keep.views }}</p>
      <h6>Keeps</h6>
      <p class="card-text">{{ keep.keeps }}</p>
    </div>
  </div> -->
  <div class="card-dems m-1">hello</div>

  <!-- <div class="card" style="width: 18rem;">
    <img
      class="card-img-top"
      src="//placehold.it/300x200"
      alt="Card image cap"
    />
    <div class="card-body">
      <router-link
        v-if="$auth.isAuthenticated"
        :to="{ name: 'keepDetail', params: { keepId: keep.id } }"
      >
        <h4 class="card-title">{{ keep.name }}</h4>
      </router-link>
      <router-link
        v-else
        :to="{ name: 'keepDetailPublic', params: { keepId: keep.id } }"
      >
        <h4 class="card-title">{{ keep.name }}</h4>
      </router-link>
    </div>
  </div> -->
</template>

<script>
export default {
  name: "keepCard",
  data() {
    return {};
  },
  props: ["keep"],
  computed: {},
  methods: {},
  components: {},
};
</script>

<style scoped>
.card-dems {
  width: 300px;
  height: 200px;
  background-color: black;
}
</style>
