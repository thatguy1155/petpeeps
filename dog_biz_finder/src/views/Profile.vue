<template>
  <div>
    <!-- if there is no account type data in the current user, show the component to select a type -->
    <account-options v-show="!accountType" />
    <account />
    <div v-if="accountType === 'personal'">
      <total-animal />
    </div>
    <div v-else-if="accountType === 'business'">
      <total-biz />
    </div>
  </div>
</template>

<script>
import Account from "@/components/Account";
import AccountOptions from "@/components/AccountOptions";
import TotalAnimal from "@/components/TotalAnimal";
import TotalBiz from "@/components/TotalBiz";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    Account,
    AccountOptions,
    TotalAnimal,
    TotalBiz,
  },
  data: () => {
    return {};
  },
  methods: {
    ...mapActions({
      getCurrentUser: "profileModule/getCurrentUser"
    })
  },
  computed: {
    ...mapState("profileModule", {
      user: state => state.user
    }),

    // Get the current user's account type from store

    ...mapGetters({
      accountType: "profileModule/accountType"
    })
  },
  created() {
    // Get current user when the component is created
    this.getCurrentUser();
  }
};
</script>

<style>
</style>

