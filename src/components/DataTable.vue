<template>
  <v-flex mt-4 mb-4>
    <div class="elevation-1">
      <div class="v-table__overflow">
        <table class="v-datatable v-table v-datatable--select-all theme--light data-table">
          <thead>
            <tr>
              <th v-if="hide_checkbox === false" style="width: 15px;">
                <v-checkbox
                  v-model="selectAll"
                  primary
                  hide-details
                ></v-checkbox>
              </th>
              <th v-for="(h, index) in headers" :key="index" v-bind:class="[h.align]">
                {{h.text}}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index" v-bind:class="[item.class]">
              <td v-if="hide_checkbox === false">
                <v-checkbox
                  v-model="selected[index]"
                  :value="item"
                  primary
                  hide-details
                ></v-checkbox>
              </td>
              <td v-for="(h, index) in headers" :key="index" v-bind:class="[h.align]">
                <template v-if="h.filter">
                  {{item[h.value] | set_filter(h.filter)}}
                </template>
                <template v-else>
                  <template v-if="h.type == 'icon' && item[h.value] != ''">
                    <font-awesome-icon :icon="item[h.value]" />
                  </template>
                  <template v-else>
                    {{item[h.value]}}
                  </template>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </v-flex>
</template>

<script>
import Filter from "../mixins/Filter"
export default {
  name: 'DataTable',
  mixins: [Filter],
  props: {
    headers: Array,
    items: Array,
    hide_checkbox: Boolean
  },
  data () {
    return {
      selected: [],
      selectAll: false
    }
  },
  mounted() {
    for (var i = 0; i < this.headers.length; i++) {
      if (typeof this.headers[i]['align'] == 'undefined') {
        this.headers[i]['align'] = 'text-xs-left'
      } else {
        this.headers[i]['align'] = 'text-xs-' + this.headers[i]['align']
      }
    }
    for (var e = 0; e < this.items.length; e++) {
      if (typeof this.items[e]['class'] == 'undefined') {
        this.items[e]['class'] = ''
      } else {
        this.items[e]['class'] = 'dt-' + this.items[e]['class']
      }
    }
  },
  watch: {
    selectAll(val) {
      if (val) {
        for (var i = 0; i < this.items.length; i++) {
          this.selected.push(this.items[i])
        }
      } else {
        this.selected = []
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.v-table {
  thead {
    tr {
      // height: 40px;
    }
  }
  td {
    // height: 35px;
  }
}
.dt-success {
  background-color: #d4edda;
  color: #155724;
}
.dt-danger {
  background-color: #f8d7da;
  color: #721c24;
}
.dt-warning {
  background-color: #fff3cd;
  color: #856404;
}
.dt-info {
  background-color: #d1ecf1;
  color: #0c5460;
}
</style>
