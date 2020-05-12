<template>
  <!-- <div> -->
    <v-dialog v-model="dialog" scrollable max-width="300px">
      <template v-slot:activator="{ on }">
        <v-btn color="#8D6E63" class="white--text d-flex justify-start" v-on="on">Menu</v-btn>
      </template>
      <v-card>
        <v-card-title>Menu</v-card-title>
        <v-divider></v-divider>
        <v-card-text style="height: 300px;"> </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Close</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  <!-- </div> -->
</template>

<script>
export default {
  name: "MenuMainBizCard",
  props: {},
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style lang="scss" scoped></style>
