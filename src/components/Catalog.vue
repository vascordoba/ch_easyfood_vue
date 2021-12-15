<template>
  <b-container fluid>
    <h3>Products</h3>
    <b-row>
      <b-col v-for="(prod, k) in products" :key="k">
        <CatalogItem :product="prod" />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CatalogItem from "@/components/CatalogItem.vue";

export default {
  props: {},
  components: {
    CatalogItem,
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
  },
  async beforeMount() {
    await this.$store.dispatch("getProducts");
  },
};
</script>

<style>
</style>