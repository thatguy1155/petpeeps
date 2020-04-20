<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="animal" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn id="animalButton" color="primary" dark v-on="on">+ Add A Pet</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Edit or Add Pet Info</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-file-input
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an Photo"
                  prepend-icon="mdi-camera"
                  label="Pet Photo"
                ></v-file-input>
                <v-flex xs12></v-flex>

                <v-text-field label="Name" required></v-text-field>
                <v-flex xs12></v-flex>

                <v-text-field
                  label="Breed/Species"
                  hint="We like parrots, lizards, and other exotic animals"
                ></v-text-field>
                <v-flex xs12></v-flex>

                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-flex xs12></v-flex>
                    <v-text-field
                      v-model="date"
                      label="Birthday date"
                      prepend-icon
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    ref="picker"
                    v-model="date"
                    :max="new Date().toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                  ></v-date-picker>
                </v-menu>

                <v-autocomplete :items="['Large', 'Medium', 'Small']" label="Animal Size"></v-autocomplete>
                <v-flex xs12></v-flex>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="animal = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="animal = false">Edit/Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    animal: false,
  })
};
</script>

<style>
#animalButton {
   margin-right: 2%;
 }
</style>

