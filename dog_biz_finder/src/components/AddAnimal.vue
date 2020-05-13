<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="animal" persistent max-width="1000px">
        <template v-slot:activator="{ on }">
          <v-btn id="animalButton" color="brown" dark v-on="on">+ Add A Pet</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Edit or Add Pet Info</span>
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
                  <v-text-field v-model="name" label="Name" required></v-text-field>
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
                  <v-autocomplete :items="['Large', 'Medium', 'Small']" v-model="petSize" label="Animal Size"></v-autocomplete>
                </v-flex>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="brown darken-1" text @click="animal = false">Cancel</v-btn>
            <v-btn color="brown darken-1" text @click="registerPet">Edit/Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data: () => ({
    animal: false,
    name: '',
    breed: '',
    // rules:'',
    menu: [],
    date: '',
    petSize: ''

  }),
  methods: {
        registerPet: function(e) {
          const creationParams = {
            name: this.name,
            breed: this.breed,
            size: this.petSize,
          }
          this.createPet(creationParams)
          this.animal = false
              
          e.preventDefault();
            
        },
      ...mapActions({
        'createPet': 'petModule/createPet',
        
      }),
      save() {
        
      }
    },
};
</script>

<style>
</style>

