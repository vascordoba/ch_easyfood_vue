import Vue from "vue";
import VueRouter from "vue-router";

import AuthView from "@/views/AuthView";
import HomeView from "@/views/HomeView";
import CartView from "@/views/CartView";
import OrderView from "@/views/OrderView";
import AdminView from "@/views/AdminView";

Vue.use(VueRouter);

const routes = [
  { path: "/", name: "auth", component: AuthView, props: true },
  { path: "/home", name: "home", component: HomeView, props: true },
  { path: "/cart", name: "cart", component: CartView, props: true },
  { path: "/orders", name: "orders", component: OrderView, props: true },
  { path: "/admin", name: "admin", component: AdminView, props: true },
];

const router = new VueRouter({
  routes,
  base: process.env.BASE_URL,
  mode: "history",
});

export default router;
