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
            :bizName="currentItem.bizName"
            :bizType="currentItem.bizType"
            :hours="currentItem.hours"
            :address="currentItem.address"
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
          :currentItemIndex="currentItemIndex"
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
  data() {
    return {
      currentItemIndex: 0,
    };
  },
  computed: {
    google: gmapApi,
    ...mapState("resultModule", {
      bizList: (state) => state.bizList,
      selectedBiz: (state) => state.selectedBiz,
      mapCenter: (state) => state.mapCenter
    }),
    matchedBizIndex() {
      return this.bizList.indexOf(this.selectedBiz.business);
    },
    // Get the main business card to show depending on the current item index, which changes depending on the arrow clicked or the indicator dot selected
    currentItem() {
      if (this.selectedBiz) {
        return this.bizList[this.matchedBizIndex];
      } else {
        return this.bizList[this.currentItemIndex];
      }
    },
    // Return true when the current business card is the first business item in the list - disable the left arrow
    reachedMaxLeft() {
      if (this.selectedBiz) {
        return this.matchedBizIndex === 0;
      } else {
        return this.currentItemIndex === 0;
      }
    },
    // Return true when the current business card is the last business item in the list - disable the right arrow
    reachedMaxRight() {
      if (this.selectedBiz) {
        return this.matchedBizIndex === this.bizList.length - 1;
      } else {
        return this.currentItemIndex === this.bizList.length - 1;
      }
    },
  },
  methods: {
    ...mapActions({
      setSelectedBiz: "resultModule/setSelectedBiz",
      setMapCenter: "resultModule/setMapCenter"
    }),
    // Show the clicked item from the indicator dots
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
                business: this.bizList[itemIndex]
              });
            }
          }
        );
      } else {
        this.currentItemIndex = itemIndex;
      }
    },
    // Show next item when you click the right arrow button
    showNextItem() {
      if (this.selectedBiz) {
        let nextBizItem = this.bizList[this.matchedBizIndex + 1];
        let geocoder = new this.google.maps.Geocoder();
        geocoder.geocode(
          { address: nextBizItem.address },
          (results, status) => {
            if (status === "OK") {
              let nextBizMarkerPosition = {
                lat: results[0].geometry.location.lat(),
                lng: results[0].geometry.location.lng(),
              };
              this.setMapCenter(nextBizMarkerPosition);
              this.setSelectedBiz({
                business: nextBizItem,
                // markerPosition: nextBizMarkerPosition,
              });
            }
          }
        );
      } else {
        this.currentItemIndex++;
      }
    },
    // Show previous item when you click the left arrow button
    showPrevItem() {
      console.log('selected biz', this.selectedBiz);
      if (this.selectedBiz) {
        let prevBizItem = this.bizList[this.matchedBizIndex - 1];
        let geocoder = new this.google.maps.Geocoder();
        geocoder.geocode(
          { address: prevBizItem.address },
          (results, status) => {
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
          }
        );
      } else {
        this.currentItemIndex--;
      }
    },
  },
};
</script>

<style>
/* Place the bizlist results on top of the map, for the map to be displayed full size */
.bizList {
  z-index: 1;
  margin-top: -248px;
}
</style>
