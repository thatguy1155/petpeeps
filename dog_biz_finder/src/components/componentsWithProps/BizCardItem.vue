<template>
  <v-card class="bizCard d-flex row align-center">
    <v-card-title>{{ bizName }}</v-card-title>
    <v-card-text class="d-flex flex-column align-start">
      <div>
        <v-icon color="#8D6E63">{{ bizTypeIcon }}</v-icon>
        {{ bizType }}
      </div>
      <div>
        <v-icon color="#8D6E63">mdi-calendar-clock</v-icon>
        {{ hours }}
      </div>
      <div>
        <v-icon color="#8D6E63">mdi-map-marker</v-icon>
        {{ address }}
      </div>
    </v-card-text>
    <v-card-actions
      class="d-flex row mr-2 justify-md-end justify-lg-end justfy-sm-start justfy-xs-start"
    >
      <v-btn color="orange" text class="moreDetailsBtn">More Details</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  props: {
    bizName: {
      type: String,
      default: "name of business",
    },
    bizType: {
      type: String,
      default: "type of business",
    },
    hours: {
      type: String,
      default: "hours",
    },
    address: {
      type: String,
      default: "address",
    },
  },
  computed: {
    bizTypeIcon() {
      if (this.bizType === "Cafe") {
        return "mdi-coffee";
      } else if (this.bizType === "Restaurant") {
        return "mdi-silverware-fork-knife";
      } else {
        return "";
      }
    },
  }
};
</script>

<style scoped>
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
    font-size: 0.7em;
  }
}
</style>
