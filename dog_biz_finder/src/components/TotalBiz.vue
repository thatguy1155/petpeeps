<template>
  <v-container>
    <h1>my businesses</h1>
    <v-row justify="center">
      <v-col cols="12" lg="9" m="12" sm="12" xs="6" class="d-flex flex-wrap">
        <v-card
          class="mx-10 my-6"
          v-for="(biz, index) in bizList"
          :key="index"
          max-width="434"
        >
          <profile-biz :bizInfo="biz" :bizKey="index" />
        </v-card>
        <div>
          <v-flex xs2>
            <add-biz id="bizButton" />
          </v-flex>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState } from "vuex";
import ProfileBiz from "@/components/ProfileBiz";
import AddBiz from "@/components/AddBiz";

export default {
  components: {
    AddBiz,
    ProfileBiz,
  },
  methods: {
    ...mapActions({
      getBiz: "bizModule/getBiz",
    }),
  },
  computed: {
    ...mapState("bizModule", {
      bizList: (state) => state.bizArray,
    }),
  },
  mounted() {
    this.getBiz();
    console.log("bizList", this);
  },
  watch: {
    bizList: function() {
      this.getBiz();
    },
  },
};
</script>
<style>
#bizButton {
  height: 166px;
  width: 341px;
  min-width: 77px;
  font-size: 40px;
  border-radius: 5px;
  margin-left: 28px;
  margin-top: 12px;
}
</style>
