<template>
    <v-card class="d-flex row align-center px-12">
      <v-card-title>{{ bizName }}</v-card-title>
      <v-card-text class="d-flex flex-column align-start">
        <div>   
          <v-icon color="#8D6E63">{{ bizTypeIcon }}</v-icon>
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
      <v-card-actions class="d-flex row justify-end mr-2">
        <v-btn color="orange" text>More Details</v-btn>
      </v-card-actions>
    </v-card>
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
  },
  computed: {
    bizTypeIcon() {
      if (this.bizType === 'Cafe') {
        return 'mdi-coffee';
      } else if (this.bizType === 'Restaurant') {
        return 'mdi-silverware-fork-knife';
      } else {
        return '';
      }
    }
  }
}
</script>

<style>
</style>
