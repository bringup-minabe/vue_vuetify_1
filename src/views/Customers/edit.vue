<template>
    <div id="customers-edit">
        <h1 class="h-2">{{this.$parent.title}} 編集</h1>
        <div class="view-btn-group">
            <v-btn small @click="$router.go(-1)">戻る</v-btn>
        </div>
        <div v-if="loading">
            <progress-con></progress-con>
        </div>
        <div v-else>
            <table class="table-1 table-striped">
                <tbody>
                    <tr>
                        <th>氏名</th>
                        <td>{{data.customer.full_name}}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{{data.customer.email}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import HttpMixin from "../../mixins/HttpMixin"
import Filter from "../../mixins/Filter"
import Progress from "../../components/Progress.vue"
export default {
    name: 'customers-edit',
    mixins: [HttpMixin, Filter],
    components: {
        'progress-con': Progress
    },
    data () {
        return {
            data: {},
            error: {},
            errored: false,
            loading: true
        }
    },
    mounted() {
        if (this.$route.params.id != undefined) {
            //get data
            this.axios
            .get(process.env.VUE_APP_API_URL + 'customers/edit/' + this.$route.params.id + '/index.json')
            .then(response => {
                if (typeof response.data != 'undefined') {
                    this.data = response.data
                }
            })
            .catch(error => {
                this.error = error
                this.errored = true
            })
            .finally(() => this.loading = false)
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
