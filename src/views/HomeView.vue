<template>
  <b-container fluid>
    <b-row>
      <b-col> </b-col>
      <b-col cols="10">
        <Catalog />
      </b-col>
      <b-col> </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Catalog from "@/components/Catalog.vue";

export default {
  name: "HomeView",
  props: {
    profile: { type: Object, default: null },
  },
  components: {
    Catalog,
  },
};
</script>

<style>
</style>