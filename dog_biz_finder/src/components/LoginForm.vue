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
                v-model="name"
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


                <v-btn
                :disabled="!valid"
                color="success"
                class="mr-4 mb-1"
                @click="validate"
                >
                    Validate
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
export default {
    data: () => ({
      valid: true,
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
        //v => (v && v.length <= 10) || 'Name must be less than 10 characters',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      select: null,
      items: [
        'Dog Parent',
        'Business',
      ],
      checkbox: false,
    }),

    methods: {
      validate () {
        this.$refs.form.validate()
      },
      
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>

<style scoped>

</style>