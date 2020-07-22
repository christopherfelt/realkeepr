<template>
  <router-link :to="{ name: 'vaultDetail', params: { vaultId: vault.id } }">
    <div
      v-if="show"
      class="vaultCard m-1 p-3 text-center rounded animate__animated animate__fadeIn"
    >
      <div class="">
        <h6 class="">{{ vault.name }}</h6>
      </div>
    </div>
  </router-link>
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

<style scoped>
.vaultCard {
  width: 175px;
  height: 200px;
  transition-duration: 0.75s;
  background-color: lightgray;
}

.vaultCard:hover {
  background-color: #d8dbe2;
}
a:hover {
  text-decoration: none;
}
</style>
