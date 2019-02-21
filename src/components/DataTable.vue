<!--
* DataTable component
*
* @param Array headers
*  text: String
*  value: String json key
*  sort_field: String
*  type: String value 'icon' or null
*  filter: String mixins/Filter set_filter
*  align: String 'center', 'left', 'right'
* @param Array items
*  tr_class: String tr background color 'success', 'danger', 'warning', 'info'
* @param Object query
* @param Boolean hide_checkbox
* @param Boolean url_query
-->
<template>
    <v-flex mb-4>
        <div class="v-page-count" v-cloak>
            <div class="v-page-count-total">
                <label class="select-label">件数</label>
                <span>{{paginate.count | set_filter('number_format')}}</span>件
            </div>
            <div class="v-page-count-se" v-if="paginate.start != ''">
                <span>{{paginate.start | set_filter('number_format')}}</span> - <span>{{paginate.end | set_filter('number_format')}}</span>
            </div>
        </div>
        <div class="elevation-1">
            <div class="v-table__overflow">
                <table class="v-datatable v-table v-datatable--select-all theme--light data-table">
                    <thead>
                        <tr>
                            <th v-if="hide_checkbox === false" style="width: 15px;">
                                <input
                                v-model="selectAll"
                                type="checkbox"
                                name="select_all"
                                value="">
                            </th>
                            <th v-for="(h, index) in headers" :key="index" v-bind:class="[h.align]">
                                <span v-if="typeof h.sort_field != 'undefined'">
                                    <span
                                    v-if="paginate.sort == h.sort_field"
                                    v-bind:class="[paginate.direction, 'sort-th']"
                                    v-on:click='sortData(h.sort_field)'
                                    >
                                        {{h.text}}
                                    </span>
                                    <span
                                    v-else
                                    v-on:click='sortData(h.sort_field)'
                                    class="sort-th"
                                    >
                                        {{h.text}}
                                    </span>
                                </span>
                                <span v-else>{{h.text}}</span>
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
                        <tr
                        v-for="(item, index) in items"
                        :key="index"
                        v-bind:class="[item.tr_class]"
                        >
                            <td v-if="hide_checkbox === false">
                                <input
                                v-model="selected"
                                :value="item"
                                type="checkbox"
                                >
                            </td>
                            <td
                            v-for="(h, index) in headers"
                            :key="index"
                            v-bind:class="[h.align]"
                            v-on:click="viewLink(item['view_key_value'])"
                            >
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
        <div class="paginator" v-bind:class="{ paginator_active: paginate.count > 1 }">
            <div class="v-page-count" v-cloak>
                <div class="v-page-count-total">
                    <label class="select-label">件数</label>
                    <span>{{paginate.count | set_filter('number_format')}}</span>件
                </div>
                <div class="v-page-count-se" v-if="paginate.start != ''">
                    <span>{{paginate.start | set_filter('number_format')}}</span> - <span>{{paginate.end | set_filter('number_format')}}</span>
                </div>
            </div>
            <div class="pagecount" v-if="paginate.pageCount > 0">
                {{paginate.page}}/{{paginate.pageCount}}
            </div>
            <div class="btn-group" role="group" aria-label="paginate">
                <v-btn depressed small v-if="paginate.prevPage" v-on:click='paginatePrev'><v-icon>keyboard_arrow_left</v-icon></v-btn>
                <v-btn small disabled v-else><v-icon>keyboard_arrow_left</v-icon></v-btn>
                <v-btn depressed small v-if="paginate.nextPage" v-on:click='paginateNext'><v-icon>keyboard_arrow_right</v-icon></v-btn>
                <v-btn small disabled v-else><v-icon>keyboard_arrow_right</v-icon></v-btn>
            </div>
        </div>
    </v-flex>
</template>

<script>
import HttpMixin from "../mixins/HttpMixin"
import Filter from "../mixins/Filter"

let paginate_params = {
    count: 0,
    page: 1,
    nextPage: true,
    prevPage: false,
    pageCount: 0,
    sort: '',
    start: '',
    end: '',
    direction: ''
}

