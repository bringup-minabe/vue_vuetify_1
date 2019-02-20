<template>
    <div class="customers">
        <h1 class="h-1">顧客情報</h1>
        <div class="dt-input-group">
            <v-flex xs12 sm3 md3>
                <v-text-field
                v-model="params.search"
                placeholder="Search"
                name="search"
                solo
                >
                </v-text-field>
            </v-flex>
        </div>
        <DataTable
        :headers="headers"
        :params="params"
        api_path="customers/index/index.json"
        view_route="customers/view/"
        items_key="customers"
        >
        </DataTable>
    </div>
</template>

<script>
import DataTable from "../../components/DataTable.vue"
export default {
    name: 'customers',
    components: {DataTable},
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
            ],
            params: {
                search: ''
            }
        }
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
