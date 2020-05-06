<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="brown lighten-3"
          dark
          icon
          v-on="on"
        >
          <v-icon>mdi-camera</v-icon>
        </v-btn>
      </template>

      <v-card>
          <v-file-input
              prepend-icon="mdi-camera"
              class="d-flex align-end mx-3"
              ref='file'
              type='file'
              v-model='chosenFile'
              @change="onSelect"
            ></v-file-input>

        <v-card-actions>
          <v-spacer></v-spacer>
          <!-- <v-btn
            color="primary"
            text
            @click="onSubmit"
          >
            I accept
          </v-btn> -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
//for some reason you needed to import this form data dependency
import * as FormData from 'form-data';
import axios from 'axios'
import { mapActions,mapGetters } from "vuex";
  export default {
    data () {
      return {
        dialog: false,
        //id: this.petInfo.id,
        file:'',
        chosenFile:''

      }
    },
    props: ["petInfo"],
    methods: {
        //select the file from the user
        onSelect(){
            //chosenfFile based on v-model on line 24
            const file = this.chosenFile
            this.file = file
            if(file){     //this if statement prevents the other functions from running if you click on the x
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
        })
    },
    computed:{

      ...mapGetters({
      userName: "profileModule/getName",
      petList: "petModule/petList"
    }),
    getThisPetPic(){
        let thisPet = this.petList.filter(pet => pet.id === this.petInfo.id)
        return thisPet[0].picURL
        
      }
    },
    created(){
        this.getCurrentUser()
    }
  }
</script>
