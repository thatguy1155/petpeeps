<template>
    <!-- ADD A (ANIMAL) MODAL/PROFILE START-->
    
      <v-container>
        <h1> my pets </h1>
        <v-row justify="center">
          <v-col cols="10" lg="8" class="d-flex flex-wrap">
            <v-card class="mx-2 my-2" v-for="pet in petList" v-bind:key="pet.id" max-width="434">
              <profile-animal v-bind:petInfo="pet" />
            </v-card>
            <div>
              <v-flex xs2>
                  <add-animal id="animalButton" />
              </v-flex>
            </div>
          </v-col>
        </v-row>
        
    </v-container>
    <!-- ADD A (ANIMAL) MODAL/PROFILE END-->
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ProfileAnimal from "@/components/ProfileAnimal";
import AddAnimal from "@/components/AddAnimal";

export default {
    components: {
    AddAnimal,
    ProfileAnimal
  },
  methods: {
    ...mapActions({
      fetchPets: "petModule/getPets"
    })
  },
  computed: {
    ...mapGetters({
      petList: "petModule/petList"
    }),
  },
  created() {
    this.fetchPets();
  }
  
};
</script>
<style>
/* .grid1x1 {
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
} */
#animalButton {
  height: 166px;
  width: 341px;
  min-width: 77px;
  font-size: 40px;
  border-radius: 5px;
  margin-left: 5px;
  margin-top: 4px;
}
</style>