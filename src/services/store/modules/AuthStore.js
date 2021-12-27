import axios from "axios";
import router from "../../Router";
const axiosInstance = axios.create({
  baseURL: "https://61b7575464e4a10017d18aa5.mockapi.io/easyfood/api",
});
let shajs = require("sha.js");

export default {
  namespaced: true,
  state: {
    profile: null,
    userRegistrationResult: null,
    userLoginResult: null,
    showLogin: true,
  },
  mutations: {
    LOGIN(state, profile) {
      state.profile = profile;
      state.cart = { userEmail: profile.email, products: [] };
    },
    LOGOUT(state) {
      state.profile = null;
      state.cart = { products: [] };
    },
    SET_REGISTRATION_RESULT(state, msg) {
      state.userRegistrationResult = msg;
    },
    SET_LOGIN_RESULT(state, msg) {
      state.userLoginResult = msg;
    },
    TOGGLE_LOGIN(state) {
      state.showLogin = !state.showLogin;
    },

  },
  actions: {
    async login(context, userData) {
      const response = await axiosInstance.get("/users?email=" + userData.email);
      if (response.status === 200 && response.data.length === 1) {
        const profile = response.data[0];
        if (profile.password === shajs("sha512").update(userData.password).digest("hex")) {
          delete profile["password"];
          context.commit("LOGIN", profile);
          await context.dispatch("cart/obtainUserCart", userData.email, { root: true });
          router.push("/home");
        } else {
          context.commit("SET_LOGIN_RESULT", "User or password incorrect");
        }
      } else {
        context.commit("SET_LOGIN_RESULT", "An error has occurred. Please, try again later");
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
        context.commit("SET_REGISTRATION_RESULT", "Use registered successfully!");
        context.commit("TOGGLE_LOGIN");
      } else {
        context.commit("SET_REGISTRATION_RESULT", "An error has occurred. Please, try again later");
      }
    },
  },
  getters: {
    getProfile(state) {
      return state.profile;
    },
    getLoginResult(state) {
      return state.userLoginResult
    },
    getRegistrationResult(state) {
      return state.userRegistrationResult;
    },
    isShowLogin(state) {
      return state.showLogin
    }
  }
};