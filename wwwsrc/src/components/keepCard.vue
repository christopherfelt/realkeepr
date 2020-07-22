<template>
  <div class="m-2 animate__animated animate__fast animate__fadeIn" v-if="show">
    <!-- <div class="placholderyt"></div> -->
    <img class="placholderyt img-fluid" :src="keep.img" alt="" />
    <router-link
      v-if="$auth.isAuthenticated"
      :to="{ name: 'keepDetail', params: { keepId: keep.id } }"
    >
      <div class=" remove-underline rounded-bottom pl-2 py-1 keep">
        <h6 class="keep-title ">{{ keep.name }}</h6>
      </div>
    </router-link>
    <router-link
      v-else
      :to="{ name: 'keepDetailPublic', params: { keepId: keep.id } }"
    >
      <div class=" remove-underline rounded-bottom text-center py-1 keep">
        <h6 class="keep-title">{{ keep.name }}</h6>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "keepCard",
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
  props: ["keep", "index"],
  computed: {},
  methods: {},
  components: {},
};
</script>

<style scoped>
.keep {
  transition-duration: 0.75s;
}

.keep:hover {
  background-color: #d8dbe2;
}
.placholderyt {
  width: 300px;
  height: 200px;
  /* background-color: black; */
  transition-duration: 0.5s;
  /* box-shadow: 2px 2px 4px 1px; */
}

.placholderyt:hover {
  width: 301px;
  height: 201px;
  box-shadow: 0 0 4px 1px;
}

a:hover {
  text-decoration: none;
}
</style>
