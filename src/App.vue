<template>
  <div id="app">
    <Chat v-if="user"></Chat>
    <Login v-else></Login>
  </div>
</template>

<script>
import Login from './components/Login';
import Chat from './components/Chat';
import { getAuth } from "firebase/auth";

export default {
  name: 'App',
  data() {
  return {
    user: getAuth().currentUser
  }
  },
  components: {
    Chat, Login
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
