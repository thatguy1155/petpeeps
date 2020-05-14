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
                  <v-text-field label="Name" v-model="name" v-bind:error-messages="errors.name"></v-text-field>
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
                  <v-select :items="sizeOptions" v-model="size" value="size" label="Animal Size" v-bind:error-messages="errors.size"></v-select>
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
        sizeOptions: ['Large', 'Medium', 'Small'],
        min: -3,
        max: 31,
        slider: 0,
        sliderDisplay:'1 year',
        errors:{
          name:'',
          breed:'',
          size:''
        },
      }
    },
    props: ["petInfo"],
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
      size: function() {
        if(!this.size){
          this.errors.size = 'required'
        } else {
          this.errors.size = null
        }
      },
    },
    methods: {
        modifyPet: function(e) {
          const creationParams = {
            id:this.petInfo.id,
            name: this.name,
            breed: this.breed,
            size: this.size,
            age:this.sliderDisplay
          }
          let finished = true
          Object.keys(creationParams).forEach(element => {
            if (!creationParams[element]){
              finished = false
              this.errors[element] = "required"
            }
          });
          if(finished){
            this.editPet(creationParams)
            this.animal = false
          }
          
              
          e.preventDefault();
            
        },
        sliderDisplayMod(sliderValue){
          if (sliderValue < 2|| sliderValue > 30){
  
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
      ...mapActions({
        'editPet': 'petModule/editPet',
        
      }),
      save() {
        
      }
    },
  }
</script>
API