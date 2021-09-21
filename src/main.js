import Vue from 'vue'
import App from './App.vue'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyCmhyqsHICHc4QMZArtYk17mxwYlrYLEU8",
  authDomain: "vue-chat-app-ad476.firebaseapp.com",
  databaseURL: "https://vue-chat-app-ad476-default-rtdb.firebaseio.com",
  projectId: "vue-chat-app-ad476",
  storageBucket: "vue-chat-app-ad476.appspot.com",
  messagingSenderId: "484201730110",
  appId: "1:484201730110:web:4ea58559f7e986b329816f",
  measurementId: "G-MYS2G9X8YX"
};

initializeApp(firebaseConfig);
const auth = getAuth();
onAuthStateChanged(auth,() => 
    new Vue({
      render: h => h(App),
    }).$mount('#app')
)
