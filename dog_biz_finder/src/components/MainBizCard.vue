<template>
  <div>
    <p></p>
    <v-card-title>{{ selectedBiz.business.bizName }}</v-card-title>
    <v-card-text class="d-flex flex-column align-start">
      <div>
        <v-icon color="#8D6E63">{{ bizTypeIcon }}</v-icon>
        {{ selectedBiz.business.bizType }}
      </div>
      <!-- <div>
        <v-icon color="#8D6E63">mdi-calendar-clock</v-icon>
        {{ hours }}
      </div> -->
      <div>
        <v-icon color="#8D6E63">mdi-map-marker</v-icon>
        {{ selectedBiz.business.address }}
      </div>
    </v-card-text>
    <v-card-actions
      class="d-flex row mr-2 justify-md-end justify-lg-end justfy-sm-start justfy-xs-start"
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
      if (this.selectedBiz.business.bizType === "Cafe") {
        return "mdi-coffee";
      } else if (this.selectedBiz.business.bizType === "Restaurant") {
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

<style lang="scss" scoped></style>
