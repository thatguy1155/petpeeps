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
          :append-icon="showPwd ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPwd = !showPwd"
          :type="showPwd ? 'text' : 'password'"
          @keyup.enter="login"
          required
        ></v-text-field>

        <div id="firebaseui-auth-container"></div>
        <div>
          <v-btn width=40% :disabled="!valid" color="success" class="mr-4 mb-2" @click="login">Login</v-btn>
        </div>
        <div>
          <v-btn width=40% color="warning" class="mr-4 mb-1" @click="goTo(registerPath)">Sign Up</v-btn>
        </div>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import * as firebase from 'firebase'
import { mapActions } from "vuex";
import axios from 'axios'
export default {
  name:'Login',
    data: function () {
        return{
            valid: true,
            email: '',
            password: '',
            showPwd: false,
            registerPath: '/signup',
            googleUserName: '',
            googleUserEmail: '',
            googleUserCredential: ''
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
        },
        ...mapActions({
        'addSocialUserToDb': 'profileModule/addSocialUserToDb',
        
      }),
    },
    
  mounted() {
    const firebase = require("firebase");
    const firebaseui = require("firebaseui");
    const uiConfig = {
      callbacks: {
        signInSuccessWithAuthResult: (authResult) => {
          console.log(authResult.additionalUserInfo.profile.name)
          console.log(authResult.additionalUserInfo.profile.email)
          console.log(authResult.credential)
          console.log('redurecturl')

          const creationParams = {
                  email: authResult.additionalUserInfo.profile.email,
                  displayName: authResult.additionalUserInfo.profile.name,
                  uid: authResult.user.uid,
                  router: this.$router
                }
            
          this.addSocialUserToDb(creationParams)
          return true;
        },
      },
      // comment signInFlow to swith to sign in with redirect 
      signInFlow: 'popup',
      signInSuccessUrl: "/profile",
      signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    };
    let ui = firebaseui.auth.AuthUI.getInstance()
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
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
  width: 75%;
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