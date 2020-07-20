<template>
  <div class="card d-inline-block card-dems">
    <img class="card-img-top" src="" alt="" />
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

      <h6>Description</h6>
      <p class="card-text">{{ keep.description }}</p>
      <h6>Private</h6>
      <p class="card-text">{{ keep.isPrivate }}</p>
      <h6>Views</h6>
      <p class="card-text">{{ keep.views }}</p>
      <h6>Keeps</h6>
      <p class="card-text">{{ keep.keeps }}</p>
    </div>
  </div>
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
  width: 200px;
  height: auto;
}
</style>
