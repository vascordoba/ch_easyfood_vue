<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3" md="4"> </b-col>
      <b-col cols="6" md="4">
        <Login />
      </b-col>
      <b-col cols="3" md="4"> </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Login from "@/components/Login.vue";
export default {
  name: "AuthView",
  props: {
    profile: { type: Object, default: null },
  },
  components: {
    Login,
  },
};
</script>

<style>
</style>