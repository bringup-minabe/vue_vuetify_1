<template>
  <div class="customers">
    <h1>顧客情報</h1>
    <DataTable
    :headers="headers"
    :items="items"
    >
    </DataTable>
  </div>
</template>

<script>
import DataTable from "../components/DataTable.vue"
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
          text: 'check',
          value: 'check',
          type: 'icon',
          align: 'center'
        },
        {
          text: '登録日時',
          value: 'created',
          filter: 'YMDHm'
        }
      ],
      items: [
        {
          id: '1',
          full_name: '山田太郎',
          check: 'check',
          created: '2019-02-14 10:20:00'
        },
        {
          id: '2',
          full_name: '山田次郎',
          check: '',
          created: '2019-02-15 10:20:00'
        }
      ]
    }
  }
}
</script>
