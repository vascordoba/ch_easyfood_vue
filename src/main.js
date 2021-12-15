import Vue from "vue";
import App from "./App.vue";
//import Storage from "@/services/Storage";
//import Api from "@/plugins/api";
import store from "@/services/Store";
import router from "@/services/Router";

import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.config.productionTip = false;

//to control navigation to login when authenticated or to any other route without a session
router.beforeEach((to, from, next) => {
  if ((to.name !== "auth" || to.path !== "/") && !store.state.profile) next("/");
  else if ((to.name === "auth" || to.path === "/") && store.state.profile) next("/home");
  else next();
});
//adding api plugin
//Vue.use(Api, { baseURL: "https://61b7575464e4a10017d18aa5.mockapi.io/easyfood/api" });

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
