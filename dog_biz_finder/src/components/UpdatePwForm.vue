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
              @keyup.enter="updateUserPw"
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-text-field
              :append-icon="showNewPw ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="[rules.required, rules.min]"
              :type="showNewPw ? 'text' : 'password'"
              name="input-10-2"
              label="New Password"
              hint="At least 8 characters; mixed cased with at least one digit"
              value=""
              v-model="newPw"
              class="input-group--focused"
              @click:append="showNewPw = !showNewPw"
              @keyup.enter="updateUserPw"
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
              @keyup.enter="updateUserPw"
            ></v-text-field>
          </v-col>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="updatePwDialog = false"
              >Close</v-btn
            >
            <v-btn
              color="blue darken-1"
              text
              @click="updateUserPw"
              >Save</v-btn
            >
          </v-card-actions>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "UpdatePwForm",
  data: function() {
    return {
      updatePwDialog: false,
      showCurrPw: false,
      showNewPw: false,
      showConfirmPw: false,
      currentPw: "",
      newPw: "",
      confirmPw: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (value) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(value) || "Min 8 characters, mixed case with at least one digit",
        pwMatch: (value) =>
          this.newPw === value || "The passwords you entered don't match"
      },
    };
  },
  methods: {
    ...mapActions({
      updatePw: "profileModule/updatePw",
    }),
    updateUserPw() {
      let updatePwParams = {
        currentPw: this.currentPw,
        confirmPw: this.confirmPw,
        router: this.$router,
      };
      this.updatePw(updatePwParams);
    } 
  }
};
</script>

<style lang="scss" scoped></style>
