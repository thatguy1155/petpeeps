<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="business" max-width="600px">
        <template v-slot:activator="{ on }">
          <v-btn id="bizButton" color="brown" dark v-on="on">+ Add A Business</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">Add Business Info</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <!-- <v-file-input
                  :rules="rules"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="+ Add Pictures"
                  prepend-icon="mdi-camera"
                  label="Business Photo"
                  ></v-file-input>-->
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-text-field label="Name" required></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-text-field label="Business Type" hint="cafe, bar, restaurant, and etc"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-text-field label="Business Hours" hint="Mon-Fri: 9:00-19:00, Sat: 10:00-21:00, Sun: Closed"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-text-field label="Address" hint></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-text-field label="Telephone" hint></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-text-field label="Website" hint></v-text-field>
                </v-col>

                <v-col cols="12" xs="3" sm="3" md="3" lg="3" xl="3" no-gutter>
                  <v-select
                    v-model="socialMedia"
                    :items="socialMediaList"
                    label="Social Media"
                  /> 
                  <!-- @change="save" inside v-select -->
                </v-col>
                <v-col cols="12" xs="7" sm="7" md="7" lg="7" xl="7" no-gutter>
                  <v-text-field label="Your link" v-model="socialMediaLink"></v-text-field>
                </v-col>
                <v-col cols="12" xs="2" sm="2" md="2" lg="2" xl="2" no-gutter>
                  <v-btn color="primary" dark @click="addSocialMedia()">Add</v-btn>
                </v-col>
                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-list>
                    <v-list-item v-for="(media, index) in socialMediaArr" :key="index">
                      <v-list-title>{{ media.name }}</v-list-title>
                      <v-list-title>{{ media.link }}</v-list-title>

                      <v-list-item-action>
                        <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
                        <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
                      </v-list-item-action>
                    </v-list-item>
                  </v-list>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-textarea filled auto-grow label="BIO" rows="5" row-height="30" shaped></v-textarea>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
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
                            <v-btn color="primary" dark class="mb-2" v-on="on">Add Item</v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col>
                                    <v-text-field v-model="editedItem.name" label="Menu Item"></v-text-field>
                                  </v-col>

                                  <v-col>
                                    <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                                  </v-col>
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
            <v-btn color="blue darken-1" text @click="business = false">Add</v-btn>
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
    dialog: false,
    // rules: "",
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
        text: "",
        value: "actions",
        sortable: false
      }
    ],
    socialMedia: '',
    socialMediaLink: '',
    socialMediaList: [
      'facebook',
      'twitter',
      'linkedIn',
      'instagram',
      'blogger'
    ],
    socialMediaArr: [],
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
    },
    addSocialMedia() {
      let media = {
        name: this.socialMedia,
        link: this.socialMediaLink
      }
      
      this.socialMediaArr.push(media)
      this.socialMedia = ""
      this.socialMediaLink = ""
    }
  }
};
</script>

<style>
#bizButton {
  font-size: 30px !important;
}
</style>
