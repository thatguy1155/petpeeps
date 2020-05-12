<template>
  <div class="text-center">
    <v-btn color="brown lighten-3" dark @click="deletePet(petInfo.id)">delete</v-btn>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      animal: false,
      breed: this.petInfo.breed,
      name: this.petInfo.name,
      rules: "",
      menu: [],
      date: "",
      size: this.petInfo.size,
      sizeOptions: ["Large", "Medium", "Small"]
    };
  },
  props: ["petInfo"],
  methods: {

    ...mapActions({
      deletePet: "petModule/deletePet"
    })
    },
    
  }
</script>
