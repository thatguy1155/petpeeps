<template>
    <!-- ADD A (ANIMAL) MODAL/PROFILE START-->
    <div class="grid1x1" v-if="accountType === 'personal'">
      <!-- <div class="grid1x1"> -->
      <profile-animal />
      <div>
        <v-flex xs2>
          <!-- <v-card-text> -->
            <add-animal id="animalButton" />
          <!-- </v-card-text> -->
        </v-flex>
      </div>
    </div>
    <!-- ADD A (ANIMAL) MODAL/PROFILE END-->
</template>

<script>
import ProfileAnimal from "@/components/ProfileAnimal";
import AddAnimal from "@/components/AddAnimal";

export default {
    components: {
    AddAnimal,
    ProfileAnimal
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
#animalButton {
  height: 165px;
  width: 371px;
  min-width: 77px;
  font-size: 40px;
  border-radius: 0px;
}
</style>