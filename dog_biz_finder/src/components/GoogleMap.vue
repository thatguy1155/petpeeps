<template>
  <div>
    <gmap-map :center="center" :zoom="14" class="gmap">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        @click="
          m.selectBiz();
          center = {
          lat: selectedBiz.markerPosition.lat,
          lng: selectedBiz.markerPosition.lng,
        }
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
      //Default center to Gangnamgu, Seoul
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
    this.setMapCenter();
  },

  methods: {
    ...mapActions({
      setSelectedBiz: "resultModule/setSelectedBiz",
      // updateBizList: "resultModule/updateBizList"
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
                lng: results[0].geometry.location.lng()
              };

              // this.updateBizList({ index: i, coords: markerPosition });

              // Create a marker object that has the method selectBiz which sets a selected business object in the Vuex store
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
              this.setMapCenter();
            }
          });
        }
      }
    },
    setMapCenter() {
      //If there are markers (list of biz) then set the center to the marker position
      if (this.markers.length > 0) {
        this.center = {
          lat: this.markers[0].position.lat,
          lng: this.markers[0].position.lng,
        };
      } else {
        //If there are no markers yet, set map center to the current location of user
        this.geolocate();
      }
    },
    geolocate() {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
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
