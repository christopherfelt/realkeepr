<template>
  <div
    v-show="show"
    class="navpanelVaultListItem animate__animated animate__fadeIn"
  >
    {{ vault.name }}
  </div>
</template>

<script>
export default {
  name: "navpanelVaultListItem",
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 300 * this.index);
  },

  data() {
    return {
      show: false,
    };
  },
  computed: {},
  props: ["vault", "index"],
  methods: {},
  components: {},
};
</script>

<style scoped></style>
