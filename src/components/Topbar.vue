<template>
  <b-navbar sticky toggleable="lg" type="light" variant="light">
    <b-navbar-brand to="/">EasyFood</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav v-if="profile">
      <!--b-navbar-nav>
        <b-nav-item href="#">Link</b-nav-item>
        <b-nav-item href="#" disabled>Disabled</b-nav-item>
      </b-navbar-nav-->

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item to="/home">Home</b-nav-item>
        <b-nav-item to="/cart"
          >My cart
          <b-badge v-show="cartCount">{{ cartCount }}</b-badge></b-nav-item
        >
        <b-nav-item to="/orders">My orders</b-nav-item>
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->

          <template #button-content>
            <em>{{ profile.name }}</em>
          </template>
          <b-dropdown-item v-if="profile.role === 'ADMIN'" to="/admin"
            >Settings</b-dropdown-item
          >
          <b-dropdown-item @click="closeSession">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters("auth", { profile: "getProfile" }),
    ...mapGetters("cart", { cartCount: "getCartCount" }),
  },
  methods: {
    closeSession() {
      this.$store.commit("auth/LOGOUT");
      this.$router.push("/");
    },
  },
};
</script>

<style>
</style>