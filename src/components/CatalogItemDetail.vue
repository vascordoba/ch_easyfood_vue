<template>
  <b-card
    :title="product.name"
    :img-src="imgUrl"
    :img-alt="product.name"
    img-top
    tag="article"
    style="min-width: 15rem; min-height: 25rem"
    class="mb-2"
  >
    <b-card-text>
      Price: ${{ product.price }} <br />
      <ul>
        <li><b>Calories:</b> {{ product.detail.calories }}</li>
        <li><b>Ingredients:</b> {{ product.detail.ingredients.join(", ") }}</li>
      </ul>
    </b-card-text>

    <b-button size="sm" href="#" variant="primary" @click="onAddOneToCart"
      >Add 1 to cart</b-button
    >
    <b-alert
      variant="success"
      :show="dismissCountDown"
      dismissible
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
      >1 unit added to the Cart</b-alert
    >
  </b-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  props: {
    product: { type: Object, default: null },
  },
  data() {
    return {
      dismissSecs: 3,
      dismissCountDown: 0,
    };
  },
  computed: {
    ...mapGetters("auth", { profile: "getProfile" }),
    ...mapGetters("cart", { cart: "getCart" }),
    imgUrl() {
      return require("@/assets/imgs/" + this.product.img);
    },
  },
  methods: {
    async onAddOneToCart() {
      await this.$store.dispatch("cart/addToCart", this.product);
      await this.$store.dispatch("cart/syncUserCart", {
        email: this.profile.email,
        cart: this.cart,
      });
      this.showAlert();
    },
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
    },
    showAlert() {
      this.dismissCountDown = this.dismissSecs;
    },
  },
};
</script>

<style>
</style>