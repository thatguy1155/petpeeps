<template>
  <div>
    <!-- if there is no account type data in the current user, show the component to select a type -->

    <account-options v-show="!accountType" />
    <account />

    <!-- ADD A (ANIMAL) MODAL/PROFILE START-->
    <div class="grid1x1" v-if="accountType === 'personal'">
      <!-- <div class="grid1x1"> -->
      <profile-animal />
      <div>
        <v-flex xs2>
          <!-- <v-card-text> -->
            <add-animal id="animalButton" />
          <!-- </v-card-text> -->
        </v-flex>
      </div>
    </div>
    <!-- ADD A (ANIMAL) MODAL/PROFILE END-->

    <!-- ADD A (BUSINESS) MODAL/PROFILE START-->
    <div class="grid1x1" v-if="accountType === 'business'">
      <!-- <div class="grid1x1"> -->
      <profile-biz />
      <div>
        <v-flex xs2>
          <!-- <v-card-text> -->
            <add-biz id="bizButton" />
          <!-- </v-card-text> -->
        </v-flex>
      </div>
    </div>
    <!-- ADD A (BUSINESS) MODAL/PROFILE END-->
  </div>
</template>

<script>
import Account from "@/components/Account";
import AccountOptions from "@/components/AccountOptions";
import AddAnimal from "@/components/AddAnimal";
import ProfileAnimal from "@/components/ProfileAnimal";
import AddBiz from "@/components/AddBiz";
import ProfileBiz from "@/components/ProfileBiz";
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  components: {
    Account,
    AccountOptions,
    AddAnimal,
    AddBiz,
    ProfileAnimal,
    ProfileBiz
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
</style>

