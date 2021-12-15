import Vue from "vue";
import Vuex from "vuex";
import router from "./Router";

Vue.use(Vuex);

import axios from "axios";
let shajs = require("sha.js");

const axiosInstance = axios.create({
  baseURL: "https://61b7575464e4a10017d18aa5.mockapi.io/easyfood/api",
});

export default new Vuex.Store({
  state: {
    cart: { products: [] },
    profile: null,
    products: [],
    userRegistrationResult: null,
    userLoginResult: null,
    showLogin: true,
    syncResult: null,
    users: [],
    orders: [],
  },
  mutations: {
    login(state, profile) {
      state.profile = profile;
      state.cart = { userEmail: profile.email, products: [] };
    },
    logout(state) {
      state.profile = null;
      state.cart = { products: [] };
    },
    setRegistrationResult(state, msg) {
      state.userRegistrationResult = msg;
    },
    setLoginResult(state, msg) {
      state.userLoginResult = msg;
    },
    toggleLogin(state) {
      state.showLogin = !state.showLogin;
    },

    setProducts(state, prods) {
      state.products = prods;
    },

    loadCart(state, cart) {
      state.cart = cart;
    },
    addToCart(state, prod) {
      let inCart = state.cart.products.find((ic) => ic.id === prod.id);
      if (inCart) {
        inCart.quantity++;
        const otherProds = state.cart.products.filter((p) => p.id !== prod.id);
        state.cart = [...otherProds, inCart];
      } else {
        prod.quantity = 1;
        state.cart.products.push(prod);
      }
    },
    syncCartResult(state, result) {
      state.syncResult = result;
    },

    setUsers(state, users) {
      state.users = users;
    },

    setOrders(state, orders) {
      state.orders = orders;
    }
  },
  actions: {
    async login(context, userData) {
      const response = await axiosInstance.get("/users?email=" + userData.email);
      if (response.status === 200 && response.data.length === 1) {
        const profile = response.data[0];
        if (profile.password === shajs("sha512").update(userData.password).digest("hex")) {
          delete profile["password"];
          context.commit("login", profile);
          await context.dispatch("getUserCart", userData.email);
          router.push("/home");
        } else {
          context.commit("setLoginResult", "User or password incorrect");
        }
      } else {
        context.commit("setLoginResult", "An error has occurred. Please, try again later");
      }
    },

    async register(context, userReg) {
      const newUser = {
        name: userReg.name,
        email: userReg.email,
        password: shajs("sha512").update(userReg.password).digest("hex"),
        role: "USER",
      };

      const response = await axiosInstance.post("/users", newUser);
      if (response.status >= 200) {
        context.commit("setRegistrationResult", "Use registered successfully!");
        context.commit("toggleLogin");
      } else {
        context.commit("setRegistrationResult", "An error has occurred. Please, try again later");
      }
    },

    async getProducts(context) {
      const response = await axiosInstance.get("/products");
      if (response.status === 200 && response.data.length > 0) {
        context.commit("setProducts", response.data);
      }
    },

    async getUserCart(context, email) {
      const response = await axiosInstance.get("/cart?userEmail=" + email);
      if (response.status === 200 && response.data.length > 0) {
        context.commit("loadCart", response.data[0]);
      }
    },

    addToCart(context, prod) {
      context.commit("addToCart", prod);
    },

    async syncUserCart(context, data) {
      const response = await axiosInstance.get("/cart?userEmail=" + data.email);
      let responseUpdate = null;
      if (response.status === 200 && response.data.length > 0) {
        responseUpdate = await axiosInstance.put("/cart/" + data.cart.id, data.cart);
      } else {
        responseUpdate = await axiosInstance.post("/cart", data.cart);
        context.commit("loadCart", responseUpdate.data);
      }
    },

    async saveNewProduct(context, prod) {
      let response = null;
      if (prod.id !== undefined) {
        response = await axiosInstance.put("/products/" + prod.id, prod);
      } else {
        response = await axiosInstance.post("/products", prod);
      }

      if (response.status >= 200 && response.status < 400) {
        context.dispatch("getProducts");
      }
    },

    async removeProduct(context, prodId) {
      const response = await axiosInstance.delete("/products/" + prodId);
      if (response.status >= 200 && response.status < 400) {
        context.dispatch("getProducts");
      }
    },

    async getUsers(context) {
      const response = await axiosInstance.get("/users");
      if (response.status === 200 && response.data.length > 0) {
        context.commit("setUsers", response.data);
      }
    },

    async getOrders(context) {
      const response = await axiosInstance.get("/orders?userId=" + context.state.profile.id);
      if (response.status === 200 && response.data.length > 0) {
        context.commit("setOrders", response.data);
      }
    },
  },
});
