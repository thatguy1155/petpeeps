<template>
  <v-container>
     <v-row >
        <v-col :cols=4>
            <v-avatar
            size="200"
            tile
            >
              <v-img src='@/assets/profile_icon.png'></v-img>
            </v-avatar>
        </v-col>
        <v-col :cols=8>
          <v-card
            shaped
            outlined
            height="200"
          >
            <v-card-title>
              {{ this.user.name }}
            </v-card-title>
            <v-card-text class="d-flex justify-start">
              <p>Email: {{ this.user.email }}</p>
              <p>Type of account: {{ this.user.accountType }}</p>
            </v-card-text>
            <v-card-actions>
               <v-btn text @click="showAccountOptions">Account settings</v-btn>
            </v-card-actions>
             <v-card-actions v-show="accountOptions">
               <v-btn text @click="changePassword">Change password</v-btn>
               <v-btn text @click="deleteAccount">Delete account</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
    </v-row>
  </v-container>  
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'Account',
    data: () => ({
      accountOptions: false
    }),
    methods: {
      ...mapActions({
        'getUser': 'profileModule/getUser'
      }),
      showAccountOptions() {
        this.accountOptions = true
      },
      changePassword() {
        return;
      },
      deleteAccount() {
        return;
      }
    },
    computed: {
      ...mapState('profileModule', {
        user: state => state.user
      })
    },
    created() {
      this.getUser();
      this.user;
    }
  }
</script>

<style lang="scss" scoped>

</style>