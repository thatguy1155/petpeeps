<template>
  <div>

    <v-card
      class="mx-auto"
      width="344"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{petInfo.breed}}</div>
          <v-list-item-title class="headline mb-1">{{petInfo.name}}</v-list-item-title>
          <v-list-item-subtitle>I love this pet</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="80"
        >
          <v-img v-bind:src="getThisPetPic()"></v-img>
          
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        
        <EditAnimal v-bind:petInfo="petInfo"/>
        <v-spacer></v-spacer>
        <ChangePetPic v-bind:petInfo="petInfo"/>
        
      </v-card-actions>
    </v-card>


    <!-- <v-card   tile>
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
                  <v-list-item-title id="animalFont" class="title">{{petInfo.name}}</v-list-item-title>
                  <v-list-item-subtitle id="animalFont">{{petInfo.breed}}</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
              <EditAnimal v-bind:petInfo="petInfo"/>
            </v-col>
          </v-col>
        </v-row>
      </v-img>
    </v-card> -->
  </div>
</template>

<script>

import EditAnimal from "@/components/EditAnimal.vue";
import ChangePetPic from "@/components/ChangePetPic.vue";
import { mapGetters } from "vuex";
export default {
    name: "ProfileAnimal",
    data () {
      return {
        thisCard:''

      }
    },
    props: ["petInfo"],
    components: {
        EditAnimal,
        ChangePetPic
    },
    computed:{ 
      ...mapGetters({
      petList: "petModule/petList",
      userName: "profileModule/getName",
    })
    },
    methods: {
      //this function gets the image url for this pet in the array of pets for this user
      getThisPetPic(){
        let thisPet = this.petList.filter(pet => pet.id === this.petInfo.id)
        console.log(thisPet[0].picURL)
        return thisPet[0].picURL
        
      }
    },
     
}
</script>

<style scoped> 
#animalFont {
  color: black;
  font-size: 41px !important;
  display: inline-block;
}
#profilePic {
  float: left;
}

label {
   cursor: pointer;
   margin-right: 5px;
   /* Style as you please, it will become the visible UI component. */
}

.uploadButton {
   opacity: 0;
   position: absolute;
   z-index: -1;
}
</style>