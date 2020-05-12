<template>
  <div>
    <v-card-title>{{ selectedBiz.business.bizName }}</v-card-title>
    <v-card-text class="bizCardContent d-flex flex-column align-start">
      <div>
        <v-icon color="#8D6E63">{{ bizTypeIcon }}</v-icon>
        {{ selectedBiz.business.bizType }}
      </div>
      <div>
        <v-icon color="#8D6E63">mdi-calendar-clock</v-icon>
        {{ selectedBiz.business.bizHrs }}
      </div>
      <div>
        <v-icon color="#8D6E63">mdi-map-marker</v-icon>
        {{ selectedBiz.business.bizAddr }}
      </div>
      <div>
        <v-icon color="#8D6E63">mdi-phone</v-icon>
        {{ selectedBiz.business.bizTel }}
      </div>
      <div>
        <v-icon color="#8D6E63">mdi-web</v-icon>
        {{ selectedBiz.business.bizSite }}
      </div>
      <div>
        
      </div>
      <div>
        <v-icon color="#8D6E63">mdi-map-marker</v-icon>
        {{ selectedBiz.business.bizTel }}
      </div>
    </v-card-text>
    <v-card-actions
      class="hideDetailsBtn"
    >
      <v-btn color="orange" text class="hideDetailsBtn" @click="hideMainCard"
        >Hide Details</v-btn
      >
    </v-card-actions>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "MainBizCard",
  computed: {
    ...mapState("resultModule", {
      selectedBiz: (state) => state.selectedBiz,
    }),
    bizTypeIcon() {
      const cafeRegex = /cafe/i;
      const restaurantRegex = /restaurant/i;
      if (this.selectedBiz.business.bizType.match(cafeRegex)) {
        return "mdi-coffee";
      } else if (this.selectedBiz.business.bizType.match(restaurantRegex)) {
        return "mdi-silverware-fork-knife";
      } else {
        return "";
      }
    },
  },
  methods: {
    hideMainCard() {
      this.$emit("hide-main-card");
    },
  },
};
</script>

<style lang="scss" scoped>

.bizCardContent div {
  padding: 10px;
}

@media screen and (max-width: 959px) {
  .v-card__title {
    font-size: 0.8em;
    padding: 5px;
  }
  .v-card__text {
    font-size: 0.6em;
    padding: 0;
  }
  .hideDetailsBtn {
    font-size: 0.9em;
  }
}

</style>
