<template>
  <div>
    <Account />
  </div>
</template>

<script>
import Account from '@/components/Account'

export default {
  created() {
    console.log('this', this, 'profile')
  },
  components: {
    Account
  }
}
</script>

<style>

</style>