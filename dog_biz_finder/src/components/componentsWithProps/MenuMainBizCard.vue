<template>
  <!-- <div> -->
  <v-dialog v-model="dialog" scrollable max-width="400px">
    <template v-slot:activator="{ on }">
      <v-btn color="#8D6E63" class="white--text d-flex justify-start" v-on="on"
        >Menu</v-btn
      >
    </template>
    <v-card>
      <v-card-title color="#8D6E63">Menu</v-card-title>
      <v-divider></v-divider>
      <v-card-text style="height: 300px;">
        <table>
          <tr>
            <th>Item</th>
            <th>Price (won)</th>
            <th>Calories (kcal)</th>
          </tr>
          <tr v-for="(menuItem, index) in menu" :key="index">
            <td>{{ menuItem.item }}</td>
            <td>{{ menuItem.price }}</td>
            <td>{{ menuItem.calories }}</td>
          </tr>
        </table>
      </v-card-text>
      <v-divider></v-divider>
      <v-card-actions>
        <v-btn color="#8D6E63" text @click="dialog = false">Close</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- </div> -->
</template>

<script>
export default {
  name: "MenuMainBizCard",
  props: {
    menu: {
      type: Array,
      default() {
        return [
          {
            item: "menu item",
            price: "price",
            calories: "calories",
          }
        ];
      }
    },
  },
  data() {
    return {
      dialog: false,
    };
  },
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  text-align: center;
}

th,
td {
  text-align: left;
  border-collapse: collapse;
  padding-bottom: 4px;
}
</style>
