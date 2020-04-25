<template>
  <div>
    <v-card class="mx-auto" max-width="434" tile>
      <v-img height="100%" src>
        <v-row align="end" class="fill-height">
          <v-col align-self="start" class="pa-0" cols="12">
            <v-avatar id="profilePic" class="profile" color="grey" size="164" tile>
              <v-img
                src="https://i.pinimg.com/originals/66/95/4f/66954f3cfcb3ec22e7d057bc84059a76.jpg"
              ></v-img>
            </v-avatar>
            <v-col class="py-0">
              <v-list-item color="rgba(0, 0, 0, .4)" dark>
                <v-list-item-content id="animalFont">
                  <v-list-item-title id="animalFont" class="title">Name: Fido</v-list-item-title>
                  <v-list-item-subtitle id="animalFont">Breed: Puppy</v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-col>
        </v-row>
      </v-img>
    </v-card>
  </div>
</template>

<script>
</script>

<style>
#animalFont {
  color: black;
  font-size: 41px !important;
  display: inline-block;
}
#profilePic {
  float: left;
}
</style>