import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://61b7575464e4a10017d18aa5.mockapi.io/easyfood/api",
});

export default {
  namespaced: true,
  state: {
    cart: { products: [] },
    orders: [],
  },
  mutations: {
    LOAD_CART(state, cart) {
      state.cart = cart;
    },
    ADD_TO_CART(state, prod) {
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
    SET_ORDERS(state, orders) {
      state.orders = orders;
    }
  },
  actions: {
    async obtainUserCart(context, email) {
      const response = await axiosInstance.get("/cart?userEmail=" + email);
      if (response.status === 200 && response.data.length > 0) {
        context.commit("LOAD_CART", response.data[0]);
      } else {
        context.commit("LOAD_CART", { products: [] });
      }
    },

    addToCart(context, prod) {
      context.commit("ADD_TO_CART", prod);
    },

    async syncUserCart(context, data) {
      const response = await axiosInstance.get("/cart?userEmail=" + data.email);
      let responseUpdate = null;
      if (response.status === 200 && response.data.length > 0) {
        responseUpdate = await axiosInstance.put("/cart/" + data.cart.id, data.cart);
      } else {
        responseUpdate = await axiosInstance.post("/cart", data.cart);
        context.commit("LOAD_CART", responseUpdate.data);
      }
    },

    async obtainOrders(context, userId) {
      const response = await axiosInstance.get("/orders?userId=" + userId);
      if (response.status === 200 && response.data.length > 0) {
        context.commit("SET_ORDERS", response.data);
      }
    },
  },
  getters: {
    getCart(state) {
      return state.cart;
    },
    getCartCount(state) {
      let total = 0;
      if (state.cart && state.cart.products && state.cart.products.length > 0) {
        state.cart.products.map(p => total += p.quantity)
      }
      return total;
    },
    getCartTotal(state) {
      let total = 0.0;
      if (state.cart && state.cart.products && state.cart.products.length > 0) {
        state.cart.products.map(p => total += p.quantity * p.price)
      }
      return total;
    },
    getOrders(state) {
      return state.orders;
    }
  }
};