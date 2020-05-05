<template>
    <!-- ADD A (ANIMAL) MODAL/PROFILE START-->
    
      <v-container>
        <h1> my businesses </h1>
        <v-row justify="center">
          <v-col cols="12" lg="9" m="12" sm="12" xs="6" class="d-flex flex-wrap">
            <v-card class="mx-10 my-6" v-for="biz in bizList" v-bind:key="biz.id" max-width="434">
              <profile-biz v-bind:bizInfo="biz" />
            </v-card>
            <div>
              <v-flex xs2>
                  <add-biz id="bizButton" />
              </v-flex>
            </div>
          </v-col>
        </v-row>
        
    </v-container>
    <!-- ADD A (ANIMAL) MODAL/PROFILE END-->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProfileBiz from "@/components/ProfileBiz";
import AddBiz from "@/components/AddBiz";

export default {
    components: {
    AddBiz,
    ProfileBiz
  },
  methods: {
    ...mapActions({
      fetchPets: "petModule/getPets" //fetchBiz: bizModule/getBiz
    })
  },
  computed: {
    ...mapGetters({
      petList: "petModule/petList" //bizList
    }),
  },
  created() {
    this.fetchPets(); //this.fetchBiz
  }
  
};
</script>
<style>
#bizButton {
  height: 166px;
  width: 341px;
  min-width: 77px;
  font-size: 40px;
  border-radius: 5px;
  margin-left: 28px;
  margin-top: 12px;
}
</style>
