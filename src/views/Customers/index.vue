<template>
  <div class="customers">
    <h1>顧客情報</h1>
    <DataTable
    :headers="headers"
    api_path="customers/index/index.json"
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
          value: 'id'
        },
        {
          text: '氏名',
          value: 'full_name'
        },
        {
          text: '登録日時',
          value: 'created',
          filter: 'YMDHm'
        }
      ]
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
