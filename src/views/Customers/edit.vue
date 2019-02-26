<template>
    <div id="customers-edit">
        <h1 class="h-2">{{this.$parent.title}} 編集</h1>
        <div v-if="loading">
            <progress-con></progress-con>
        </div>
        <div v-else>
            <div class="view-btn-group">
                <v-btn @click="$router.go(-1)">キャンセル</v-btn>
                <v-btn @click="submit">保存</v-btn>
            </div>
            <form>
                <v-text-field
                v-model="inputs.customer.full_name"
                label="氏名"
                required
                ></v-text-field>
                <v-text-field
                v-model="inputs.customer.email"
                label="Email"
                required
                ></v-text-field>
                <div class="submit-area">
                    <v-btn @click="$router.go(-1)">キャンセル</v-btn>
                    <v-btn @click="submit">保存</v-btn>
                </div>
          </form>
        </div>
    </div>
</template>

<script>
import HttpMixin from "../../mixins/HttpMixin"
import Filter from "../../mixins/Filter"
import Progress from "../../components/Progress.vue"
export default {
    name: 'customers-edit',
    mixins: [HttpMixin, Filter],
    components: {
        'progress-con': Progress
    },
    data () {
        return {
            data: {},
            inputs: {
                customer: {
                    full_name: '',
                    email: '',
                }
            },
            error: {},
            errored: false,
            loading: true
        }
    },
    methods: {
        submit() {
            console.log(1);
        }
    },
    mounted() {
        if (this.$route.params.id != undefined) {
            //get data
            this.axios
            .get(process.env.VUE_APP_API_URL + 'customers/edit/' + this.$route.params.id + '/index.json')
            .then(response => {
                if (typeof response.data != 'undefined') {
                    this.data = response.data
                    for(let k of Object.keys(this.inputs)) {
                        for(let inp of Object.keys(this.inputs[k])) {
                            if (response.data[k] != undefined && response.data[k][inp] != undefined) {
                                this.$set(this.inputs[k], inp, response.data[k][inp])
                            }
                        }
                    }
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
