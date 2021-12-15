<template>
  <b-col cols="9">
    <div style="display: flex">
      <h4 style="display: inline">Manage products</h4>
      <b-button
        size="sm"
        variant="info"
        class="ml-auto"
        @click="showForm = true"
        >+</b-button
      >
    </div>
    <!-- PRODUCTS TABLE -->
    <b-table-lite :fields="fields" :items="products" v-if="!showForm">
      <template #cell(detail)="data">
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
      </template>
    </b-table-lite>

    <!-- NEW PRODUCT FORM -->
    <b-form v-else @submit.prevent="saveProduct">
      <b-form-group id="g1" label="Name" label-for="name">
        <b-form-input
          id="name"
          v-model="product.name"
          type="text"
        ></b-form-input>
        <b-form-invalid-feedback :state="validateName">
          Name is required
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validateName">
          It's OK
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group id="g2" label="Price" label-for="price">
        <b-form-input
          id="price"
          v-model="product.price"
          type="number"
          min="0"
          step=".01"
        ></b-form-input>
        <b-form-invalid-feedback :state="validatePrice">
          Price must be a positive number
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validatePrice">
          It's OK
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group id="g3" label="Calories" label-for="calories">
        <b-form-input
          id="calories"
          v-model="product.detail.calories"
          type="number"
          min="0"
          step="1"
        ></b-form-input>
        <b-form-invalid-feedback :state="validateCalories">
          Calories must be a positive number
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validateCalories">
          It's OK
        </b-form-valid-feedback>
      </b-form-group>

      <b-form-group id="g4" label="Ingredients" label-for="ingredients">
        <b-form-textarea
          id="ingredients"
          v-model="product.detail.ingredients"
          placeholder="Enter comma separated values"
          rows="3"
        ></b-form-textarea>
        <b-form-invalid-feedback :state="validateIngredients">
          At least 1 ingredient is required
        </b-form-invalid-feedback>
        <b-form-valid-feedback :state="validateIngredients">
          It's OK
        </b-form-valid-feedback>
      </b-form-group>

      <b-button size="sm" variant="primary" type="submit">{{
        selectedProductId ? "Update" : "Create"
      }}</b-button>
      <b-button size="sm" variant="secondary" @click="cancelForm()"
        >Cancel</b-button
      >
    </b-form>
  </b-col>
</template>

<script>
export default {
  data() {
    return {
      fields: [
        { key: "id", label: "Id" },
        { key: "name", label: "Name" },
        { key: "img", label: "Picture" },
        { key: "price", label: "Price" },
        {
          key: "detail",
          label: "Details",
        },
        { key: "actions", label: "Options" },
      ],
      showForm: false,
      product: {
        name: "",
        img: "placeholder.png",
        price: 0.0,
        detail: { calories: 0, ingredients: "" },
      },
      selectedProductId: null,
    };
  },
  computed: {
    products() {
      return this.$store.state.products;
    },
    validateForm() {
      return (
        this.validateName &&
        this.validatePrice &&
        this.validateCalories &&
        this.validateIngredients
      );
    },
    validateName() {
      return this.product.name.trim() !== "";
    },
    validatePrice() {
      if (
        isNaN(this.product.price) ||
        isNaN(parseFloat(this.product.price)) ||
        parseFloat(this.product.price) <= 0
      ) {
        return false;
      }
      return true;
    },
    validateCalories() {
      if (
        isNaN(this.product.detail.calories) ||
        isNaN(parseInt(this.product.detail.calories)) ||
        parseInt(this.product.detail.calories) <= 0
      ) {
        return false;
      }
      return true;
    },
    validateIngredients() {
      const parts =
        this.product.detail.ingredients instanceof Array
          ? this.product.detail.ingredients
          : this.product.detail.ingredients.split(",");
      if (parts && parts.length > 0 && parts[0].trim() !== "") {
        return true;
      }
      return false;
    },
  },
  methods: {
    imgUrl(img) {
      return require("@/assets/imgs/" + img);
    },
    saveProduct() {
      if (this.validateForm) {
        const newProduct = this.product;
        let ingredients = newProduct.detail.ingredients.split(",");
        newProduct.detail.ingredients = [];
        for (let ingredient of ingredients) {
          newProduct.detail.ingredients.push(ingredient.trim());
        }
        this.$store.dispatch("saveNewProduct", newProduct);
        if (this.selectedProductId !== null) {
          alert("Product updated!");
        } else {
          alert("Product created!");
        }
        this.cancelForm();
      }
    },
    clearForm() {
      this.product = {
        name: "",
        img: "placeholder.png",
        price: 0.0,
        detail: { calories: 0, ingredients: "" },
      };
    },
    editProduct(id) {
      const prodToEdit = JSON.parse(
        JSON.stringify(this.products.filter((p) => p.id === id))
      );
      this.selectedProductId = id;
      prodToEdit[0].detail.ingredients =
        prodToEdit[0].detail.ingredients.join(", ");
      this.product = prodToEdit[0];
      this.showForm = true;
    },
    cancelForm() {
      this.selectedProductId = null;
      this.showForm = false;
      this.clearForm();
    },
    removeProduct(id) {
      if (confirm("Are you sure to remove th product with ID " + id + "?")) {
        this.$store.dispatch("removeProduct", id);
        alert("Product deleted!");
      }
    },
  },
};
</script>

<style></style>
