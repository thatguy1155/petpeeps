<template>
  <v-col
    cols="12" xs="12" sm="12" md="12" xl="12"
  >
    <v-card>
      <v-card-title>{{ bizName }}</v-card-title>
      <v-card-text class="d-flex flex-column align-start">
        <div>   
          <v-icon color="#8D6E63" v-show="bizType === 'Cafe'">mdi-coffee</v-icon>
          <v-icon color="#8D6E63" v-show="bizType === 'Restaurant'">mdi-silverware-fork-knife</v-icon>
          {{ bizType }}
        </div>
        <br />
        <div>
          <v-icon color="#8D6E63">mdi-calendar-clock</v-icon>
          {{ hours }}
        </div>
        <br />
        <div>
          <v-icon color="#8D6E63">mdi-map-marker</v-icon>
          {{ address }}
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="orange" text>More Details</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>
export default {
  props: {
    bizName: {
      type: String,
      default: 'name of business'
    },
    bizType: {
      type: String,
      default: 'type of business'
    },
    hours: {
      type: String,
      default: 'hours'
    },
    address: {
      type: String,
      default: 'address'
    },
  }
}
</script>

<style>
</style>
