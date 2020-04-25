<template>
  <div>
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
  </div>
</template>

<script>
</script>

<style>
#addressFont {
  color: black;
  font-size: 15px !important;
  display: inline-block;
}
#bizFont {
  color: black;
  font-size: 20px !important;
  display: inline-block;
}
#profilePic {
  float: left;
}
</style>