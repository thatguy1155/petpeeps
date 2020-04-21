<template>
  <div>
    <account-options v-show="emptyAccountType" />
    <account />

    <v-divider :inset="inset" horizontal color="brown" width="100%"></v-divider>
  
    <add-animal id="animalButton"/>
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

