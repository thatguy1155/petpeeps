<template>
    <v-card
    color="black"
    height="80vh"
    >   
        <v-img
        height="800px"
        width="2000px"
        class="mx-auto d-flex align-center"
        src="@/assets/jumping_dog.jpg"
        
        >   
            <LoginForm />
    
        </v-img>  
  </v-card>
</template>
<script>
import LoginForm from '@/components/LoginForm'
//import corgi from "@/assets/corgi.jpeg"
export default {
    name:'Login',
    components: {
        LoginForm
    }
}
</script>