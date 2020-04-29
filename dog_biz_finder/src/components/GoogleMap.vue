<template>
  <div>
    <gmap-map :center="center" :zoom="14" class="gmap">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="m.selectBiz(); setMapCenter(m.position.lat, m.position.lng)"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { gmapApi } from "vue2-google-maps";

export default {
  name: "GoogleMap",
  data() {
    return {
      // default to Seoul, Gangnam-gu
      center: { lat: 37.5326, lng: 127.024612 },
      markers: [],
      places: [],
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
      selectedBiz: (state) => state.selectedBiz,
    }),
    google: gmapApi,
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    ...mapActions({
      setSelectedBiz: "resultModule/setSelectedBiz",
    }),
    addMarker() {
      let geocoder = new this.google.maps.Geocoder();
      if (this.bizList) {
        this.markers = [];
        for (let i = 0; i < this.bizList.length; i++) {
          let business = this.bizList[i];
          geocoder.geocode({ address: business.address }, (results, status) => {
            if (status === "OK") {
              let markerPosition = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              };
              let marker = {
                position: markerPosition,
                address: business.address,
                selectBiz: () =>
                  this.setSelectedBiz({
                    business: this.bizList[i],
                    markerPosition: markerPosition,
                  }),
              };
              this.markers.push(marker);

              this.setMapCenter(
                this.markers[0].position.lat,
                this.markers[0].position.lng
              );
            }
          });
        }
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setMapCenter(position.coords.latitude, position.coords.longitude);
      });
    },
    setMapCenter(latCoords, lngCoords) {
      this.center = {
        lat: latCoords,
        lng: lngCoords,
      };
    },
  },
};
</script>

<style scoped>
.gmap {
  height: 758px;
}

@media only screen and (min-device-width: 375px) and (max-device-height: 812px) and (-webkit-device-pixel-ratio: 3) {
  .gmap {
    height: 608px;
  }
}
</style>
