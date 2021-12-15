import axios from "axios";
//import Sha512 from "sha.js/sha512";
let shajs = require("sha.js");

const Api = {};
Api.install = (Vue, options) => {
  const axiosInstance = axios.create({
    baseURL: options.baseURL,
  });

  //mock remote login
  Vue.prototype.$apiLogin = async (email, password) => {
    const response = await axiosInstance.get("/users?email=" + email);
    if (response.status === 200 && response.data.length === 1) {
      const profile = response.data[0];
      if (profile.password === shajs("sha512").update(password).digest("hex")) {
        delete profile["password"];
        return profile;
      }
    }
    return null;
  };

  //remote user registration
  Vue.prototype.$apiRegister = async (userReg) => {
    const newUser = {
      name: userReg.name,
      email: userReg.email,
      password: shajs("sha512").update(userReg.password).digest("hex"),
      role: "USER",
    };

    const response = await axiosInstance.post("/users", newUser);
    if (response.status >= 200) {
      return true;
    }
    return false;
  };

  //remote get products
  Vue.prototype.$apiGetProducts = async () => {
    const response = await axiosInstance.get("/products");
    if (response.status === 200 && response.data.length > 0) {
      return response.data;
    }
    return [];
  };
};

export default Api;
