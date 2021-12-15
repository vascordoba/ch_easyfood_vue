<template>
  <b-container fluid>
    <b-row>
      <b-col cols="3">
        <AdminSidebar />
      </b-col>
      <component :is="adminType" />
    </b-row>
  </b-container>
</template>

<script>
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminProducts from "@/components/admin/AdminProducts";
import AdminUsers from "@/components/admin/AdminUsers";
import EventBus from "@/services/EventBus";
export default {
  components: {
    AdminSidebar,
    AdminProducts,
    AdminUsers,
  },
  created() {
    EventBus.$on("admin-change-menu", (changeMenu) => {
      this.adminType =
        changeMenu.menu === "products" ? AdminProducts : AdminUsers;
    });
  },
  data() {
    return {
      adminType: AdminProducts,
    };
  },
  beforeDestroy() {
    EventBus.$off("admin-change-menu");
  },
};
</script>

<style>
</style>