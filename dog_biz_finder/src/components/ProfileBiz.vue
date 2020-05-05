<template>
  <div>

    <v-card
      class="mx-auto"
      width="344"
      outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">{{petInfo.breed}}</div>
          <v-list-item-title class="headline mb-1">{{petInfo.name}}</v-list-item-title>
          <v-list-item-subtitle>I love this pet</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
          tile
          size="80"
        >
          <v-img src="https://favy-inbound-singapore.s3.amazonaws.com/uploads/topic/image/1515/Untitled_design__10_.jpg"></v-img>
        </v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <EditBiz v-bind:bizInfo="bizInfo"/>
        <!-- <v-btn text>Button</v-btn> -->
      </v-card-actions>
    </v-card>


    <!-- <div>
      <v-card class="mx-auto" max-width="434" tile>
        <v-img height="100%" src>
          <v-row align="end" class="fill-height">
            <v-col align-self="start" class="pa-0" cols="12">
              <v-avatar id="profilePic" class="profile" color="grey" size="164" tile>
                <v-img
                  src="https://favy-inbound-singapore.s3.amazonaws.com/uploads/topic/image/1515/Untitled_design__10_.jpg"
                ></v-img>
              </v-avatar>
              <v-col class="py-0">
                <v-list-item color="rgba(0, 0, 0, .4)" dark>
                  <v-list-item-content id="bizFont">
                    <v-list-item-title id="bizFont">Name: Fido's Cafe</v-list-item-title>
                    <v-list-item-title id="bizFont">Business Type: 24/7</v-list-item-title>
                    <v-list-item-title id="bizFont">Open time: 24/7</v-list-item-title>
                    <v-list-item-title id="addressFont">
                      Address:11 Nonhyeon-ro 151-gil,
                      <br />Sinsa-dong, Gangnam-gu, Seoul
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
            </v-col>
          </v-row>
        </v-img>
      </v-card>
    </div> -->
  </div>
</template>

<script>
import EditBiz from "@/components/EditBiz.vue";
export default {
    name: "ProfileBiz",
    props: ["bizInfo"],
    components: {
        EditBiz
    }, 
}
</script>

<style>
#bizFont {
  color: black;
  font-size: 41px !important;
  display: inline-block;
}

#addressFont {
  color: black;
  font-size: 15px !important;
  display: inline-block;
}

#profilePic {
  float: left;
}
</style>
