<template>
  <b-row>
    <b-col cols="4">{{ product.name }}</b-col>
    <b-col cols="2">{{ product.quantity }}</b-col>
    <b-col cols="3">{{ product.price }}</b-col>
    <b-col cols="3">{{
      parseFloat(product.price * product.quantity).toFixed(2)
    }}</b-col>
  </b-row>
</template>

<script>
import EventBus from "@/services/EventBus";

export default {
  props: { product: { type: Object, default: null } },
  methods: {
    onAddOneToCart() {
      EventBus.$emit("addToCart", this.product);
    },
  },
};
</script>

<style>
</style>