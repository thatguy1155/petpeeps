<template>
  <div>
    <div>
      <!-- <h2>Search and add a pin</h2> -->
      <!-- <label>
        <gmap-autocomplete
          @place_changed="setPlace">
        </gmap-autocomplete>
        <button @click="addMarker">Search</button>
      </label> -->

    </div>
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
import {gmapApi} from 'vue2-google-maps'

export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Seoul
      center: { lat: 37.532600, lng: 127.024612 },
      markers: [],
      places: [],
      currentPlace: null
    };
  },

  computed: {
      google: gmapApi
    },
  
  mounted() {
    this.geolocate();
  },

  methods: {
    // receives a place object via the autocomplete component
    setPlace(place) {
      this.currentPlace = place;
    },
    addMarker() {
      if (this.currentPlace) {
        const marker = {
          lat: this.currentPlace.geometry.location.lat(),
          lng: this.currentPlace.geometry.location.lng()
        };
        this.markers.push({ position: marker });
        this.places.push(this.currentPlace);
        this.center = marker;
        this.currentPlace = null;
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