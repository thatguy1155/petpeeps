<template>
  <div class="text-center">
    <v-dialog
      v-model="animal"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="brown lighten-3"
          dark
          v-on="on"
        >
          delete
        </v-btn>
      </template>

    </v-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
  export default {
    data () {
      return {
        animal: false,
        breed: this.petInfo.breed,
        name: this.petInfo.name,
        rules:'',
        menu: [],
        date: '',
        size: this.petInfo.size,
        sizeOptions: ['Large', 'Medium', 'Small']
      }
    },
    props: ["petInfo"],
    methods: {
        modifyPet: function(e) {
          const creationParams = {
            id:this.petInfo.id,
            name: this.name,
            breed: this.breed,
            size: this.size,
          }
          this.editPet(creationParams)
          this.animal = false
              
          e.preventDefault();
            
        },
         deletePet(creationParams) {
         this.creationParams.splice(this.creationParams.indexOf(creationParams),1);
        },
      ...mapActions({
        'editPet': 'petModule/deletePet',
        
      }),
    },
  }
</script>
API