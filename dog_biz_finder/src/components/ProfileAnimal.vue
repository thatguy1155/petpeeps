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
        <div id='myapp'>
          <label v-bind:for="petInfo.id"><v-icon color="brown lighten-3">mdi-camera</v-icon></label>
          <input type="file" v-bind:id="petInfo.id" ref="file" class="uploadButton" @change='onSelect()' />

        <!-- <button type="button" @click='uploadFile()' >Upload file</button> -->
        </div>
        <!-- <ChangePetPic v-bind:petInfo="petInfo"/> -->
        
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
import * as FormData from 'form-data';
import axios from 'axios'
import EditAnimal from "@/components/EditAnimal.vue";
//import ChangePetPic from "@/components/ChangePetPic.vue";
import { mapActions,mapGetters } from "vuex";
export default {
    name: "ProfileAnimal",
    data () {
      return {
        dialog: false,
        //id: this.petInfo.id,
        file:'',
        chosenFile:'',
        thisCard:''

      }
    },
    props: ["petInfo"],
    components: {
        EditAnimal,
        //ChangePetPic
    },
    computed:{ 
      ...mapGetters({
      petList: "petModule/petList",
      userName: "profileModule/getName",
    })
    },
    methods: {
      //select the file from the user
      onSelect(){
          //chosenfFile based on v-model on line 24
          this.file = this.$refs.file.files[0];
          //const file = this.chosenFile
          //this.file = file
          if(this.file){     //this if statement prevents the other functions from running if you click on the x
              this.onSubmit()//this used to be a two part process with a submit button so I just tacked the submit function onto tihs one
          } else {
              this.dialog = false
          }
      },
      //this function sends you username to the backend to make a directory if one doesn't already exist.
      async directoryManager(){
            const params = new URLSearchParams();
                        params.append('action', 'makeDirectory');
                        params.append('name', this.userName);
            try{
                let res = await axios.post('http://dogpeeps', params)
                console.log(res.data)
            }
            catch(err){
                console.log(err)
            }
            this.dialog = false
        },
        //delete the old picture from the directory so that it doesn't get too bloated
        async deleteOldFile(){
            const params = new URLSearchParams();
                        params.append('action', 'deleteOldPetPic');
                        params.append('id', this.petInfo.id);
            try{
                let res = await axios.post('http://dogpeeps', params)
                console.log(res.data)
            }
            catch(err){
                console.log(err)
            }
        },
        //take the uploaded photo and send it to the backend for storage after the directory is created
        async onSubmit(){
            console.log(this.petInfo.id)
            await this.directoryManager()
            await this.deleteOldFile()
            let formData = new FormData()
            formData.append('file',this.file)
            formData.append('username',this.userName)
            try{
                let res = await axios.post('http://dogpeeps', formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                console.log(res.data)
                const creationParams = {
                    id:this.petInfo.id,
                    username: this.userName,
                    filename: res.data
                }
                this.updatePetPic(creationParams)//now update the db and the vuex state
            }
            catch(err){
                console.log(err)
            }
            this.dialog = false
        },
        ...mapActions({
            getCurrentUser: "profileModule/getCurrentUser",
            updatePetPic: "petModule/updatePetPic"
        }),
      //this function gets the image url for this pet in the array of pets for this user
      getThisPetPic(){
        let thisPet = this.petList.filter(pet => pet.id === this.petInfo.id)
        console.log(thisPet[0].picURL)
        return thisPet[0].picURL
        
      }
    },
    created(){
        this.getCurrentUser()
    }
     
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