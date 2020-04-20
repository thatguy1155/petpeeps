<template>
  <div>
    <account-options v-show="emptyAccountType" />
    <account />
    <add-animal />
    <add-biz />
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
    emptyAccountType: false
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

<style></style>

