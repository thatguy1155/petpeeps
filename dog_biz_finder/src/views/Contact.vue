<template>
  <div class="contact">
    <v-row align="center" justify="center">
      <v-img
        src="https://images.squarespace-cdn.com/content/v1/5a04ae8eb078690fb6809676/1584453501093-4FEG52FGC9RRUSUB18C6/ke17ZwdGBToddI8pDm48kOMZTFbI2p8BJXhqFsYk-HxZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PI2vxysvDbG0lxOWzhpQTpHl6B78fJRQ2nAOUx8a7TP50/DOG-ON-PHONE.png"
        aspect-ratio="2"
        class="grey lighten-2"
        max-width="1000"
        max-height="500"
        position="100%"
      >
        <v-list-item three-line>
          <v-col>
            <div class="float-sm-left" id="contact">
              CONTACT US
              <br />
              <br />
            </div>
          </v-col>
        </v-list-item>
      </v-img>
    </v-row>
    <div>
      <ul class="align-middle">
        <br />
        <ul
          class="motto"
        >All of the "animal lovers" at PetChin value your opinion and are happy to answer any questions you may have about bringing your pets to animal friendly businesses. Our goal is to make connections between humans and animals easier, so please don't hesitate to call, chat, or email us. We'd love to hear from you!</ul>
        <br />
        <div id="contactCard">
          Reach Us At
          <div>Phone Number: 02-501-6064</div>
          <div>Email: james.glass1155@gmail.com</div>
        </div>
      </ul>
    </div>

    <br />
    <br />
    <page-footer />
  </div>
</template>

<script>
import PageFooter from "@/components/PageFooter";
export default {
  components: {
    PageFooter
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
.motto {
  font-size: 25px;
}
#contactCard {
  font-size: 20px;
  font-weight: bold;
}

#contact {
  font-size: 25px;
  padding: 80px;
  /* border: red 1px solid; */
}
</style>
