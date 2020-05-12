<template>
  <v-card class="bizCard d-flex row align-center">
    <div id="smallCard" v-if="smallCard">
      <v-card-title>{{ bizName }}</v-card-title>
      <v-card-text class="d-flex flex-column align-start">
        <div>
          <v-icon color="#8D6E63">{{ bizTypeIcon }}</v-icon>
          {{ bizType }}
        </div>
        <div>
          <v-icon color="#8D6E63">mdi-calendar-clock</v-icon>
          {{ bizHrs }}
        </div>
        <div>
          <v-icon color="#8D6E63">mdi-map-marker</v-icon>
          {{ bizAddr }}
        </div>
      </v-card-text>
      <v-card-actions
        class="detailsBtn"
      >
        <v-btn color="orange" text class="moreDetailsBtn" @click="showMainCard"
          >More Details</v-btn
        >
      </v-card-actions>
    </div>
    <main-biz-card v-if="mainCard" @hide-main-card="hideMainCard" />
  </v-card>
</template>

<script>
import MainBizCard from "@/components/MainBizCard";

export default {
  components: {
    MainBizCard
  },
  props: {
    bizName: {
      type: String,
      default: "name of business",
    },
    bizType: {
      type: String,
      default: "type of business",
    },
    bizHrs: {
      type: String,
      default: "hours",
    },
    bizAddr: {
      type: String,
      default: "address",
    },
  },
  data: () => ({
    smallCard: true,
    mainCard: false,
  }),
  computed: {
    bizTypeIcon() {
      const cafeRegex = /cafe/i;
      const restaurantRegex = /restaurant/i;
      if (this.bizType.match(cafeRegex)) {
        return "mdi-coffee";
      } else if (this.bizType.match(restaurantRegex)) {
        return "mdi-silverware-fork-knife";
      } else {
        return "";
      }
    },
  },
  methods: {
    showMainCard() {
      this.smallCard = false;
      this.mainCard = true;
    },
    hideMainCard() {
      this.smallCard = true;
      this.mainCard = false;
    },
  },
};
</script>

<style scoped>

#smallCard {
  width: 515px;
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
  .moreDetailsBtn {
    font-size: 0.8em;
  }
  .bizCard {
    width: 100%;
  }
}
</style>
