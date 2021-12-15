<template>
  <b-col cols="9">
    <div style="display: flex">
      <h4 style="display: inline">Manage Users</h4>
    </div>
    <!-- USERS TABLE -->
    <b-table-lite :fields="fields" :items="users">
      <!--template #cell(detail)="data">
        <ul>
          <li v-for="(det, i) in data.item.detail" :key="i">
            {{ i }}: {{ det instanceof Array ? det.join(", ") : det }}
          </li>
        </ul>
      </template>
      <template #cell(img)="data">
        <b-img :src="imgUrl(data.item.img)" width="100" />
      </template>
      <template #cell(actions)="row">
        <b-button
          v-if="row.item.id > 9"
          size="sm"
          class="mr-1"
          title="Edit"
          @click="editProduct(row.item.id)"
          ><b-icon-pencil
        /></b-button>
        <b-button
          v-if="row.item.id > 9"
          size="sm"
          variant="danger"
          title="Remove"
          @click="removeProduct(row.item.id)"
          ><b-icon-trash
        /></b-button>
      </template-->
    </b-table-lite>
  </b-col>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { key: "id", label: "Id" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
      ],
    };
  },
  beforeMount() {
    this.$store.dispatch("getUsers");
  },
  computed: {
    users() {
      return this.$store.state.users;
    },
  },
};
</script>

<style></style>
