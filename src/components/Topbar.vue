<template>
  <b-navbar sticky toggleable="lg" type="light" variant="light">
    <b-navbar-brand href="#">EasyFood</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav v-if="profile">
      <!--b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav-->

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="cart" @click="showCart">Cart</b-nav-item>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->

          <template #button-content>
            <em>{{ profile.name }}</em>
          </template>
          <b-dropdown-item @click="closeSession">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import EventBus from "@/services/EventBus";

export default {
  props: {
    profile: { type: Object, default: null },
    cart: { type: Array, default: null },
  },
  methods: {
    closeSession() {
      EventBus.$emit("logout");
    },
    showCart() {
      EventBus.$emit("show-cart");
    },
  },
};
</script>

<style>
</style>