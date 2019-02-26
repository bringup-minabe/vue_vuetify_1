export default {
    mounted() {
        this.axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
        this.axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
        this.axios.defaults.headers['Content-Type'] = 'application/json';
        this.axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        //set original header
        this.axios.defaults.headers['Shift-Origin'] = '*';
    }
}
