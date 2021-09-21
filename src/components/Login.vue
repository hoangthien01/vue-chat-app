<template>
  <div class="wrapper">
    <div class="login-form">
      <h1>Login to FireChat!</h1>
      <button class="login-btn" @click="login">Login With Google!</button>
    </div>
  </div>
</template>

<script>
import {getAuth,signInWithRedirect, GoogleAuthProvider} from "firebase/auth";
export default {
  name : 'Login',
  methods: {
    login() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      signInWithRedirect (auth,provider)
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper {
  background-color: #ea526f;
  height: 100vh;

  .login-form {
    width: 90%;
    max-width: 500px;
    position: absolute;
    border-radius: 10px;
    transform: translate(-50%,-50%);
    top: 50%;
    left: 50%;
    background-color: #fff;
    text-align: center;
    padding: 20px;

    h1 {
      color: #AAA;
      font-size: 28px;
    }

    .login-btn {
      width: 100%;
      color: pink;
      padding: 10px;
      border-radius: 5px;
      border: none;
      cursor: pointer;
      color: #fff;
      background-color: #ea526f;
      font-size: 20px;
      font-weight: 600;
      margin-top: 20px;
    }
  }
}
</style>