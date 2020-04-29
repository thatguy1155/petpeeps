<template>
  <v-container 
    class="bizList"
  >
    <v-row justify="center">
      <v-col 
        cols="12"
        xs="6" sm="8" md="10" lg="12" xl="12"
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
import { mapState } from "vuex";
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
    ...mapState("resultModule", {
      bizList: (state) => state.bizList,
    }),
    // Get the main business card to show depending on the current item index, which changes depending on the arrow clicked or the indicator dot selected
    currentItem() {
        return this.bizList[this.currentItemIndex];
    },
    // Return true when the current business card is the first business item in the list - disable the left arrow 
    reachedMaxLeft() {
      return this.currentItemIndex === 0
    },
    // Return true when the current business card is the last business item in the list - disable the right arrow 
    reachedMaxRight() {
      return this.currentItemIndex === this.bizList.length - 1;
    },
  },
  methods: {
    // Show the clicked item from the indicator dots 
    showItem(itemIndex) {
      this.currentItemIndex = itemIndex;
    },
    // Show next item when you click the right arrow button
    showNextItem() {
      this.currentItemIndex++;
    },
    // Show previous item when you click the left arrow button
    showPrevItem() {
      this.currentItemIndex--;
    }
  },
};
</script>

<style>
/* Place the bizlist results on top of the map, for the map to be displayed full size */
.bizList {
  z-index: 1;
  margin-top: -248px;
}

/* @media screen and (max-width: 959px) {
  .bizList {
    margin-top: -249px;
  } */
/* } */
</style>
