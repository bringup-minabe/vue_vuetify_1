<template>
    <div class="progress text-xs-center">
        <v-progress-linear :indeterminate="true"></v-progress-linear>
        <!-- <v-progress-circular
        indeterminate
        color="primary"
        >
        </v-progress-circular> -->
    </div>
</template>

<script>
export default {
    name: 'Progress'
}
</script>

<style lang="scss" scoped>
.progress {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    width: 200px;
    height: 100px;
}
</style>
