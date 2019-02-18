export default {
  mounted() {
    this.axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest';
    this.axios.defaults.headers['Access-Control-Allow-Origin'] = '*';
    this.axios.defaults.headers['Content-Type'] = 'application/json';
  }
}
