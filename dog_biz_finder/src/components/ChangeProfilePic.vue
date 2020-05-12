<template>
  <div id='myapp'>
          <label for="profilePic"><v-icon color="brown lighten-3">mdi-camera</v-icon></label>
          <input type="file" id="profilePic" ref="file" class="uploadButton" @change='onSelect()' />

        <!-- <button type="button" @click='uploadFile()' >Upload file</button> -->
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
        file:'',
        chosenFile:''

      }
    },
    methods: {
        //select the file from the user
        onSelect(){
            //chosenfFile based on v-model on line 24
            // const file = this.chosenFile
            // console.log(file)
            // this.file = file
            this.file = this.$refs.file.files[0];
            if(this.file){     //this if statement prevents the other functions from running if you click on the x
                this.onSubmit()//this used to be a two part process with a submit button so I just tacked the submit function onto tihs one
            } else {
                this.dialog = false
            }
            
        },
        //this function sends you username to the backend to make a directory if one doesn't already exist.
        async directoryManager(){
            console.log(this.userName)
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
                        params.append('action', 'deleteOldProfilePic');
                        params.append('id', this.userId);
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
                console.log(this.userId)
                const creationParams = {
                    id:this.userId,
                    username: this.userName,
                    filename: res.data
                }
                this.updateProfilePic(creationParams)//now update the db and the vuex state
            }
            catch(err){
                console.log(err)
            }
            this.dialog = false
        },
        ...mapActions({
            getCurrentUser: "profileModule/getCurrentUser",
            updateProfilePic: "profileModule/updateProfilePic"
        })
    },
    computed:{

      ...mapGetters({
      userName: "profileModule/getName",
      userId: "profileModule/getId",
    }),
  
    },
    created(){
        this.getCurrentUser()
    }
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
