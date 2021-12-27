import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "https://61b7575464e4a10017d18aa5.mockapi.io/easyfood/api",
});

export default {
  namespaced: true,
  state: {
    users: [],
  },
  mutations: {
    SET_USERS(state, users) {
      state.users = users;
    },
  },
  actions: {
    async obtainUsers(context) {
      const response = await axiosInstance.get("/users");
      if (response.status === 200 && response.data.length > 0) {
        context.commit("SET_USERS", response.data);
      }
    },
  },
  getters: {
    getUsers(state) {
      return state.users;
    }
  }
};