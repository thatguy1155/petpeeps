<template>
  <div>
    <!-- if there is no account type data in the current user, show the component to select a type -->
    <account-options v-show="!accountType" />
    <account />

    <!-- ADD A ANIMAL MODAL/PROFILE START-->
    <div v-if="accountType === 'Personal'" class="grid1x1">
      <!-- <div class="box box1"> -->
      <div>
        <v-card class="mx-auto" max-width="434" tile>
          <v-img height="100%" src>
            <v-row align="end" class="fill-height">
              <v-col align-self="start" class="pa-0" cols="12">
                <v-avatar id="profilePic" class="profile" color="grey" size="164" tile>
                  <v-img
                    src="https://i.pinimg.com/originals/66/95/4f/66954f3cfcb3ec22e7d057bc84059a76.jpg"
                  ></v-img>
                </v-avatar>
                <v-col class="py-0">
                  <v-list-item color="rgba(0, 0, 0, .4)" dark>
                    <v-list-item-content id="animalFont">
                      <v-list-item-title id="animalFont" class="title">Name: Fido</v-list-item-title>
                      <v-list-item-subtitle id="animalFont">Breed: Puppy</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
        <!-- </div> -->
      </div>
      <div class="box box2">
        <v-flex xs2>
          <v-card-text>
            <add-animal id="animalButton" />
          </v-card-text>
        </v-flex>
      </div>
    </div>

    <!-- ADD A ANIMAL MODAL/PROFILE END-->

    <!-- ADD A BUSINESS MODAL/PROFILE START-->

    <div v-show="accountType === 'Business'" class="grid1x1">
      <!-- <div class="box box1"> -->
      <div>
        <v-card class="mx-auto" max-width="434" tile>
          <v-img height="100%" src>
            <v-row align="end" class="fill-height">
              <v-col align-self="start" class="pa-0" cols="12">
                <v-avatar id="profilePic" class="profile" color="grey" size="164" tile>
                  <v-img
                    src="https://favy-inbound-singapore.s3.amazonaws.com/uploads/topic/image/1515/Untitled_design__10_.jpg"
                  ></v-img>
                </v-avatar>
                <v-col class="py-0">
                  <v-list-item color="rgba(0, 0, 0, .4)" dark>
                    <v-list-item-content id="bizFont">
                      <v-list-item-title id="bizFont">Name: Fido's Cafe</v-list-item-title>
                      <v-list-item-title id="bizFont">Business Type: 24/7</v-list-item-title>
                      <v-list-item-title id="bizFont">Open time: 24/7</v-list-item-title>
                      <v-list-item-title id="addressFont">
                        Address:11 Nonhyeon-ro 151-gil,
                        <br />Sinsa-dong, Gangnam-gu, Seoul
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-col>
              </v-col>
            </v-row>
          </v-img>
        </v-card>
      </div>
      <!-- </div> -->

      <div class="box box2">
        <v-flex xs2>
          <v-card-text>
            <add-biz id="bizButton" />
          </v-card-text>
        </v-flex>
      </div>
    </div>

    <!-- ADD A BUSINESS MODAL/PROFILE END-->
  </div>
</template>

<script>
import Account from "@/components/Account";
import AccountOptions from "@/components/AccountOptions";
import AddAnimal from "@/components/AddAnimal";
import AddBiz from "@/components/AddBiz";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    Account,
    AccountOptions,
    AddAnimal,
    AddBiz
  },
  data: () => {
    return {};
  },
  methods: {
    ...mapActions({
      getCurrentUser: "profileModule/getCurrentUser"
    })
  },
  computed: {
    ...mapState("profileModule", {
      user: state => state.user
    }),

    // Get the current user's account type from store

    ...mapGetters({
      accountType: "profileModule/accountType"
    })
  },
  created() {
    // Get current user when the component is created
    this.getCurrentUser();
  }
};
</script>

<style>
.grid1x1 {
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-end;
}
.grid1x1 > div {
  display: flex;
  flex-basis: calc(52% - 124px);
  justify-content: center;
  flex-direction: column;
}
#animalButton {
  height: 165px;
  width: 371px;
  min-width: 77px;
  font-size: 40px;
  border-radius: 0px;
}
#bizButton {
  height: 165px;
  width: 371px;
  min-width: 77px;
  font-size: 33px;
  border-radius: 0px;
}
#profilePic {
  float: left;
}
#puppyFont {
  color: black;
  font-size: 41px !important;
  display: inline-block;
}
#animalFont {
  color: black;
  font-size: 41px !important;
  display: inline-block;
}
#bizFont {
  color: black;
  font-size: 20px !important;
  display: inline-block;
}
#addressFont {
  color: black;
  font-size: 15px !important;
  display: inline-block;
}
</style>

