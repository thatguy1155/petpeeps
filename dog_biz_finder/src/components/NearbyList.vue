<template>
  <div v-if="bizList.length > 0">
    <div class="bizList">
      <bizlist-arrow-button
        arrowType="left"
        :disabled="reachedMaxLeft"
        @show-new-item="showPrevItem"
      />
      <biz-card-item
        :bizName="currentItem.bizName"
        :bizType="currentItem.bizType"
        :hours="currentItem.hours"
        :address="currentItem.address"
      />
      <bizlist-arrow-button
        arrowType="right"
        :disabled="reachedMaxRight"
        @show-new-item="showNextItem"
       
      />
    </div>
    <bizlist-indicators
      :items="bizList"
      :currentItemIndex="currentItemIndex"
      @show-item="showItem"
    />
  </div>
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
  created() {
    console.log('reachedMaxLeft', this.reachedMaxLeft);
  }
};
</script>

<style>
/* Place the bizlist results on top of the map, for the map to be displayed full size */
.bizList {
  z-index: 1;
  margin-top: -282px;
  display: flex;

}
</style>
