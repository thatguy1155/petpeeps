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
          edit
        </v-btn>
      </template>

      <v-card>
          <v-card-title>
            <span class="headline">Edit Pet Info</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-flex xs12>
                  <!-- <v-file-input
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an Photo"
                  prepend-icon="mdi-camera"
                  label="Pet Photo"
                  ></v-file-input>-->
                </v-flex>

                <v-flex xs12>
                  <v-text-field label="Name" v-model="name" required></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    v-model="breed"
                    label="Breed/Species"
                    hint="We like parrots, lizards, and other exotic animals"
                  ></v-text-field>
                </v-flex>

                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field v-model="date" label="Birthday" prepend-icon readonly v-on="on"></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>

                <v-flex xs12>
                  <v-select :items="sizeOptions" v-model="size" value="size" label="Animal Size" required></v-select>
                </v-flex>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="brown darken-1" text @click="animal = false">Cancel</v-btn>
            <v-btn color="brown darken-1" text @click="modifyPet">Edit</v-btn>
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
      ...mapActions({
        'editPet': 'petModule/editPet',
        
      }),
    },
  }
</script>
API