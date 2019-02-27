<template>
  <div class="flash-message">
    <v-alert
    :value="true"
    :type="fl_type"
    outline
    dismissible
    v-if="fl_type"
    >
    {{fl_msg}}
    </v-alert>
  </div>
</template>

<script>
export default {
    name: 'FlashMessage',
    data() {
        return {
            fl_type: '',
            fl_msg: ''
        }
    },
    created() {
        if (this.$store.state.flash.type != '') {
            this.$set(this, 'fl_type', this.$store.state.flash.type)
        }
        if (this.$store.state.flash.msg != '') {
            this.$set(this, 'fl_msg', this.$store.state.flash.msg)
        }
    },
    mounted() {
        if (this.fl_type != '') {
            this.$store.commit('destroyFlash')
        }
    },
    watch: {
        '$route' () {
            this.$set(this, 'fl_type', '')
            this.$set(this, 'fl_msg', '')
            this.$store.commit('destroyFlash')
        }
    }
}
</script>

<style lang="scss" scoped>
.flash-message {
    .v-alert {
        margin-bottom: 20px;
    }
}
</style>
