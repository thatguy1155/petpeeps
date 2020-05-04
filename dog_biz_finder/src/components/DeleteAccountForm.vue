<template>
  <v-dialog v-model="dltAccountDialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Delete Account</v-btn>
    </template>
    <v-card v-if="signInMethod === 'password'">
      <v-container>
        <v-spacer />
        <v-row class="d-flex justify-center">
          <p>Are you sure you want to delete your account?</p>
        </v-row>
        <v-row class="d-flex justify-center">
          <v-col cols="8">
            <v-text-field
              :append-icon="showCurrPw ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showCurrPw ? 'text' : 'password'"
              name="input-10-2"
              label="Current Password"
              value=""
              v-model="currentPw"
              class="input-group--focused"
              @click:append="showCurrPw = !showCurrPw"
            ></v-text-field>
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dltAccountDialog = false"
              >Close</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="deleteUserAccount"
              >Delete</v-btn
            >
          </v-card-actions>
        </v-row>
      </v-container>
    </v-card>
    <!-- Delete modal for other signin methods (social media) -->
    <v-card v-else>
      <v-container>
        <v-card-text>
          Are you sure you want to permanently delete your account and all the related data? 
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dltAccountDialog = false"
            >Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="deleteUserSocialAccount"
            >Delete
          </v-btn>
        </v-card-actions>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DeleteAccountForm",
  props: [
    'signInMethod'
  ],
  data: function() {
    return {
      dltAccountDialog: false,
      showCurrPw: false,
      currentPw: "",
    };
  },
  methods: {
    ...mapActions({
      deleteUser: "profileModule/deleteUser",
      deleteSocialUser: "profileModule/deleteSocialUser"
    }),
    deleteUserAccount() {
      let dltAccountParams = {
        currentPw: this.currentPw,
        router: this.$router
      };
      this.deleteUser(dltAccountParams);
    },
    deleteUserSocialAccount() {
      let params = {
        router: this.$router
      }
      this.deleteSocialUser(params);
    }
  },
};
</script>
