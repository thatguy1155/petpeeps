<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="animal" persistent max-width="1000px">
        <template v-slot:activator="{ on }">
          <v-btn id="animalButton" color="brown" dark v-on="on" @click="clearTheErrors()">+ Add A Pet</v-btn>
        </template>
        <v-card ref="form">
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
                  <v-text-field v-model="name" label="Name" v-bind:error-messages="errors.name"></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field
                    v-model="breed"
                    label="Breed/Species"
                    hint="We like parrots, lizards, and other exotic animals"
                    v-bind:error-messages="errors.breed"
                  ></v-text-field>
                </v-flex>

                <v-card-text>
                  <v-row>
                    <v-col class="pl-0">
                      <v-slider
                        v-model="slider"
                        class="align-center"
                        :max="max"
                        :min="min"
                        hide-details
                        label="Age:"
                      >
                        <template v-slot:append>
                          <v-text-field
                            v-model="sliderDisplay"
                            class="mt-0 pt-0 black--text"
                            style="width: 80px"
                            readonly
                          >years</v-text-field>
                        </template>
                      </v-slider>
                    </v-col>
                  </v-row>
                </v-card-text>

                <v-flex xs12>
                  <v-autocomplete :items="['Large', 'Medium', 'Small']" v-model="petSize" label="Animal Size" v-bind:error-messages="errors.size"></v-autocomplete>
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
    //rules:'',
    menu: [],
    date: '',
    petSize: '',
    min: -3,
    max: 31,
    slider: 0,
    errors:{
      name:'',
      breed:'',
      size:''
    },
    sliderDisplay:'1 year',
    rules: {
          required: value => !!value || 'Required.',
          },
  }),
  watch: {
    slider: function() {
      this.sliderDisplayMod(this.slider);
    },
    name: function() {
      if(!this.name){
        this.errors.name = 'required'
      } else {
        this.errors.name = null
      }
    },
    breed: function() {
      if(!this.breed){
        this.errors.breed = 'required'
      } else {
        this.errors.breed = null
      }
    },
    petSize: function() {
      if(!this.petSize){
        this.errors.size = 'required'
      } else {
        this.errors.size = null
      }
    },
  },
  methods: {
        registerPet: function(e) {
          const creationParams = {
            name: this.name,
            breed: this.breed,
            size: this.petSize,
            age: this.sliderDisplay
          }
          let finished = true
          Object.keys(creationParams).forEach(element => {
            if (!creationParams[element]){
              finished = false
              this.errors[element] = "required"
            }
          });
          if(finished){
            this.createPet(creationParams)
            this.name=''
            this.breed=''
            this.petSize=''
            this.animal = false
          }
           
          e.preventDefault();
            
        },
        sliderDisplayMod(sliderValue){
          if (sliderValue < 2 || sliderValue > 30){
  
            sliderValue = parseInt(sliderValue)
            const babyValues = {
            '-3':'very little',
            '-2':'3 months',
            '-1':'6 months',
            '0':'9 months',
            '1':'1 year',
            '31':'30+ years'
            }
            this.sliderDisplay = babyValues[sliderValue]
          }else {
            this.sliderDisplay = sliderValue + ' years'
          } 
        },
        clearTheErrors(){
          this.errors.name=''
          this.errors.breed=''
          this.errors.size =''
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

