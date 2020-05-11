<template>
  <v-container class="bizList">
    <v-row justify="center">
      <v-col
        cols="12"
        xs="6"
        sm="8"
        md="10"
        lg="12"
        xl="12"
        v-if="bizList.length > 0"
      >
        <v-row justify="center">
          <bizlist-arrow-button
            v-show="bizList.length > 1"
            arrowType="left"
            :disabled="reachedMaxLeft"
            @show-new-item="showPrevItem"
          />
          <bizlist-arrow-button
            v-show="bizList.length > 1"
            class="hidden-sm-and-up"
            arrowType="right"
            :disabled="reachedMaxRight"
            @show-new-item="showNextItem"
          />
          <biz-card-item
            v-show="bizList.length > 0"
            :bizName="currentItem.bizName"
            :bizType="currentItem.bizType"
            :bizHrs="currentItem.bizHrs"
            :bizAddr="currentItem.bizAddr"
          />
          <bizlist-arrow-button
            v-show="bizList.length > 1"
            class="hidden-sm-and-down"
            arrowType="right"
            :disabled="reachedMaxRight"
            @show-new-item="showNextItem"
          />
        </v-row>
        <bizlist-indicators
          v-show="bizList.length < 6 && bizList.length > 1"
          :items="bizList"
          :matchedBizIndex="matchedBizIndex"
          @show-item="showItem"
        />
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { gmapApi } from "vue2-google-maps";
import { mapState, mapActions } from "vuex";
import BizCardItem from "./componentsWithProps/BizCardItem";
import BizlistArrowButton from "./componentsWithProps/BizlistArrowButton";
import BizlistIndicators from "./componentsWithProps/BizlistIndicators";

export default {
  components: {
    BizCardItem,
    BizlistArrowButton,
    BizlistIndicators,
  },
  computed: {
    google: gmapApi,
    ...mapState("resultModule", {
      bizList: (state) => state.bizList,
      selectedBiz: (state) => state.selectedBiz,
      mapCenter: (state) => state.mapCenter,
    }),
    // Get the index of the bizList array which matches the selected biz
    matchedBizIndex() {
        return this.bizList.indexOf(this.selectedBiz.business);
    },
    // Get the current biz to display, which is the selected biz (by default it's the first item in the bizList, check resultModule/getBizList)
    currentItem() {
      return this.bizList[this.matchedBizIndex];
    },
    // Return true when the current business card is the first business item in the list - disable the left arrow
    reachedMaxLeft() {
      return this.matchedBizIndex === 0;
    },
    // Return true when the current business card is the last business item in the list - disable the right arrow
    reachedMaxRight() {
      return this.matchedBizIndex === this.bizList.length - 1;
    },
  },
  methods: {
    ...mapActions({
      setSelectedBiz: "resultModule/setSelectedBiz",
      setMapCenter: "resultModule/setMapCenter",
    }),
    // Show the clicked item from the indicator dots, change the map center to the selected biz and set new selected biz
    showItem(itemIndex) {
      if (this.selectedBiz) {
        let geocoder = new this.google.maps.Geocoder();
        geocoder.geocode(
          { address: this.bizList[itemIndex].address },
          (results, status) => {
            if (status === "OK") {
              let currentItemMarkerPosition = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              };
              this.setMapCenter(currentItemMarkerPosition);
              this.setSelectedBiz({
                business: this.bizList[itemIndex],
              });
            }
          }
        );
      }
    },
    // Show next item when you click the right arrow button, change the map center to the selected biz and set new selected biz
    showNextItem() {
      let nextBizItem = this.bizList[this.matchedBizIndex + 1];
      let geocoder = new this.google.maps.Geocoder();
      geocoder.geocode({ address: nextBizItem.address }, (results, status) => {
        if (status === "OK") {
          let nextBizMarkerPosition = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          this.setMapCenter(nextBizMarkerPosition);
          this.setSelectedBiz({
            business: nextBizItem,
          });
        }
      });
      // }
    },
    // Show previous item when you click the left arrow button, change the map center to the selected biz and set new selected biz
    showPrevItem() {
      let prevBizItem = this.bizList[this.matchedBizIndex - 1];
      let geocoder = new this.google.maps.Geocoder();
      geocoder.geocode({ address: prevBizItem.address }, (results, status) => {
        if (status === "OK") {
          let prevBizMarkerPosition = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          this.setMapCenter(prevBizMarkerPosition);
          this.setSelectedBiz({
            business: prevBizItem,
          });
        }
      });
    }
  }
};
</script>

<style>
/* Place the bizlist results on top of the map, for the map to be displayed full size */
.bizList {
  z-index: 1;
  margin-top: -248px;
}
</style>
