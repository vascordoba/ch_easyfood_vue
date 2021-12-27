import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://61b7575464e4a10017d18aa5.mockapi.io/easyfood/api",
});

export default {
  namespaced: true,
  state: {
    products: [],
  },
  mutations: {
    SET_PRODUCTS(state, prods) {
      state.products = prods;
    },
  },
  actions: {
    async obtainProducts(context) {
      const response = await axiosInstance.get("/products");
      if (response.status === 200 && response.data.length > 0) {
        context.commit("SET_PRODUCTS", response.data);
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
        context.dispatch("obtainProducts");
      }
    },
    async removeProduct(context, prodId) {
      const response = await axiosInstance.delete("/products/" + prodId);
      if (response.status >= 200 && response.status < 400) {
        context.dispatch("obtainProducts");
      }
    },
  },
  getters: {
    getProducts(state) {
      return state.products;
    }
  }
};