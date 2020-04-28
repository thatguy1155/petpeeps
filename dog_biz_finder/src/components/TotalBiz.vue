<template>
     <!-- ADD A (BUSINESS) MODAL/PROFILE START-->
    
      <div class="grid1x1">
      <profile-biz />
      <div>
        <v-flex xs2>
          <!-- <v-card-text> -->
            <add-biz id="bizButton" />
          <!-- </v-card-text> -->
        </v-flex>
      </div>
    </div>
    <!-- ADD A (BUSINESS) MODAL/PROFILE END-->   
</template>
<script>
import AddBiz from "@/components/AddBiz";
import ProfileBiz from "@/components/ProfileBiz";
export default {
    components: {
    AddBiz,
    ProfileBiz
  }  
};
</script>
<style>
.grid1x1 {
  min-height: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-end;
}
.grid1x1 > div {
  display: flex;
  flex-basis: calc(52% - 124px);
  justify-content: center;
  flex-direction: column;
}
#bizButton {
  height: 165px;
  width: 371px;
  min-width: 77px;
  font-size: 33px;
  border-radius: 0px;
}
</style>