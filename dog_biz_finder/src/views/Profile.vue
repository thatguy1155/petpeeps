<template>
    <div>
        <v-row justify="center">
            <v-dialog v-model="animal" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn id="animalButton" color="primary" dark v-on="on"> + Add A Pet</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">Edit or Add Pet Info</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="Pick an Photo" prepend-icon="mdi-camera" label="Pet Photo"></v-file-input>
                                <v-flex xs12></v-flex>

                                <v-text-field label="Name" required></v-text-field>
                                <v-flex xs12></v-flex>

                                <v-text-field label="Breed/Species" hint="We like parrots, lizards, and other exotic animals"></v-text-field>
                                <v-flex xs12></v-flex>

                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="290px">
                                    <template v-slot:activator="{ on }">
                                        <v-flex xs12></v-flex>
                                        <v-text-field v-model="date" label="Birthday date" prepend-icon="" readonly v-on="on"></v-text-field>
                                    </template>
                                    <v-date-picker ref="picker" v-model="date" :max="new Date().toISOString().substr(0, 10)" min="1950-01-01" @change="save"></v-date-picker>
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

            <v-dialog v-model="business" persistent max-width="600px">
                <template v-slot:activator="{ on }">
                    <v-btn color="primary" dark v-on="on"> + Add A Business</v-btn>
                </template>
                <v-card>
                    <v-card-title>
                        <span class="headline">Edit or Add Business Info</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-file-input :rules="rules" accept="image/png, image/jpeg, image/bmp" placeholder="+ Add Pictures" prepend-icon="mdi-camera" label="Business Photo"></v-file-input>
                                <v-flex xs12></v-flex>

                                <v-text-field label="Name" required></v-text-field>
                                <v-flex xs12></v-flex>

                                <v-text-field label="Business Type" hint="cafe, bar, restaurant, and etc"></v-text-field>
                                <v-flex xs12></v-flex>

                                <v-text-field label="Business Hours" hint=""></v-text-field>
                                <v-flex xs12></v-flex>

                                <v-text-field label="Address" hint=""></v-text-field>
                                <v-flex xs12></v-flex>

                                <v-text-field label="Telephone" hint=""></v-text-field>
                                <v-flex xs12></v-flex>

                                <v-text-field label="Website" hint=""></v-text-field>
                                <v-flex xs12></v-flex>

                                <v-text-field label="Social Media" hint=""></v-text-field>
                                <v-flex xs12></v-flex>

                                <v-textarea filled auto-grow label="BIO" rows="5" row-height="30" shaped></v-textarea>
                                <v-flex xs12></v-flex>

                                <v-col cols="25" sm="21" md="30">

                                    <v-data-table :headers="headers" :items="menu" sort-by="price ₩" class="elevation-1">
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
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-text-field v-model="editedItem.name" label="Menu Item"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-text-field v-model="editedItem.calories" label="Calories"></v-text-field>
                                                                    </v-col>

                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-text-field v-model="editedItem.carbs" label="Carbs (g)"></v-text-field>
                                                                    </v-col>
                                                                    <v-col cols="12" sm="6" md="4">
                                                                        <v-text-field v-model="editedItem.protein" label="Protein (g)"></v-text-field>
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
                                            <v-icon small class="mr-2" @click="editItem(item)">
                                                mdi-pencil
                                            </v-icon>
                                            <v-icon small @click="deleteItem(item)">
                                                mdi-delete
                                            </v-icon>
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
        animal: false,
        business: false,
        headers: [{
                text: 'Menu Item',
                align: 'start',
                sortable: false,
                value: 'name',
            },
            {
                text: 'Price ₩',
                value: 'calories'
            },
            {
                text: 'Carbs (g)',
                value: 'carbs'
            },
            {
                text: 'Protein (g)',
                value: 'protein'
            },
            {
                text: 'Actions',
                value: 'actions',
                sortable: false
            },
        ],
        menu: [],
        editedIndex: -1,
        editedItem: {
            name: '',
            calories: 0,

            carbs: 0,
            protein: 0,
        },
        defaultItem: {
            name: '',
            calories: 0,

            carbs: 0,
            protein: 0,
        },
    }),

    computed: {
        formTitle() {
            return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
        },
    },

    watch: {
        dialog(val) {
            val || this.close()
        },
    },

    created() {
        this.initialize()
    },

    methods: {
        initialize() {
            this.menu = [{
                    name: 'Frozen Yogurt',
                    calories: 2000,
                    carbs: 433,
                    protein: 4.0,
                },
                {
                    name: 'Ice cream sandwich',
                    calories: 5200,
                    carbs: 453,
                    protein: 4.3,
                },
                {
                    name: 'Eclair',
                    calories: 6530,
                    carbs: 234,
                    protein: 6.0,
                },
                {
                    name: 'Cupcake',
                    calories: 7309,
                    carbs: 435,
                    protein: 4.3,
                },
                {
                    name: 'Gingerbread',
                    calories: 3562,
                    carbs: 497,
                    protein: 3.9,
                },
                {
                    name: 'Jelly bean',
                    calories: 7236,
                    carbs: 948,
                    protein: 546,
                },
                {
                    name: 'Lollipop',
                    calories: 3925,
                    carbs: 989,
                    protein: 234,
                },
                {
                    name: 'Honeycomb',
                    calories: 4082,
                    carbs: 872,
                    protein: 6.5,
                },
                {
                    name: 'Donut',
                    calories: 4526,
                    carbs: 514,
                    protein: 4.9,
                },
                {
                    name: 'KitKat',
                    calories: 5000,
                    carbs: 655,
                    protein: 7,
                },
            ]
        },

        editItem(item) {
            this.editedIndex = this.menu.indexOf(item)
            this.editedItem = Object.assign({}, item)
            this.dialog = true
        },

        deleteItem(item) {
            const index = this.menu.indexOf(item)
            confirm('Are you sure you want to delete this item?') && this.menu.splice(index, 1)
        },

        close() {
            this.dialog = false
            setTimeout(() => {
                this.editedItem = Object.assign({}, this.defaultItem)
                this.editedIndex = -1
            }, 300)
        },

        save() {
            if (this.editedIndex > -1) {
                Object.assign(this.menu[this.editedIndex], this.editedItem)
            } else {
                this.menu.push(this.editedItem)
            }
            this.close()
        },
    }
}

</script>

<style>
/* // #animalButton {
//   margin-right: 2%;
// } */
</style>

 <script>
//   <div>
//     <account-options v-show="emptyAccountType" />
//     <account />
//   </div>
// </template>
// import Account from '@/components/Account'
// import AccountOptions from '@/components/AccountOptions'
// import { mapState, mapActions } from 'vuex'

// export default {
//   components: {
//     Account,
//     AccountOptions
//   },
//   data: () => ({
//     emptyAccountType: false
//   }),
//   methods: {
//     ...mapActions({
//       'getUser': 'profileModule/getUser'
//     }),
//     checkAccountTypeStatus() {
//       if (this.user.accountType === '') {
//         this.emptyAccountType = true;
//       }
//     }
//   },
//   computed: {
//     ...mapState('profileModule', {
//       user: state => state.user
//     })
//   },
//   created() {
//     this.getUser();
//     this.checkAccountTypeStatus();
//   }
// }
// </script>

// <style></style>
