<template>
  <div>
    <account-options v-show="!!accountType" />
    <account />
  </div>
</template>

<script>
import Account from '@/components/Account'
import AccountOptions from '@/components/AccountOptions'
import { mapState, mapActions } from 'vuex'

export default {
  components: {
    Account,
    AccountOptions
  },
  data: () => ({
    accountType: this.user.accountType
  }),
  methods: {
    ...mapActions({
      'getCurrentUser': 'profileModule/getCurrentUser'
    })
  },
  computed: {
    ...mapState('profileModule', {
      user: state => state.user
    })
  },
  created() {
    console.log('this components', this)
    this.getCurrentUser();
    
  }
}
</script>

<style></style>
