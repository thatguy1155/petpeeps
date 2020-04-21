<template>
  <div>
    <account-options v-show="emptyAccountType" />
    <account />

    <v-divider :inset="inset" horizontal color="brown" width="100%"></v-divider>
  
    <add-animal id="animalButton"/>
     <v-layout row justify-center>
      <v-flex xs2>
        <v-card dark color="primary">
          <v-card-text>one</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card dark color="secondary">
          <v-card-text>two</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2>
        <v-card dark color="accent">
          <v-card-text>three</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <add-biz id="bizButton"/>
    
  </div>
</template>

<script>
import Account from "@/components/Account";
import AccountOptions from "@/components/AccountOptions";
import AddAnimal from "@/components/AddAnimal";
import AddBiz from "@/components/AddBiz";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Account,
    AccountOptions,
    AddAnimal,
    AddBiz
  },
  data: () => ({
    emptyAccountType: false,
    inset: false,
    items: ["default", "vertical"],
    variant: "default"
  }),
  methods: {
    ...mapActions({
      getUser: "profileModule/getUser"
    }),
    checkAccountTypeStatus() {
      if (this.user.accountType === "") {
        this.emptyAccountType = true;
      }
    }
  },
  computed: {
    ...mapState("profileModule", {
      user: state => state.user
    })
  },
  created() {
    this.getUser();
    this.checkAccountTypeStatus();
  }
};
</script>

<style>
#animalButton {
  float: left;

}
#bizButton {
  float: right;

}
</style>

