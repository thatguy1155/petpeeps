<template>
  <div>
    <v-card class="mx-auto" max-width="434" tile>
      <!-- <v-img height="100%" src> -->
      <v-row align="end" class="fill-height">
        <v-col align-self="start" class="pa-0" cols="12" xs="12" sm="12" md="6" xl="6">
          <v-avatar id="profilePic" class="profile" color="grey" size="164" tile>
            <!-- <v-img
              src="https://favy-inbound-singapore.s3.amazonaws.com/uploads/topic/image/1515/Untitled_design__10_.jpg"
            ></v-img> -->
            <v-img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSBAqzQvGxel21qNpBLCEoUSrp_Z0pHA1uqorT-RdtgpG8Ql9Xz&usqp=CAU"></v-img>
          </v-avatar>
        </v-col>
        <v-col class="py-0">
        <!-- <v-list color="rgba(0, 0, 0, .4)" dark> -->
        <v-list-item id="bizFont">
          <v-list-item-title id="bizFontTitle">Name: Fido's Cafe</v-list-item-title>
          <v-list-item-content id="bizFont">
            <div>Business Type: 24/7</div>
            <div>Open time: 24/7</div>
            <div>
              Address:11 Nonhyeon-ro 151-gil,
              <br />Sinsa-dong, Gangnam-gu, Seoul
            </div>
          </v-list-item-content>
          <!-- <v-list-item-content id="bizFont">Open time: 24/7</v-list-item-content>
                <v-list-item-content id="addressFont">
                  Address:11 Nonhyeon-ro 151-gil,
                  <br />Sinsa-dong, Gangnam-gu, Seoul
          </v-list-item-content>-->
        </v-list-item>
        <!-- </v-list> -->
        </v-col>
      </v-row>
      <!-- </v-img> -->
    </v-card>
  </div>
</template>

<script>
</script>

<style>
#addressFont {
  color: black;
  font-size: 17px !important;
  display: inline-block;
}
#bizFont {
  color: black;
  font-size: 12px !important;
  display: inline-block;
  justify-content: baseline;
}
#bizFontTitle {
  color: black;
  font-size: 20px !important;
  display: inline-block;
}
#profilePic {
  float: left;
}
</style>