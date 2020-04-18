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
              Account info
            </v-card-title>
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
    export default {
      name: 'Account',
      data: () => ({
        accountOptions: false
      }),
      methods: {
        showAccountOptions() {
          this.accountOptions = true
        }
      }
    }
</script>

<style lang="scss" scoped>

</style>