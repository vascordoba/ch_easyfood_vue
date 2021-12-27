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
import { mapGetters } from "vuex";
import CatalogItem from "@/components/CatalogItem.vue";

export default {
  props: {},
  components: {
    CatalogItem,
  },
  computed: {
    ...mapGetters("adminProducts", { products: "getProducts" }),
  },
  async beforeMount() {
    await this.$store.dispatch("adminProducts/obtainProducts");
  },
};
</script>

<style>
</style>