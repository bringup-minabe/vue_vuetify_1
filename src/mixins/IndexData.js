export default {
    data () {
        return {
            query: {},
            default_query: {},
            query_input: {}
        }
    },
    methods: {
        searchAction() {
            this.$set(this.query, 'search', this.query_input.search)
        },
        setQueyValues() {
            for(let k of Object.keys(this.query)) {
                if (this.$route.query[k] != undefined) {
                    this.$set(this.query_input, k, this.$route.query[k])
                } else {
                    this.$set(this.query_input, k, this.default_query[k])
                }
            }
        },
        setQueries(queries) {
            this.$set(this, 'query', Object.assign({}, queries))
            this.$set(this, 'default_query', Object.assign({}, queries))
            this.$set(this, 'query_input', Object.assign({}, queries))
        }
    },
    mounted() {
        this.setQueyValues()
    },
    watch: {
        '$route' (to) {
            if (Object.keys(to.query).length == 0) {
                this.setQueyValues()
            }
        }
    }
}
