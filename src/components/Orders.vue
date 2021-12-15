<template>
  <b-container fluid>
    <h4>My Orders</h4>
    <b-row v-show="orders.length > 0">
      <b-col cols="2"><b>Id</b></b-col>
      <b-col cols="4"><b>Order date</b></b-col>
      <b-col cols="3"><b>Items</b></b-col>
      <b-col cols="3"><b>Total</b></b-col>
    </b-row>
    <order-item v-for="(order, k) in orders" :key="k" :order="order" />
    <b-row v-show="orders.length === 0">
      <b-col cols="12"><b>No orders so far</b></b-col>
    </b-row>
  </b-container>
</template>

<script>
import OrderItem from "./OrderItem.vue";
export default {
  components: { OrderItem },
  beforeMount() {
    this.$store.dispatch("getOrders");
  },
  computed: {
    orders() {
      return this.$store.state.orders;
    },
  },
};
</script>

<style>
</style>