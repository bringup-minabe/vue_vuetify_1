<!--
* DataTable component
*
* @param Array headers
*  text: String
*  value: String json key
*  type: String value 'icon' or null
*  filter: String mixins/Filter set_filter
*  align: String 'center', 'left', 'right'
* @param Array items
*  tr_class: String tr background color 'success', 'danger', 'warning', 'info'
* @param Boolean hide_checkbox
-->
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
                        <tr class="v-datatable__progress">
                            <th :colspan="progress_colspan" class="column" v-if="loading">
                                <div role="progressbar" aria-valuemin="0" aria-valuemax="100" class="v-progress-linear" style="height: 7px;">
                                    <div class="v-progress-linear__background blue" style="height: 7px; opacity: 0.3; width: 100%;"></div>
                                    <div class="v-progress-linear__bar">
                                        <div class="v-progress-linear__bar__indeterminate v-progress-linear__bar__indeterminate--active">
                                            <div class="v-progress-linear__bar__indeterminate long blue"></div>
                                            <div class="v-progress-linear__bar__indeterminate short blue"></div>
                                        </div>
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in items" :key="index" v-bind:class="[item.tr_class]">
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
import HttpMixin from "../mixins/HttpMixin"
import Filter from "../mixins/Filter"
export default {
    name: 'DataTable',
    mixins: [HttpMixin, Filter],
    props: {
        headers: Array,
        api_path: String,
        hide_checkbox: Boolean
    },
    data () {
        return {
            items: [],
            selected: [],
            selectAll: false,
            error: {},
            errored: false,
            loading: true,
            progress_colspan: 0
        }
    },
    created() {
        //format headers
        for (var i = 0; i < this.headers.length; i++) {
            if (typeof this.headers[i]['align'] == 'undefined') {
                this.headers[i]['align'] = 'text-xs-left'
            } else {
                this.headers[i]['align'] = 'text-xs-' + this.headers[i]['align']
            }
        }
        //ste progress colspan
        if (this.hide_checkbox) {
            this.progress_colspan = this.headers.length
        } else {
            this.progress_colspan = this.headers.length + 1
        }
        //get api
        this.axios
        .get(process.env.VUE_APP_API_URL + this.api_path)
        .then(response => {
            this.items = response.data.customers
        })
        .catch(error => {
            this.error = error
            this.errored = true
        })
        .finally(() => this.loading = false)
    },
    mounted() {
        //format items
        for (var e = 0; e < this.items.length; e++) {
            if (typeof this.items[e]['tr_class'] == 'undefined') {
                this.items[e]['tr_class'] = ''
            } else {
                this.items[e]['tr_class'] = 'dt-' + this.items[e]['tr_class']
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
            height: 40px;
        }
    }
    td {
        height: 35px;
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
