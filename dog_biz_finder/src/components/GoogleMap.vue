<template>
  <div>
    <gmap-map
      :center="center"
      :zoom="14"
      style="width:100%;  height: 550px;"
    >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center=m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import {gmapApi} from 'vue2-google-maps'

export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Seoul, Gangnam-gu
      center: { lat: 37.532600, lng: 127.024612 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },
  watch: {
    bizList: function() {
      this.addMarker()
    }
  },
  computed: {
    ...mapState('resultModule', {
      bizList: state => state.bizList
    }),
    google: gmapApi
  },
  
  mounted() {
    this.geolocate();
  },

  methods: {
    addMarker() {
      let geocoder = new this.google.maps.Geocoder();

      if (this.bizList) {
        this.markers = []

        for (let i=0; i<this.bizList.length; i++) {
          console.log('add marker: '+this.bizList[i].address)
          geocoder.geocode({'address': this.bizList[i].address}, (results, status) => {
            
            if (status === 'OK') {
              let marker = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng()
              }
              this.markers.push({ position: marker })

              this.center = {
                lat: this.markers[i].position.lat,
                lng: this.markers[i].position.lng
              };
            }

          });
        }
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition(position => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

      });
    }
  }
}
</script>

<style>

</style>