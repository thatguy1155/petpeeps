<template>
  <v-card :flat=true>
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
        <a
          :href="selectedBiz.business.bizSite"
          :alt="selectedBiz.business.bizSite"
          :title="selectedBiz.business.bizSite"
        >
          {{ selectedBiz.business.bizSite }}
        </a>
      </div>
      <div v-if="socialMediaIcons" class="socialMedia">
        <span v-for="(socialMediaIcon, index) in socialMediaIcons" :key="index">
          <v-btn
            :href="socialMediaIcon.linkTo"
            :alt="socialMediaIcon.linkTo"
            :title="socialMediaIcon.linkTo"
            class="white--text"
            icon
          >
            <v-icon color="#8D6E63" size="24px">{{
              socialMediaIcon.iconName
            }}</v-icon>
          </v-btn>
        </span>
      </div>
      <div>
        <menu-main-biz-card :menu="menu" />
      </div>
    </v-card-text>
    <v-card-actions class="hideDetailsBtn">
      <v-btn color="orange" text class="hideDetailsBtn" @click="hideMainCard"
        >Hide Details</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import MenuMainBizCard from "./componentsWithProps/MenuMainBizCard";

export default {
  name: "MainBizCard",
  props: {
    bizKey: {
      type: Number,
    }
  },
  components: {
    MenuMainBizCard,
  },
  computed: {
    ...mapState("resultModule", {
      selectedBiz: (state) => state.selectedBiz,
    }),
    ...mapState("bizModule", {
      bizList: (state) => state.bizArray,
    }),
    ...mapGetters({
      bizType: "resultModule/bizType",
      bizSocialMedia: "resultModule/bizSocialMedia",
      menu: "resultModule/menu",
    }),
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
    socialMediaIcons() {
      const allSocialMedia = [];
      const socialMedia = this.bizSocialMedia;

      for (const social in socialMedia) {
        if (social === "facebook") {
          let fbObj = {
            iconName: "mdi-facebook",
            linkTo: socialMedia["facebook"],
          };
          allSocialMedia.push(fbObj);
        }

        if (social === "twitter") {
          let twitterObj = {
            iconName: "mdi-twitter",
            linkTo: socialMedia["twitter"],
          };
          allSocialMedia.push(twitterObj);
        }

        if (social === "naver") {
          let naverObj = {
            iconName: "mdi-blogger",
            linkTo: socialMedia["naver"],
          };
          allSocialMedia.push(naverObj);
        }

        if (social === "instagram") {
          let instaObj = {
            iconName: "mdi-instagram",
            linkTo: socialMedia["instagram"],
          };
          allSocialMedia.push(instaObj);
        }
      }
      return allSocialMedia;
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
a {
  text-decoration: none;
  color: black !important;
}

.socialMedia {
  padding-left: 6px !important;
}

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
