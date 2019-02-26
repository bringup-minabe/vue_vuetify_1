<template>
    <div class="error-alert">
        <v-alert
        :value="true"
        color="error"
        icon="warning"
        outline
        >
        {{error_msg}}
        </v-alert>
    </div>
</template>

<script>
export default {
    name: 'ErrorAlert',
    props: {
        error_msg: String
    }
}
</script>

<style lang="scss" scoped>
.v-alert {
    margin-bottom: 25px;
}
</style>
