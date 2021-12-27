<template>
  <div>
    <b-form @submit.prevent="onLogin" v-if="showLogin">
      <b-form-group id="input-group-1" label="Email" label-for="email">
        <b-form-input
          id="email"
          v-model="login.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-2" label="Password" label-for="password">
        <b-form-input
          id="password"
          v-model="login.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" :disabled="isLoginIn">
        <b-spinner small v-show="isLoginIn" />Login
      </b-button>
      <b-button
        type="button"
        variant="info"
        :disabled="isLoginIn"
        @click.prevent="onShowRegister"
        >Register</b-button
      >
    </b-form>

    <b-form @submit.prevent="onRegister" v-else>
      <b-form-group id="rinput-group-1" label="Name" label-for="rname">
        <b-form-input
          id="name"
          v-model="register.name"
          type="text"
          placeholder="Enter name"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group id="rinput-group-2" label="Email" label-for="remail">
        <b-form-input
          id="remail"
          v-model="register.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      <b-form-group id="rinput-group-3" label="Password" label-for="rpassword">
        <b-form-input
          id="rpassword"
          v-model="register.password"
          type="password"
          required
        ></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary" :disabled="isRegisterIn">
        <b-spinner small v-show="isRegisterIn" />Register
      </b-button>
      <b-button
        type="button"
        variant="info"
        :disabled="isRegisterIn"
        @click.prevent="onShowLogin"
        >Go to Login</b-button
      >
    </b-form>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      login: { email: "", password: "" },
      register: { name: "", email: "", password: "" },
      isLoginIn: false,
      isRegisterIn: false,
    };
  },
  computed: {
    ...mapGetters("auth", {
      loginMsg: "getLoginResult",
      registrationMsg: "getRegistrationResult",
      showLogin: "isShowLogin",
    }),
  },
  methods: {
    async onLogin() {
      if (this.login.email == "") {
        alert("Email is required");
      } else if (this.login.password == "") {
        alert("Password is required");
      } else {
        this.isLoginIn = true;
        await this.$store.dispatch("auth/login", this.login);
        if (this.loginMsg !== null) {
          alert(this.loginMsg);
          this.$store.commit("auth/SET_LOGIN_RESULT", null);
        }
        this.isLoginIn = false;
      }
    },
    async onRegister() {
      if (this.register.name == "") {
        alert("Name is required");
      } else if (this.register.email == "") {
        alert("Email is required");
      } else if (this.register.password == "") {
        alert("Password is required");
      } else {
        this.isRegisterIn = true;
        await this.$store.dispatch("auth/register", this.register);
        if (this.registrationMsg !== null) {
          alert(this.registrationMsg);
          this.$store.commit("auth/SET_REGISTRATION_RESULT", null);
        }
        this.isRegisterIn = false;
      }
    },
    onShowRegister() {
      this.$store.commit("auth/TOGGLE_LOGIN");
      this.clearForms();
    },
    onShowLogin() {
      this.$store.commit("auth/TOGGLE_LOGIN");
      this.clearForms();
    },
    clearForms() {
      this.login = { email: "", password: "" };
      this.register = { name: "", email: "", password: "" };
    },
  },
};
</script>

<style>
</style>