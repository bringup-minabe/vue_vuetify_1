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
                
                <error-alert
                v-if="errored"
                :error_msg="error_msg"
                ></error-alert>

                <v-flex xs12 sm3 md3 d-inline-flex>
                    <v-text-field
                    v-model="inputs.last_name"
                    label="姓"
                    required
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm3 md3 d-inline-flex>
                    <v-text-field
                    v-model="inputs.first_name"
                    label="名"
                    required
                    ></v-text-field>
                </v-flex>
                <v-text-field
                v-model="inputs.email"
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
import Form from "../../mixins/Form"
import Progress from "../../components/Progress.vue"
import ErrorAlert from "../../components/ErrorAlert.vue"
export default {
    name: 'customers-edit',
    mixins: [HttpMixin, Form],
    components: {
        'progress-con': Progress,
        'error-alert': ErrorAlert
    },
    data () {
        return {
            data: {},
            inputs: {
                first_name: '',
                last_name: '',
                email: '',
            }
        }
    },
    created() {
        //set form action
        this.$set(this, 'form_action', 'customers/edit/' + this.$route.params.id)
        //set redirect
        this.$set(this, 'redirect', '/customers')
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
                        if (response.data['customer'] != undefined && response.data['customer'][k] != undefined) {
                            this.$set(this.inputs, k, response.data['customer'][k])
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
