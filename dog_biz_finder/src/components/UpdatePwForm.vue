<template>
  <v-dialog v-model="updatePwDialog" max-width="500px">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">Change password</v-btn>
    </template>
    <v-card>
      <v-container>
        <v-row>
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
          <v-col cols="6">
            <v-text-field
              :append-icon="showNewPw ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showNewPw ? 'text' : 'password'"
              name="input-10-2"
              label="New Password"
              hint="At least 8 characters"
              value=""
              v-model="newPw"
              class="input-group--focused"
              @click:append="showNewPw = !showNewPw"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :append-icon="showConfirmPw ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.pwMatch]"
              :type="showConfirmPw ? 'text' : 'password'"
              name="input-10-2"
              label="Confirm Password"
              value=""
              v-model="confirmPw"
              class="input-group--focused"
              @click:append="showConfirmPw = !showConfirmPw"
            ></v-text-field>
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="updatePwDialog = false"
              >Close</v-btn
            >
            <v-btn color="blue darken-1" text @click="updatePw">Save</v-btn>
          </v-card-actions>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import firebase from "firebase";

export default {
  name: "UpdatePwForm",
  data: function() {
    return {
      updatePwDialog: false,
      showCurrPw: false,
      showNewPw: false,
      showConfirmPw: false,
      password: "Password",
      currentPw: "",
      newPw: "",
      confirmPw: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (value) => value.length >= 8 || "Min 8 characters",
        pwMatch: (value) =>
          this.newPw === value || "The passwords you entered don't match",
      },
    };
  },
  methods: {
    //Update the current user's password, after first reauthenticating the user 
    updatePw() {
      let currentUser = firebase.auth().currentUser;
      //Pass on reauthResult(Boolean); if true (reauthentication successful) then update password
      this.reauthenticateUser().then((reauthResult) => {
        if (reauthResult) {
          currentUser
            .updatePassword(this.confirmPw)
            .then(() => {
              console.log("Password update successful");
              this.logout();
            })
            .catch(function(error) {
              console.log("Password update unsuccessful ", error);
            });
        }
      });
    },
    //Reauthenticate the current user's password before carrying out security-sensitive actions
    reauthenticateUser() {
      let currentUser = firebase.auth().currentUser;
      let credential = firebase.auth.EmailAuthProvider.credential(
        currentUser.email,
        this.currentPw
      );
      //Return true if credentials are correct and pass the value 
      return currentUser
        .reauthenticateWithCredential(credential)
        .then(() => {
          console.log("reauthentication success");
          return true;
        })
        .catch((error) => {
          console.log("reauthentication failed", error);
          return false;
        });
    },
    //Log current user out
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.go({path: this.$router.path});
        console.log('signout successful');
      })
    }
  },
};
</script>

<style lang="scss" scoped></style>
