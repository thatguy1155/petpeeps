<template>
  <div>
    <gmap-map :center="mapCenter" :zoom="14" class="gmap">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="
          m.selectBiz();
          setMapCenter(m.position);
        "
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
      mapCenter: (state) => state.mapCenter,
    }),
    google: gmapApi,
  },

  mounted() {
    this.geolocate();
  },

  methods: {
    ...mapActions({
      setSelectedBiz: "resultModule/setSelectedBiz",
      setMapCenter: "resultModule/setMapCenter",
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

              // Create a marker object that has the method selectBiz which sets a selected business object in the Vuex store
              let marker = {
                position: markerPosition,
                address: business.address,
                selectBiz: () =>
                  this.setSelectedBiz({
                    business: this.bizList[i],
                  }),
              };
              this.markers.push(marker);
              this.setMapCenter(markerPosition);
            }
          });
        }
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setMapCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
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
