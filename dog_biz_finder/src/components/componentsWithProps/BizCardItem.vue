<template>
  <v-col
    cols="12" xs="12" sm="12" md="6" xl="6"
  >
    <v-card>
      <v-img
        class="white--text align-end"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title>{{ title }}</v-card-title>
      </v-img>
      <!-- <v-card-subtitle class="pb-0">{{ subtitle }}</v-card-subtitle> -->
      <v-card-text class="text--primary">
        <div>{{ placeDescription }}</div>
        <div>{{ address}}</div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="orange" text>Share</v-btn>
        <v-btn color="orange" text>Explore</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'test'
    },
    // subtitle: {
    //   type: String,
    //   default: 'subtitle test'
    // },
    placeDescription: {
      type: String,
      default: 'place description'
    },
    address: {
      type: String,
      default: 'address of place'
    },
  }
}
</script>