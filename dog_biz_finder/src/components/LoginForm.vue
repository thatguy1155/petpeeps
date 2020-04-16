<template>
    <v-row>
        <v-col cols="3" xs="0" sm="0" md="7" xl="7">
            <!-- this is an empty column used to push the form over -->
            <v-spacer></v-spacer>
        </v-col>
        <v-col cols="8" md="4" xl="4" class="brown lighten-5">
            <v-form
            ref="form"
            v-model="valid"
            lazy-validation
            >
                <v-text-field
                v-model="email"
                label="Email"
                required
                ></v-text-field>

                <v-text-field
                v-model="password"
                label="Password"
                required
                ></v-text-field>


                <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4 mb-1"
                @click="login"
                >
                    Validate
                </v-btn>


            </v-form>
        </v-col>
    </v-row>
    
</template>

<script>
import firebase from 'firebase'
export default {
  name:'Login',
    data: function () {
        return{
            email: '',
            password: ''
        }
    },
    //this is the function that actually does the registering via firebase
    methods: {
        login: function(e) {
            firebase.auth().signInWithEmailAndPassword(this.email,this.password)
                .then(user => {
                    alert(`you are logged in as ${user.email}`)
                    this.$router.push('/');
                },
                err => {
                    alert(err.message)
                })
            e.preventDefault();
        }
    }
  }
</script>

<style scoped>

</style>