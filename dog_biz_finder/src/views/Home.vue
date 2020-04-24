<template>
  <div>
    <search-bar />
    <google-map />
    <nearby-list />
  </div>
</template>
<script>
import SearchBar from '@/components/SearchBar'
import NearbyList from '@/components/NearbyList'
import GoogleMap from '@/components/GoogleMap'

export default {
  components: {
    SearchBar,
    NearbyList,
    GoogleMap
  },
  data() {
    return {
    };
  },
  computed: {
    },
}
</script>
<style scoped>
</style>