<template>
    <v-card
    color="black"
    height="80vh"
    >   
        <v-img
        height="800px"
        width="2000px"
        class="mx-auto d-flex align-center"
        src="@/assets/smiling_dog.jpeg"
        
        >   
            <SignUpForm />
    
        </v-img>  
  </v-card>
</template>
<script>
import SignUpForm from '@/components/SignUpForm'
//import corgi from "@/assets/corgi.jpeg"
export default {
    name:'Signup',
    components: {
        SignUpForm
    }
}
</script>