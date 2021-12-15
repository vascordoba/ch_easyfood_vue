<template>
  <b-container fluid>
    <h3>Products in cart</h3>
    <b-row v-show="cartProducts.products.length > 0">
      <b-col cols="4"><b>Product</b></b-col>
      <b-col cols="2"><b>Quantity</b></b-col>
      <b-col cols="3"><b>Unit price</b></b-col>
      <b-col cols="3"><b>Sub total</b></b-col>
    </b-row>
    <cart-item
      v-for="(prod, k) in cartProducts.products"
      :key="k"
      :product="prod"
    />
    <b-row v-show="cartProducts.products.length > 0">
      <b-col cols="9" class="ml-auto"><b>Order total</b></b-col>
      <b-col cols="3"
        ><b>${{ cartTotal.toFixed(2) }}</b></b-col
      >
    </b-row>
    <b-row v-show="!cartProducts.products.length > 0">
      <b-col cols="12"><b>Cart is empty</b></b-col>
    </b-row>
  </b-container>
</template>

<script>
//import Storage from "@/services/Storage";
import CartItem from "./CartItem.vue";
export default {
  components: { CartItem },
  computed: {
    cartProducts() {
      return this.$store.state.cart;
    },
    cartTotal() {
      let total = 0.0;
      for (const p of this.cartProducts.products) {
        total += parseFloat(p.quantity * p.price);
      }
      return total;
    },
  },
};
</script>

<style>
</style>