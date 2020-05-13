<template>
  <!-- ADD A (ANIMAL) MODAL/PROFILE START-->
  <v-container>
    <h1>my pets</h1>
    <v-row justify="center" align="center">
      <v-col
        justify="center"
        align="center"
        cols="12"
        lg="9"
        m="12"
        sm="12"
        xs="6"
        class="d-flex flex-wrap"
      >
        <v-card class="mx-10 my-6" v-for="pet in petList" v-bind:key="pet.id" max-width="434">
          <profile-animal v-bind:petInfo="pet" />
        </v-card>

        <v-flex xs2>
          <add-animal id="animalButton" />
        </v-flex>
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
    })
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
  margin-left: 28px;
  margin-top: 12px;
}
</style>