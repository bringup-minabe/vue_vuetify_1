<template>
    <div id="customers-index">
        <FlashMessage></FlashMessage>
        <h1 class="h-1">{{this.$parent.title}}</h1>
        <div class="dt-group">
            <div class="dt-input-group">
                <v-btn color="btn-add" @click="$router.push(`/customers/add`)">追加</v-btn>
            </div>
            <div class="dt-input-group">
                <v-flex xs12 sm3 md3>
                    <v-text-field
                    v-model="query_input.search"
                    placeholder="Search"
                    name="search"
                    solo
                    append-icon="search"
                    @click:append="searchAction"
                    v-on:keyup.enter="searchAction"
                    >
                    </v-text-field>
                </v-flex>
            </div>
        </div>
        <DataTable
        :headers="headers"
        :query="query"
        :default_query="default_query"
        api_path="customers/index/index.json"
        view_route="customers"
        items_key="customers"
        url_query
        >
        </DataTable>
    </div>
</template>

<script>
let queries = {
    search: ''
}
import FlashMessage from "../../components/FlashMessage.vue"
import DataTable from "../../components/DataTable.vue"
import IndexData from "../../mixins/IndexData"
export default {
    name: 'customers-index',
    components: {DataTable, FlashMessage},
    mixins: [IndexData],
    data () {
        return {
            headers: [
                {
                    text: 'Id',
                    value: 'id',
                    sort_field: 'Customers.id'
                },
                {
                    text: '氏名',
                    value: 'full_name'
                },
                {
                    text: 'ステータス',
                    value: 'status'
                },
                {
                    text: '登録日時',
                    value: 'created',
                    filter: 'YMDHm',
                    sort_field: 'Customers.created'
                }
            ]
        }
    },
    created() {
        this.setQueries(queries)
    }
}
</script>

<style lang="scss">
.customers {
    .data-table {
        th:nth-child(2) {
            width: 100px;
        }
        th:nth-child(3) {
            width: 150px;
        }
    }
}
</style>
