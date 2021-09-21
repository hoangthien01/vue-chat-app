<template>
  <div class="wrapper">
    <header>
      <h1>Chat with Firebase!</h1>
      <button @click="logout" class="logout-btn">Logout!</button>
    </header>

    <section>
      <main ref="scrollable">
        
        <div v-for="(msg, index) in messages" v-bind:key="'index-'+index"
             :class="['message', sentOrReceived(msg.userUID)]">
          <img :src="msg.photoURL" :alt="msg.displayName">
          <p>{{ msg.text }}</p>
        </div>
      </main>

      <div class="input-form">
        <form v-on:submit.prevent="sendMessage">
          <input v-model="message" type="text" placeholder="Enter your message!">
          <button :disabled="!message" type="submit">Send </button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { getFirestore ,collection, orderBy,addDoc,where,getDocs,query  } from "firebase/firestore"; 
import { getAuth } from 'firebase/auth'

export default {
  async mounted() {
    const q = query(collection(this.db, "messages"), where("createdAt", "!=", ""),orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.messages.push(doc.data());
    });
  },
  data() {
    return {
      user: getAuth().currentUser,
      db: getFirestore(),
      message: '',
      messages: [],
    }
  },
  updated() {
      this.$refs['scrollable'].lastElementChild.scrollIntoView(false)
  },
  methods: {
    logout() {
      getAuth().signOut()
    },
    sentOrReceived(userUID) {
      return userUID === this.user.uid ? 'sent' : 'received'
    },
    async sendMessage() {
      const messageInfo = {
        'userUID': this.user.uid,
        'displayName': this.user.displayName,
        'photoURL': this.user.photoURL,
        'text': this.message,
        'createdAt': Date.now(),
      }
      await addDoc(collection(this.db, "messages"),messageInfo);
      this.message = ''
      this.messages.push(messageInfo);
    }
  }
}
</script>

<style lang="scss">
  body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
  }
  .scrollable {
    height: 25px;
  }
  .wrapper {
    text-align: center;

    header {
      background-color: #ea526f;
      height: 10vh;
      min-height: 56px;
      color: white;
      position: fixed;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px;
      box-sizing: border-box;
      z-index: 99;
      font-size: 12px;

      .logout-btn {
        background-color: #fff; 
        border: none;
        color: #000;
        padding: 10px 25px;
        text-align: center;
        border-radius: 5px;
        text-decoration: none;
        cursor: pointer;
        font-size: 20px;
      }
    }

    section {
      height: 100vh;
      background-color: #fff;
      padding: 10vh 0 13vh;
      

      main {
        overflow-y: scroll;
        padding: 10px 0;
        height: 100%;

        &::-webkit-scrollbar {
          width: 0.25rem;
        }
        &::-webkit-scrollbar-track {
          background: #1e1e24;
        }
        &::-webkit-scrollbar-thumb {
          background: #6649b8;
        }
      }

      .input-form {
        height: 13vh;
        position: fixed;
        bottom: 0;
        background-color: #fff;
        width: 100%;
        font-size: 20px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        // box-shadow:12px 0px 0px rgba(100, 100, 100, 0.2);
        border-top: 2px solid #ccc;

        form {
          display: flex;
          align-items: center;
          width: 100%;
          border-radius: 8px;
          overflow: hidden;

          button {
            width: 20%;
            height: 46px;
            text-align: center;
            cursor: pointer;
            border: none;
            color: #fff;
            font-size: 20px;
            background-color: #ea526f;
          }
          input {
            line-height: 1.5;
            width: 100%;
            font-size: 1.5rem;
            background: #F3F3F3;
            color: #000;
            outline: none;
            border: none;
            padding: 5px 10px;
          }
        }
      }
    }
   
    input {
      color: #fff;
      border: none;
    }

    .message {
      display: flex;
      align-items: center;
      margin-bottom: 12px;

      &.received {
        p {
          background: #e5e5ea;
          color: #000;
        }
      }
      &.sent {
        flex-direction: row-reverse;
        p {
          color: #fff;
          background: #0b93f6;
          align-self: flex-end;
        }
      }
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        margin: 2px 5px;
      }
      p {
        max-width: 500px;
        line-height: 24px;
        padding: 10px 20px;
        border-radius: 25px;
        position: relative;
        color: #fff;
        text-align: center;
      }
    }
  }
</style>