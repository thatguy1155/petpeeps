<template>
  <div>
    <search-bar />
    <carousel />
    <nearby-list />
  </div>
</template>
<script>
import Carousel from '@/components/Carousel'
import SearchBar from '@/components/SearchBar'
import NearbyList from '@/components/NearbyList'
export default {
  components: {
    Carousel,
    SearchBar,
    NearbyList
  },
  mounted() {
    console.log(this)
  }
}
</script>