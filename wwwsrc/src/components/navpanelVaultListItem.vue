<template>
  <div class="navpanelVaultListItem animate__animated animate__fadeIn">
    {{ vault.name }} - {{ vault.show }} {{ index }}
  </div>
</template>

<script>
export default {
  name: "navpanelVaultListItem",
  mounted() {
    this.show();
  },
  data() {
    return {};
  },
  computed: {},
  props: ["vault", "index"],
  methods: {
    show() {
      let delay = 500 * this.index + 100;
      var self = this;
      setTimeout(() => {
        self.vault.show = true;
        console.log("hello form time out");
      }, delay);
      console.log("hello after time aout");
    },
  },
  components: {},
};
</script>

<style scoped></style>
