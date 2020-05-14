<template>
  <div>
    <gmap-map :center="mapCenter" :zoom="14" ref= "mapRef" class="gmap">
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m.position"
        :icon="isSelected(m)"
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
      places: []

    };
  },
  watch: {
    bizList: function() {
      this.addMarker();
    }
  },
  computed: {
    ...mapState("resultModule", {
      bizList: (state) => state.bizList,
      selectedBiz: (state) => state.selectedBiz,
      mapCenter: (state) => state.mapCenter
    }),
    google: gmapApi,
  },

  mounted() {
    this.geolocate();
    this.$refs.mapRef.$mapPromise.then(async () => {
      this.searchLocal() 
    })
  },

  methods: {
    ...mapActions({
      setSelectedBiz: "resultModule/setSelectedBiz",
      setMapCenter: "resultModule/setMapCenter",
      changeSelectedGu: "resultModule/changeSelectedGu",
      changeSelectedSi: "resultModule/changeSelectedSi",
    }),
    addMarker() {
      let geocoder = new this.google.maps.Geocoder();
      if (this.bizList) {
        this.markers = [];
        for (let i = 0; i < this.bizList.length; i++) {
          let business = this.bizList[i];
          geocoder.geocode({ address: business.bizAddr }, (results, status) => {
            if (status === "OK") {
              let markerPosition = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              };

              // Create a marker object that has the method selectBiz which sets a selected business object in the Vuex store
              let marker = {
                position: markerPosition,
                address: business.bizAddr,
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
    //function for actually getting the geocoded address. return result as callback
    getLocationData(callback) {
      let geocoder = new this.google.maps.Geocoder();
      const latlng = this.mapCenter;
      if( geocoder ) {
        geocoder.geocode({ 'location': latlng }, function (results, status) {
          if( status == this.google.maps.GeocoderStatus.OK ) {
            callback(results[0].formatted_address);
          }
        });
      }
    },
    
    searchLocal(){
      let self = this //crucial for accessing outside functions 
      this.getLocationData(function(locationData) {  //function accessing the callback from getlocation data.
        let cityResult = /Seoul/.exec(locationData) 
        if(cityResult){
          cityResult = '서울특별시'
        }
        let result = /\b\w*-gu\w*\b/g.exec(locationData);   //regex extracting words with -gu
        let guTranslate = {
          'Gangnam-gu':"강남구",
          'Gandong-gu':"강동구",
          'Gangbuk-gu':"강북구",
          'Gangseo-gu':"강서구",
          'Gwanak-gu':"관악구",
          'Gwangjin-gu':"광진구",
          'Guro-gu':"구로구",
          'Geumcheon-gu':"금천구",
          'Nowon-gu':"노원구",
          'Dobong-gu':"도봉구",
          'Dongdaemun-gu':"동대문구",
          'Dongjak-gu':"동작구",
          'Mapo-gu':"마포구",
          'Seodaemun-gu':"서대문구",
          'Seocho-gu':"서초구",
          'Seongdong-gu':"성동구",
          'Seongbuk-gu':"성북구",
          'Songpa-gu':"송파구",
          'Yangcheon-gu':"양천구",
          'Yeongdeungpo-gu':"영등포구",
          'Yongsan-gu':"용산구",
          'Eunpyeong-gu':"은평구",
          'Jongno-gu':"종로구",
          'Jung-gu':"중구",
          'Jungnang-gu':"중랑구",
        }
        self.changeSelectedGu(guTranslate[result[0]]) //send gu in korean to the result module to update the searchbar
        self.changeSelectedSi(cityResult)
      })
    },
    /**
     * take the item from biz list from v-for in gmapmarker
     * see if the address matches that of selected biz.
     * if so show the selected image, else show the unselected inmage
     */
    isSelected(object){
      if(object.address ===this.selectedBiz.business.bizAddr){
        return { url: require('@/assets/orange_paw_2.png')}
      } else {
        return { url: require('@/assets/brown_paw.png')}
      }
    }
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
