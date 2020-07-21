<template>
  <div
    v-if="show"
    class="card d-inline-block card-dems mx-1 animate__animated animate__fadeIn"
  >
    <img class="card-img-top" src="" alt="" />
    <div class="card-body">
      <router-link :to="{ name: 'vaultDetail', params: { vaultId: vault.id } }">
        <h4 class="card-title">{{ vault.name }}</h4>
      </router-link>
      <!-- <h6>Description</h6>
      <p class="card-text">{{ vault.description }}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "vaultCard",
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
  props: ["vault", "index"],
  computed: {},
  methods: {},
  components: {},
};
</script>

<style scoped></style>
