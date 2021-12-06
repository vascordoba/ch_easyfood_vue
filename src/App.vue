<template>
  <b-container fluid>
    <Topbar :profile="profile" :cart="shoopingCart" />

    <b-row v-if="profile">
      <b-col cols="3">
        <Sidebar />
      </b-col>
      <b-col cols="9">
        <Catalog v-if="catalogVisible" />
        <Cart v-else :cartProducts="shoopingCart" />
      </b-col>
    </b-row>
    <b-row v-else>
      <b-col cols="4"> </b-col>
      <b-col cols="4">
        <Login />
      </b-col>
      <b-col cols="4"> </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Topbar from "@/components/Topbar.vue";
import Sidebar from "@/components/Sidebar.vue";
import Catalog from "@/components/Catalog.vue";
import Login from "@/components/Login.vue";

import EventBus from "@/services/EventBus";
import Storage from "@/services/Storage";
import Cart from "@/components/Cart.vue";

export default {
  name: "App",
  components: {
    Topbar,
    Sidebar,
    Catalog,
    Login,
    Cart,
  },
  data() {
    return {
      profile: null,
      shoopingCart: [],
      catalogVisible: true,
    };
  },
  created() {
    this.profile = Storage.getSession("profile");

    EventBus.$on("register-user", (data) => {
      Storage.pushLocal("users", data);
    });

    EventBus.$on("login-user", (creds) => {
      const res = Storage.login(creds);
      if (res) {
        this.profile = res;
      } else {
        alert("There is not user " + creds.email + " registered");
      }
    });

    EventBus.$on("logout", () => {
      this.profile = null;
      Storage.logout();
    });

    EventBus.$on("add-to-cart", (prod) => {
      const prodInCart = this.shoopingCart.find((p) => p.id === prod.id);
      if (prodInCart) {
        prodInCart.quantity++;
        const otherProds = this.shoopingCart.filter((p) => p.id !== prod.id);
        this.shoopingCart = [...otherProds, prodInCart];
      } else {
        prod.quantity = 1;
        this.shoopingCart.push(prod);
      }
    });

    EventBus.$on("show-cart", () => {
      this.catalogVisible = false;
    });

    EventBus.$on("show-catalog", () => {
      this.catalogVisible = true;
    });
  },
  beforeDestroy() {
    EventBus.$off("register-user");
    EventBus.$off("login-user");
    EventBus.$off("logout");
    EventBus.$off("add-to-cart");
    EventBus.$off("show-cart");
    EventBus.$off("show-catalog");
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
