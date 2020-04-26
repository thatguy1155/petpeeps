<template>
  <div>
    <gmap-map :center="center" :zoom="14" style="height: 750px;">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="center = m.position"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { gmapApi } from "vue2-google-maps";

export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Seoul, Gangnam-gu
      center: { lat: 37.5326, lng: 127.024612 },
      markers: [],
      places: [],
      currentPlace: null,
    };
  },
  watch: {
    bizList: function() {
      this.addMarker();
    },
  },
  computed: {
    ...mapState("resultModule", {
      bizList: (state) => state.bizList,
    }),
    google: gmapApi,
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    addMarker() {
      let geocoder = new this.google.maps.Geocoder();

      if (this.bizList) {
        this.markers = [];

        for (let i = 0; i < this.bizList.length; i++) {
          console.log("add marker: " + this.bizList[i].address);
          geocoder.geocode(
            { address: this.bizList[i].address },
            (results, status) => {
              if (status === "OK") {
                let marker = {
                  lat: results[0].geometry.location.lat(),
                  lng: results[0].geometry.location.lng(),
                };
                this.markers.push({ position: marker });

                this.setMapCenter(this.markers[0].position.lat, this.markers[0].position.lng,)

              }
            }
          );
        }
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setMapCenter(position.coords.latitude, position.coords.longitude)
      });
    },
    setMapCenter(latCoords, lngCoords) {
      this.center = {
        lat: latCoords,
        lng: lngCoords
      };
    },
  },
};
</script>

<style></style>
