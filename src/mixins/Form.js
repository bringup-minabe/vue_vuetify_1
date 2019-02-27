export default {
    data() {
        return {
            valid: false,
            submited: false,
            form_action: '',
            redirect: '',
            error_msg: '',
            errored: false,
            loading: true
        }
    },
    methods: {
        submit() {
            if (this.valid) {
                this.$set(this, 'error_msg', '')
                this.$set(this, 'errored', false)
                if (this.submited === false) {
                    this.$set(this, 'submited', true)
                    this.$set(this, 'loading', true)
                    this.axios.post(process.env.VUE_APP_API_URL + this.form_action, this.inputs)
                    .then(response => {
                        if (response.status === 200) {
                            this.$router.push(this.redirect)
                        } else {
                            // console.log(response)
                            this.$set(this, 'submited', false)
                        }
                    })
                    .catch(error => {
                        if (error.response) {
                          // The request was made and the server responded with a status code
                          // that falls out of the range of 2xx
                          // console.log(error.response.data);
                          // console.log(error.response.status);
                          // console.log(error.response.headers);
                        } else if (error.request) {
                          // The request was made but no response was received
                          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                          // http.ClientRequest in node.js
                          // console.log(error.request);
                        } else {
                          // Something happened in setting up the request that triggered an Error
                          // console.log('Error', error.message);
                        }
                        // console.log(error.config);
                        this.$set(this, 'errored', true)
                        this.$set(this, 'error_msg', error.message)
                        this.$set(this, 'submited', false)
                    })
                    .finally(() => this.loading = false)
                }
            } else {
                this.$set(this, 'errored', true)
                this.$set(this, 'error_msg', '必須項目を入力・選択して下さい')
            }
        }
    }
}
