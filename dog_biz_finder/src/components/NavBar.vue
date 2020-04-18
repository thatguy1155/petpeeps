<template>
  <div id='navBar'>
    <v-app-bar
      color="brown"
      dense
      dark
    >
      <!-- this is the hamburger menu button on the top left -->
      <v-app-bar-nav-icon />
      <!-- this is our title goes -->
      <v-toolbar-title>DogPeeps</v-toolbar-title>
      <!-- this is the spacer between title and icon buttons -->
      <v-spacer />
      <!-- ***** these are the buttons on the right side of the navbar ***** -->
      <!-- <v-btn icon to='/'>
        <v-icon>mdi-map</v-icon>
      </v-btn>
      <v-btn icon to='/profile'>
        <v-icon>mdi-paw</v-icon>
      </v-btn> -->
      <v-btn 
        v-for='(l, index) in menuLinks'
        :key='index'
        icon
        @click='goTo(l.linkTo)'
      >
        <v-icon>{{ l.iconName }}</v-icon>
      </v-btn>
      <!-- ***************************************************************** -->

      <!-- ----------this will be the popup menu when the dots are pressed--------- -->
      <!-- <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <!-- -------------------------------------------------------------------------- -->
    </v-app-bar>
  </div>
</template>
<script>
export default {
  data() {
    return {
        menuLinks: [{
          linkTo: '/',
          iconName: 'mdi-map',
        }, 
        {
          linkTo: '/profile',
          iconName: 'mdi-paw'
        }, {
          linkTo: '/contact',
          iconName: 'mdi-phone'
        }]
    }
  },
  methods: {
    goTo(path) {
      this.$router.push(path)
    }
  }
}
</script>
<style scoped>
  /* #navBar {
    border: 1px solid black;
    border-radius: 10px !important;
  } */
</style>