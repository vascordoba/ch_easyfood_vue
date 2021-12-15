<template>
  <b-card
    :title="product.name"
    :img-src="imgUrl"
    :img-alt="product.name"
    img-top
    tag="article"
    style="min-width: 20rem; min-height: 25rem; max-width: 24rem"
    class="mb-2"
  >
    <b-card-text> Price: ${{ product.price }} </b-card-text>

    <b-button
      size="sm"
      href="#"
      variant="primary"
      @click="$bvModal.show('modal-' + product.id)"
      >More info</b-button
    >
    <b-modal
      :id="'modal-' + product.id"
      :title="product.name"
      ok-only
      button-size="sm"
    >
      <CatalogItemDetail :product="product" />
    </b-modal>
  </b-card>
</template>

<script>
import CatalogItemDetail from "./CatalogItemDetail.vue";
export default {
  components: { CatalogItemDetail },
  props: {
    product: { type: Object, default: null },
  },
  computed: {
    imgUrl() {
      return require("@/assets/imgs/" + this.product.img);
    },
  },
};
</script>

<style>
</style>