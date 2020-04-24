<template>
  <v-footer padless dark color="black">
    <v-row>
      <v-col 
        cols="12" xs="12" sm="12" md="12" xl="12" no-gutter style="border: 1px solid black;"
      >

        <v-card tile class="lighten-1 white--text text-center">
          <v-card-text>
        
            <social-media-button 
                v-for='(icon, index) in icons'
                :key='index'
                :iconName='icon.iconName'
                :linkTo='icon.linkTo'
            />

          </v-card-text>

          <v-card-text
            class="white--text"
            id="footerText"
          >We At DogPeeps strive to connect businesses in Seoul to all animal lovers! 
          Our deep values cherish the bond and loyalty that can only come from a lovable pet.
          We will not stop until every animal friendly business is connected to animal lovers!</v-card-text>

          <v-divider></v-divider>

          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} —
            <strong>With Love ♥️ from DogPeeps</strong>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-footer>
</template>
<script>
import SocialMediaButton from '@/components/componentsWithProps/SocialMediaButton'
export default {
    components: {
        SocialMediaButton
    },
    data() {
        return {
            icons: [
                {
                    iconName: 'mdi-facebook',
                    linkTo: 'https://facebook.com/'
                },
                {
                    iconName: 'mdi-twitter',
                    linkTo: 'https://twitter.com'
                },
                {
                    iconName: 'mdi-google-plus',
                    linkTo: 'https://google.com/'
                },
                {
                    iconName: 'mdi-linkedin',
                    linkTo: 'https://linkedin.com'
                }, 
                {
                    iconName: 'mdi-instagram',
                    linkTo: 'https://instagram.com'
                },
                {
                    iconName: 'mdi-blogger',
                    linkTo: 'https://blog.naver.com'
                }, 
            ]
        }
    }
};
</script>

<style scoped>
#footerText {
  position: relative;
}
</style>