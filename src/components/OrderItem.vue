<template>
  <b-row>
    <b-col cols="2">{{ order.id }}</b-col>
    <b-col cols="4">{{ order.date }}</b-col>
    <b-col cols="3">{{ orderItemsCount }}</b-col>
    <b-col cols="3">{{ parseFloat(order.total).toFixed(2) }}</b-col>
  </b-row>
</template>

<script>
export default {
  props: { order: { type: Object, default: null } },
  computed: {
    orderItemsCount() {
      let count = 0;
      this.order.items.map((item) => {
        count += item.quantity;
      });
      return count;
    },
  },
};
</script>

<style>
</style>