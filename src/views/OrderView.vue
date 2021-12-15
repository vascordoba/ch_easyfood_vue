<template>
  <b-container fluid>
    <b-row>
      <b-col></b-col>
      <b-col cols="10">
        <Orders />
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import Orders from "@/components/Orders.vue";

export default {
  name: "OrdersView",
  components: {
    Orders,
  },
};
</script>

<style>
</style>