export default {
    name: 'DataTable',
    mixins: [HttpMixin, Filter],
    props: {
        headers: Array,
        api_path: String,
        view_route: String,
        view_key: String,
        items_key: String,
        hide_checkbox: Boolean,
        query: Object,
        url_query: Boolean
    },
    data () {
        return {
            data: {},
            items: [],
            selected: [],
            selectAll: false,
            error: {},
            errored: false,
            loading: true,
            progress_colspan: 0,
            paginate: paginate_params,
            before_page: 1,
            sortTypeAsc: true,
            view_key_value: 'id',
            page: 1,
            limit: this.$store.state.paginate_limit,
        }
    },
    methods: {
        getData() {
            //set query
            let api_query = {}
            let api_page = 1
            if (this.url_query) {
                api_query = this.$route.query
                if (this.$route.query.page != undefined) {
                    api_page = this.$route.query.page
                }
            } else {
                api_query = this.query
                api_page = this.page
            }
            api_query['limit'] = this.limit
            api_query['page'] = api_page
            //get data
            this.axios
            .get(process.env.VUE_APP_API_URL + this.api_path, {
                params: api_query
            })
            .then(response => {
                if (typeof response.data != 'undefined') {
                    this.$set(this, 'data', response.data)
                }
                if (typeof response.data[this.items_key] != 'undefined') {
                    let items = response.data[this.items_key]
                    //format items
                    for (var e = 0; e < items.length; e++) {
                        //set tr class
                        if (typeof items[e]['tr_class'] == 'undefined') {
                            items[e]['tr_class'] = ''
                        } else {
                            items[e]['tr_class'] = 'dt-' + items[e]['tr_class']
                        }
                        //set view key value
                        items[e]['view_key_value'] = null;
                        if (typeof items[e][this.view_key_value] != 'undefined') {
                            items[e]['view_key_value'] = items[e][this.view_key_value]
                        }
                    }
                    this.$set(this, 'items', items)
                }
                if (typeof response.data.paginate != 'undefined') {
                    this.$set(this, 'paginate', response.data.paginate)
                }
            })
            .catch(error => {
                this.$set(this, 'error', error)
                this.$set(this, 'errored', true)
            })
            .finally(() => this.loading = false)
        },
        resetSelected() {
            this.$set(this, 'loading', true)
            this.$set(this, 'selectAll', false)
            this.$set(this, 'selected', [])
        },
        paginatePrev() {
            this.$set(this.query, 'page', this.paginate.page - 1)
        },
        paginateNext() {
            this.$set(this.query, 'page', this.paginate.page + 1)
        },
        sortData(sort_field) {
            //set sort
            let direction = 'asc'
            if (this.paginate.direction == 'asc') {
                direction = 'desc'
            }
            this.$set(this.query, 'page', 1)
            this.$set(this.query, 'sort', sort_field)
            this.$set(this.query, 'direction', direction)
        },
        viewLink(id) {
            if (this.view_route != undefined && id != null) {
                this.$router.push({ path: `/${this.view_route}${id}` })
            }
        }
    },
    created() {
        // let url_query = Object.assign({}, this.params);
        // url_query['page'] = 1
        //set store query
        if (this.url_query && Object.keys(this.$store.state.url_query).length != 0) {
            // if (this.$store.state.url_query.sort != undefined) {
            //     this.$set(this.query, 'sort', this.$store.state.url_query.sort)
            // }
            // if (this.$store.state.url_query.direction != undefined) {
            //     this.$set(this.query, 'direction', this.$store.state.url_query.direction)
            // }
            // this.$set(this, 'page', this.$store.state.url_query.page)
            // this.$set(this, 'limit', this.$store.state.url_query.limit)
            // //reset store query
            // this.$store.commit('resetUrlQuery')
        } else {
            // this.$set(this.query, 'page', this.page)
            // this.$set(this.query, 'limit', this.limit)
        }
        //push query
        if (this.url_query) {
            this.$router.push({query:this.query})
        }
        //ste progress colspan
        if (this.hide_checkbox) {
            this.$set(this, 'progress_colspan', this.headers.length)
        } else {
            this.$set(this, 'progress_colspan', this.headers.length + 1)
        }
    },
    mounted() {
        //set view key
        if (this.view_key != undefined) {
            this.$set(this, 'view_key_value', this.view_key)
        }
        //get api
        this.getData()
        //format headers
        for (var i = 0; i < this.headers.length; i++) {
            if (typeof this.headers[i]['align'] == 'undefined') {
                this.$set(this.headers[i], 'align', 'text-xs-left')
            } else {
                if (this.headers[i]['align'].indexOf('text-xs-') == -1) {
                    this.$set(this.headers[i], 'align', 'text-xs-' + this.headers[i]['align'])
                }
            }
        }
    },
    watch: {
        selectAll(val) {
            if (val) {
                for (var i = 0; i < this.items.length; i++) {
                    this.$set(this.selected, i, this.items[i])
                }
            } else {
                this.$set(this, 'selected', [])
            }
        },
        query: {
            handler(val) {
                //reset selected
                this.resetSelected()
                if (this.url_query) {
                    this.$router.push({query:this.query})
                    this.$store.commit('setUrlQuery', this.query)
                } else {
                    //set page
                    if (this.before_page == val.page) {
                        val.page = 1
                        this.$set(this, 'page', 1)
                    }
                    this.$set(this, 'before_page', val.page)
                }
                //get data
                this.getData()
            },
            deep: true
        },
        '$route' (to, from) {
            if (Object.keys(to.query).length == 0) {
                console.log(1);
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
        .sort-th {
            position: relative;
            cursor: pointer;
            text-decoration: underline;
        }
        .asc:after, .desc:after {
            position: absolute;
            top: 0;
            right: -15px;
            display: inline-block;
            font-size: 70%;
            text-decoration: none;
        }
        .asc:after {
            content: "▲";
        }
        .desc:after {
            content: "▼";
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
.v-page-count {
    padding-bottom: 5px;
    div {
        display: inline-block;
        vertical-align: top;
    }
    .v-page-count-total {
        margin-right: 10px;
    }
}
.paginator {
    position: relative;
    padding: 15px 0 30px;
    text-align: right;
    .v-page-count {
        position: absolute;
        top: 22px;
        left: 0;
    }
    .pagecount {
        display: inline-block;
        padding-right: 20px;
    }
    .btn-group {
        display: inline-block;
        position: relative;
        vertical-align: middle;
    }
    .v-btn {
        min-width: 55px;
    }
}
</style>
