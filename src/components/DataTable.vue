<template>
  <v-flex mt-4 mb-4>
    <div class="elevation-1" style="margin-bottom: 40px;">
      <div class="v-table__overflow">
        <table class="v-datatable v-table v-datatable--select-all theme--light">
          <thead>
            <tr>
              <td v-if="hide_checkbox === false">
                <v-checkbox
                  v-model="selectAll"
                  primary
                  hide-details
                ></v-checkbox>
              </td>
              <td v-for="(h, index) in headers" :key="index" v-bind:class="[h.align]">
                {{h.text}}
              </td>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
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
      if (this.headers[i]['align'] == 'undefiend') {
        this.headers[i]['align'] = 'text-xs-left'
      } else {
        this.headers[i]['align'] = 'text-xs-' + this.headers[i]['align']
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
</style>
