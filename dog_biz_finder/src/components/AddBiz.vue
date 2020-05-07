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
                  <v-text-field label="Name" v-model="bizName" required></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-text-field label="Business Type" v-model="bizType" hint="cafe, bar, restaurant, and etc"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-text-field label="Business Hours" v-model="bizHrs" hint="Mon-Fri: 9:00-19:00, Sat: 10:00-21:00, Sun: Closed"></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-text-field label="Address" v-model="bizAddr" hint></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-text-field label="Telephone" v-model="bizTel" hint></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-text-field label="Website" v-model="bizSite" hint></v-text-field>
                </v-col>

                <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12" no-gutter>
                  <v-data-table
                    :headers="socialMediaHeaders"
                    :items="socialMediaArr"
                    :disable-pagination="true"
                    :hide-default-footer="true"
                    class="elevation-1"
                  >
                    <template v-slot:top>
                      <v-toolbar flat color="white">
                        <v-spacer></v-spacer>
                        <v-dialog v-model="socialMediaModal" max-width="55%">
                          <template v-slot:activator="{ on }">
                            <v-btn color="primary" dark class="mb-2" v-on="on">Add Media</v-btn>
                          </template>
                          <v-card>
                            <v-card-title>
                              <span class="headline">{{ formMediaTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                              <v-container>
                                <v-row>
                                  <v-col cols="12" xs="4" sm="4" md="4" lg="4" xl="4" no-gutter>
                                    <v-select
                                      v-model="editedMedia.media"
                                      :items="socialMediaList"
                                      label="Social Media"
                                    />
                                  </v-col>

                                  <v-col cols="12" xs="8" sm="8" md="8" lg="8" xl="8" no-gutter>
                                    <v-text-field label="Your link" v-model="editedMedia.link"></v-text-field>
                                  </v-col>
                                </v-row>
                              </v-container>
                            </v-card-text>

                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="blue darken-1" text @click="closeMedia">Cancel</v-btn>
                              <v-btn color="blue darken-1" text @click="saveMedia">Save</v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-toolbar>
                    </template>
                    <template v-slot:item.actions="{ item }">
                      <v-icon small class="mr-2" @click="editSocialMedia(item)">mdi-pencil</v-icon>
                      <v-icon small @click="deleteSocialMedia(item)">mdi-delete</v-icon>
                    </template>
                  </v-data-table>
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
                        <v-dialog v-model="dialog" max-width="55%">
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
                                    <v-text-field v-model="editedItem.price" label="Price"></v-text-field>
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
                  </v-data-table>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="business = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click="addBiz">Add</v-btn>
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
    socialMediaModal: false,
    // rules: "",
    socialMediaHeaders: [
      {
        text: "Social Media",
        align: "start",
        sortable: false,
        value: "media"
      },
      {
        text: "Link",
        value: "link",
        sortable: false
      },

      {
        text: "",
        value: "actions",
        sortable: false
      }
    ],
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
    bizName: '',
    bizType: '',
    bizHrs: '',
    bizAddr: '',
    bizTel: '',
    bizSite: '',
    socialMediaArr: [],
    menu: [],
    socialMediaList: [
      'facebook',
      'twitter',
      'linkedIn',
      'instagram',
      'blogger'
    ],
    editedIndex: -1,
    editedItem: {
      name: "",
      price: 0
    },
    editedMediaIndex: -1,
    editedMedia: {
      media: "",
      link: ""
    },
    defaultItem: {
      name: "",
      price: 0,
      calories: 0
    },
    defaultMedia: {
      media: "",
      link: ""
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
    formMediaTitle() {
      return this.editedMediaIndex === -1 ? "New Media" : "Edit Media";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  methods: {
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

    closeMedia() {
      this.socialMediaModal = false;
      setTimeout(() => {
        this.editedMedia = Object.assign({}, this.defaultMedia);
        this.editedMediaIndex = -1;
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

    saveMedia() {
      if (this.editedMediaIndex > -1) {
        Object.assign(this.socialMediaArr[this.editedMediaIndex], this.editedMedia);
      } else {
        this.socialMediaArr.push(this.editedMedia);
      }
      this.closeMedia();
    },
    editSocialMedia(item) {
      this.editedMediaIndex = this.socialMediaArr.indexOf(item);
      this.editedMedia = Object.assign({}, item);
      this.socialMediaModal = true;
    },
    deleteSocialMedia(item) {
      const index = this.socialMediaArr.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.socialMediaArr.splice(index, 1);
    },
    addBiz() {
      let bizParams = {
        bizName: this.bizName,
        bizType: this.bizType,
        bizHrs: this.bizHrs,
        bizAddr: this.bizAddr,
        bizTel: this.bizTel,
        bizSite: this.bizType,
        socialMediaArr: this.socialMediaArr,
        menu: this.menu,
      }
      console.log(bizParams)
    } 
  }
};
</script>

<style>
#bizButton {
  font-size: 30px !important;
}
</style>
