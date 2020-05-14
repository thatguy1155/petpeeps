<template>
  <div id='myapp'>
    <label v-bind:for="petInfo.id"><v-icon color="brown lighten-3">mdi-camera</v-icon></label>
    <input type="file" v-bind:id="petInfo.id" ref="file" class="uploadButton" @change='onSelect()' />
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
            this.file = this.$refs.file.files[0];
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
  }
</script>



<style scoped> 

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
