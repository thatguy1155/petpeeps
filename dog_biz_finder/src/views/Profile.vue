<template>
  <div>
    <account-options v-show="!!accountType" />
    <account />
  </div>
</template>

<script>
import Account from '@/components/Account'
import AccountOptions from '@/components/AccountOptions'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  components: {
    Account,
    AccountOptions
  },
  methods: {
    ...mapActions({
      'getCurrentUser': 'profileModule/getCurrentUser'
    })
  },
  computed: {
    ...mapState('profileModule', {
      user: state => state.user
    }),
    ...mapGetters({
      accountType: 'profileModule/accountType'
    })
  },
  created() {
    this.getCurrentUser();  
  }
}
</script>

<style></style>
