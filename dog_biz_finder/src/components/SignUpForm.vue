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
                v-model="username"
                :rules="nameRules"
                label="Name"
                required
                ></v-text-field>

                <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
                ></v-text-field>

                <v-text-field
                v-model="password"
                :rules="passRules"
                label="Password"
                required
                ></v-text-field>

                <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Item"
                    required
                ></v-select>


                <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4 mb-1"
                @click="register"
                >
                    Sign Up
                </v-btn>


                <v-btn
                    color="warning"
                    class="mb-1"
                    @click="resetValidation"
                    >
                    Reset
                </v-btn>
            </v-form>
        </v-col>
    </v-row>
    
</template>

<script>
import firebase from 'firebase'
export default {
    data: () => ({
      valid: true,
      username: '',
      nameRules: [
        v => !!v || 'Name is required',
        //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      password: '',
      passRules: [
        v => !!v || 'A password is required',
        v => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(v) || 'Password should be mixed cased with at least one digit and 8 or more characters',
      ],
      
      select: null,
      items: [
        'Dog Parent',
        'Business',
      ],
      checkbox: false,
    }),

    methods: {
        register: function(e) {
            if (this.$refs.form.validate()){
                firebase.auth().createUserWithEmailAndPassword(this.email,this.password)
                .then(user => {
                    alert(`account creater for ${user.email}`);
                    this.$router.push('/');
                },
                err => {
                    alert(err.message)
                })
            e.preventDefault();
            }
        },
    //   validate () {
    //     this.$refs.form.validate()
    //   },
      
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>

<style scoped>

</style>