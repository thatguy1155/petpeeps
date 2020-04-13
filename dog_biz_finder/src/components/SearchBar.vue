<template>
  <div>
    <v-text-field 
      v-model='searchedAddr' 
      @keyup.enter='searchAndPopulate'
    />
  </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      searchedAddr: ''
    }
  },
  methods: {
    ...mapActions({
      'getBizList': 'getBizList'
    }),
    searchAndPopulate() {
      this.getBizList({ searched: this.searchedAddr })
    }
  }
}
</script>