import Vue from "vue";
import Vuex from "vuex";
import CartStore from "./modules/CartStore";
import AuthStore from "./modules/AuthStore";
import AdminProductsStore from "./modules/AdminProductsStore";
import AdminUsersStore from "./modules/AdminUsersStore";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    cart: CartStore,
    auth: AuthStore,
    adminProducts: AdminProductsStore,
    adminUsers: AdminUsersStore
  }
});
