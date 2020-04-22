<template>
  <div>
    <search-bar />
    <google-map />
    <!-- <gmap-map
      :center="center"
      :zoom="14"
      style="width:100%;  height: 600px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map> -->
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