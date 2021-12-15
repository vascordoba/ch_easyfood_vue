<template>
  <b-nav vertical pills>
    <b-nav-item
      :active="menuActive == 'products'"
      @click="() => onMenuChange('products')"
      >Manage products</b-nav-item
    >
    <b-nav-item
      :active="menuActive == 'users'"
      @click="() => onMenuChange('users')"
      >Manage users</b-nav-item
    >
  </b-nav>
</template>

<script>
import EventBus from "@/services/EventBus";
export default {
  data() {
    return {
      menuActive: "products",
    };
  },
  methods: {
    onMenuChange(menu) {
      this.menuActive = menu;
      EventBus.$emit("admin-change-menu", { menu });
    },
  },
};
</script>

<style>
</style>