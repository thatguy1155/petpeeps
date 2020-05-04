<template>
  <v-form outline>
    <v-container>
      <v-row>
        <v-col :cols="12">
          <v-alert type="info" id="accountTypeSelect">
            Choose you account type...
            <div>
              <v-btn
                @click="selectBusiness"
                class="ma-2"
                outlined
                color="white"
                >Business</v-btn
              >
              <v-btn
                dark
                @click="selectPersonal"
                class="ma-2"
                outlined
                color="white"
                >Personal</v-btn
              >
            </div>
          </v-alert>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { mapState, mapActions,mapGetters } from "vuex";
export default {
  name: "AccountOptions",
  methods: {
      async selectBusiness() {
        let accountParams = {
          accType:"business",
          uid:this.uid
        }
        //wait for the backend to update the account type
        await this.updateAccountType(accountParams)
        //location.reload()


      },
      async selectPersonal() {
        let accountParams = {
          accType:"personal",
          uid:this.uid
        }
          await this.updateAccountType(accountParams)
          //location.reload()
      },
    ...mapActions({
      'getCurrentUser': 'profileModule/getCurrentUser',
      'updateAccountType':'profileModule/updateAccountType'
    })
  },
  computed: {
    ...mapState("profileModule", {
      user: (state) => state.user
    }),
    // Get the current user's account type from store 

    ...mapGetters({
      uid: 'profileModule/getUid'
    })
  },
  created() {
    // Get current user when the component is created 
    this.getCurrentUser(); 
  }
};

</script>

<style lang="scss" scoped>
    #accountTypeSelect {
        background-color: rgba(165, 42, 42, 0.274) !important;
    }
</style>
