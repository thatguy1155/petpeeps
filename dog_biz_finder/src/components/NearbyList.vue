<template>
  <div v-if="bizList.length > 0">
    <div id="bizList">
      <bizlist-arrow-button
        arrowType="left"
        @show-new-item="showPrevItem"
        :disabled="reachedMaxLeft"
      />
      <biz-card-item
        :bizName="currentItem.bizName"
        :bizType="currentItem.bizType"
        :hours="currentItem.hours"
        :address="currentItem.address"
      />
      <bizlist-arrow-button
        arrowType="right"
        arrowEventName= 'show-next-item'
        @show-new-item="showNextItem"
        :disabled="reachedMaxRight"
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
    currentItem() {
        return this.bizList[this.currentItemIndex];
    },
    reachedMaxLeft() {
      return this.currentItemIndex === 0;
    },
    reachedMaxRight() {
      return this.currentItemIndex === this.bizList.length - 1;
    },
  },
  methods: {
    showItem(itemIndex) {
      this.currentItemIndex = itemIndex;
    },
    showNextItem() {
      this.currentItemIndex++;
    },
    showPrevItem() {
      this.currentItemIndex--;
    }
  },
};
</script>

<style>
#bizList {
  z-index: 1;
  margin-top: -285px;
}
</style>
