<template>
    <v-btn :href='linkTo' class="mx-4 white--text" icon>
        <v-icon size="24px">{{ iconName }}</v-icon>
    </v-btn>
</template>

<script>
export default {
    props: {
        iconName: {
            type: String,
            default: 'mdi-facebook'
        },
        linkTo: {
            type: String,
            default: '/'
        }
    }
}
</script>

<style scoped>

</style>