<template>
  <div id="app" class="container-fluid">
    <Topbar :profile="profile" />
    <router-view :profile="profile" />
  </div>
</template>

<script>
import Topbar from "@/components/Topbar";
import { mapGetters } from "vuex";
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
  computed: {
    ...mapGetters("auth", ["getProfile"]),
  },
  created() {
    this.profile = this.getProfile;
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
