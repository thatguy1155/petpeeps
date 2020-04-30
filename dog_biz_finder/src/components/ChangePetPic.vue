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
          v-on="on"
        >
          edit
        </v-btn>
      </template>

      <v-card>
        
        <v-file-input label="change pic"></v-file-input>

        

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import { mapActions } from "vuex";
  export default {
    data () {
      return {
        dialog: false,
        id: this.petInfo.id,
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
      ...mapActions({
        'editPet': 'petModule/editPet',
        
      }),
    },
  }
</script>
