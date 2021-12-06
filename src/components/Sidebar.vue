<template>
  <b-nav vertical pills>
    <b-nav-item active @click="showCatalog">Products</b-nav-item>
  </b-nav>
</template>

<script>
import EventBus from "@/services/EventBus";
export default {
  methods: {
    showCatalog() {
      EventBus.$emit("show-catalog");
    },
  },
};
</script>

<style>
</style>