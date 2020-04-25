<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="business" persistent max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn id="bizButton" color="brown" dark v-on="on">+ Add A Business</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Edit or Add Business Info</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-flex xs12>
                  <!-- <v-file-input
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="+ Add Pictures"
                  prepend-icon="mdi-camera"
                  label="Business Photo"
                  ></v-file-input>-->
                </v-flex>

                <v-flex xs12>
                  <v-text-field label="Name" required></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field label="Business Type" hint="cafe, bar, restaurant, and etc"></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field label="Business Hours" hint></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field label="Address" hint></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field label="Telephone" hint></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field label="Website" hint></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-text-field label="Social Media" hint></v-text-field>
                </v-flex>

                <v-flex xs12>
                  <v-textarea filled auto-grow label="BIO" rows="5" row-height="30" shaped></v-textarea>
                </v-flex>

                <v-col cols="25" sm="21" md="30">
                  <v-data-table
                    :headers="headers"
                    :items="menu"
                    sort-by="price ₩"
                    class="elevation-1"
                  >
                    <template v-slot:top>
                      <v-toolbar flat color="white">
                        <v-toolbar-title>MENU</v-toolbar-title>
                        <v-divider class="mx-4" inset vertical></v-divider>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="1000px">
                          <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-flex xs12>
                                    <v-text-field v-model="editedItem.name" label="Menu Item"></v-text-field>
                                  </v-flex>

                                  <v-flex xs12>
                                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                                  </v-flex>
                                </v-row>
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                    </template>
                    <template v-slot:no-data>
                      <v-btn color="primary" @click="initialize">Reset</v-btn>
                    </template>
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="business = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="business = false">Edit/Add</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => ({
    business: false,
    rules: '',
    headers: [
      {
        text: "Menu Item",
        align: "start",
        sortable: false,
        value: "name"
      },
      {
        text: "Price ₩",
        value: "price"
      },
      {
        text: "Calories",
        value: "calories"
      },

      {
        text: "Actions",
        value: "actions",
        sortable: false
      }
    ],
    menu: [],
    editedIndex: -1,
    editedItem: {
      name: "",
      price: 0
    },
    defaultItem: {
      name: "",
      calories: 0
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.menu = [
        {
          name: "Frozen Yogurt",
          price: 2000,
          calories: 123
        },
        {
          name: "Ice cream sandwich",
          price: 5200,
          calories: 123
        },
        {
          name: "Eclair",
          price: 6530,
          calories: 123
        },
        {
          name: "Cupcake",
          price: 7309,
          calories: 123
        },
        {
          name: "Gingerbread",
          price: 3562,
          calories: 123
        },
        {
          name: "Jelly bean",
          price: 7236,
          calories: 123
        },
        {
          name: "Lollipop",
          price: 3925,
          calories: 123
        },
        {
          name: "Honeycomb",
          price: 4082,
          calories: 123
        },
        {
          name: "Donut",
          price: 4526,
          calories: 123
        },
        {
          name: "KitKat",
          price: 5000,
          calories: 123
        }
      ];
    },

    editItem(item) {
      this.editedIndex = this.menu.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.menu.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.menu.splice(index, 1);
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.menu[this.editedIndex], this.editedItem);
      } else {
        this.menu.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style>
</style>
