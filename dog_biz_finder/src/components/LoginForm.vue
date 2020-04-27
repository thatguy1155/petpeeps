<template>
  <v-row>
    <v-col cols="3" xs="0" sm="0" md="7" xl="7">
      <!-- this is an empty column used to push the form over -->
      <v-spacer></v-spacer>
    </v-col>
    <v-col cols="8" md="4" xl="4" class="brown lighten-5">
      <v-form ref="form" @submit="login" v-model="valid" lazy-validation>
        <v-text-field v-model="email" label="Email" required></v-text-field>

        <v-text-field
        
          v-model="password"
          label="Password"
          :append-icon="password ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="() => (password = !password)"
          :type="password ? 'password' : 'text'"
          required
        ></v-text-field>

        <div id="firebaseui-auth-container"></div>

        <v-btn :disabled="!valid" color="success" class="mr-4 mb-1" @click="login">Validate</v-btn>

        <v-btn color="warning" class="mr-4 mb-1" @click="goTo(registerPath)">Sign Up</v-btn>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
//var firebase = require('firebase');
//var firebaseui = require('firebaseui');
//var ui = new firebaseui.auth.AuthUI(firebase.auth());
import firebase from 'firebase'
import axios from 'axios'
export default {
  name:'Login',
    data: function () {
        return{
            valid: true,
            email: '',
            password: '',
            registerPath: '/signup'
        }
    },
    //this is the function that actually does the registering via firebase
    methods: {
        goTo(path) {
          this.$router.push(path)
        },
        login: function(e) {
            firebase.auth().signInWithEmailAndPassword(this.email,this.password)
                .then(() => {
                    alert(`you are logged in as ${this.email}`)
                    axios.get('http://dogpeeps?action=getUserInfo&uid=Ip4PfKfU4sdqcD0AkBD4uCF8A8K2')
                      .then(res => {this.answer=res.data;
                      console.log(this.answer['login'])})
                      .catch(err => console.log(err))
                    this.$router.push('/')
                    //this.$router.go({path: this.$router.path});
                },
                err => {
                    alert(err.message)
                })
            e.preventDefault();
        }
    },
    
  mounted() {
    const firebase = require("firebase");
    const firebaseui = require("firebaseui");
    const uiConfig = {
      signInSuccessUrl: "/",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };
    const ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start("#firebaseui-auth-container", uiConfig);
  }
};
</script>

<style>
#firebaseui-auth-container img {
  height: 20px;
  margin-right: 5px;
  margin-left: 5px;
}
#firebaseui-auth-container {
  padding: 0 0 20px 0;
  font-size: 1.5em;
  margin: auto;
}

ul {
  list-style: none;
}

.firebaseui-idp-google {
  padding: 5px 20px;
  border-radius: 10px;
  margin-left: -40px;
  box-shadow: 0px 2px #bbb;
}

.firebaseui-idp-text-short {
  display: none;
}
</style>