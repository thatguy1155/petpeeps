<template>
  <div>

    <account-options v-show="emptyAccountType" />
    <account />

    <v-divider :inset="inset" horizontal color="brown" width="100%"></v-divider>

    <v-layout row justify-center>

      <!-- <v-flex xs2>
        <v-card dark color="primary">
          <v-card-text>
            <add-biz id="bizButton" />
          </v-card-text>
        </v-card>
      </v-flex>-->

      <!-- <v-flex xs2>
        <v-card color="white">
          <v-card-text>two</v-card-text>
        </v-card>
      </v-flex>-->

      <v-flex xs2>
        <v-card dark color="accent">
          <v-card-text>
            <add-animal id="animalButton" />
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>

    <!-- <v-container class="grey lighten-5">
      <v-row v-for="j in justify" :key="j" :justify="j">
        <v-col v-for="k in 2" :key="k" md="4">
          <v-card class="pa-2" outlined tile>
            <add-animal id="animalButton" />
          </v-card>
        </v-col>
      </v-row>
    </v-container>-->

    <v-card class="mx-auto" max-width="434" tile>
      <v-img height="100%" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
        <v-row align="end" class="fill-height">
          <v-col align-self="start" class="pa-0" cols="12">
            <v-avatar class="profile" color="grey" size="164" tile>
              <v-img
                src="https://i.pinimg.com/originals/66/95/4f/66954f3cfcb3ec22e7d057bc84059a76.jpg"
              ></v-img>
            </v-avatar>
          </v-col>
          <v-col class="py-0">
            <v-list-item color="rgba(0, 0, 0, .4)" dark>
              <v-list-item-content>
                <v-list-item-title class="title">Name: Fido</v-list-item-title>
                <v-list-item-subtitle>Breed: Puppy</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
  </div>
</template>

<script>
import Account from "@/components/Account";
import AccountOptions from "@/components/AccountOptions";
import AddAnimal from "@/components/AddAnimal";
// import AddBiz from "@/components/AddBiz";
import { mapState, mapActions } from "vuex";

export default {
  components: {
    Account,
    AccountOptions,
    AddAnimal
    // AddBiz
  },

  data: () => ({
    justify: ["space-around"],
    emptyAccountType: false,
    inset: false,
    items: ["default", "vertical"],
    variant: "default"
  }),
  methods: {
    ...mapActions({
      getUser: "profileModule/getUser"
    }),
    checkAccountTypeStatus() {
      if (this.user.accountType === "") {
        this.emptyAccountType = true;
      }
    }
  },
  computed: {
    ...mapState("profileModule", {
      user: state => state.user
    })
  },
  created() {
    this.getUser();
    this.checkAccountTypeStatus();
  }
};
</script>

<style>
.v-application--is-ltr .v-responsive__sizer ~ .v-responsive__content {
    /* margin-left: 100%; */
    margin-right: 45%;
}
</style>

