<template>
  <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <Cart />
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import Cart from "@/components/Cart.vue";

export default {
  name: "CartView",
  components: {
    Cart,
  },
};
</script>

<style>
</style>