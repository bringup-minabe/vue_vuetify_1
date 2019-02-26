<template>
    <div id="customers-view">
        <h1 class="h-2">{{this.$parent.title}} 詳細</h1>
        <div class="view-btn-group">
            <v-btn small @click="$router.go(-1)">戻る</v-btn>
            <v-btn small @click="$router.push(`/customers/${id}/edit`)">編集</v-btn>
        </div>
        <div v-if="loading">
            <progress-con></progress-con>
        </div>
        <div v-else>
            <table class="table-1 table-striped">
                <tbody>
                    <tr>
                        <th>ID</th>
                        <td>{{data.customer.id}}</td>
                    </tr>
                    <tr>
                        <th>氏名</th>
                        <td>{{data.customer.full_name}}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{{data.customer.email}}</td>
                    </tr>
                    <tr>
                        <th>登録日時</th>
                        <td>{{data.customer.created | set_filter('YMDHms')}}</td>
                    </tr>
                    <tr>
                        <th>更新日時</th>
                        <td>{{data.customer.modified | set_filter('YMDHms')}}</td>
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
    name: 'customers-view',
    mixins: [HttpMixin, Filter],
    components: {
        'progress-con': Progress
    },
    data () {
        return {
            id: null,
            data: {},
            error: {},
            errored: false,
            loading: true
        }
    },
    mounted() {
        if (this.$route.params.id != undefined) {
            this.id = this.$route.params.id
            //get data
            this.axios
            .get(process.env.VUE_APP_API_URL + 'customers/view/' + this.$route.params.id + '/index.json')
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
