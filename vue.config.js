//set public path
let public_path = '/'
switch (process.env.NODE_ENV) {
    case 'development':
        public_path = '/'
        break;
    case 'staging':
        public_path = 'http://localhost:8080/cakephp3_customer_system/site/app/'
        break;
    default:

}

module.exports = {
    publicPath: public_path,
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8888, // CHANGE YOUR PORT HERE!
        https: false,
        hotOnly: false,
    },
    runtimeCompiler: true
}
