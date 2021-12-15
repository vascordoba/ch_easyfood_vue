<template>
  <div id="app" class="container-fluid">
    <Topbar :profile="profile" />
    <router-view :profile="profile" />
  </div>
</template>

<script>
import Topbar from "@/components/Topbar";

export default {
  name: "App",
  components: {
    Topbar,
  },
  data() {
    return {
      profile: null,
    };
  },
  created() {
    this.profile = this.$store.state.profile;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
