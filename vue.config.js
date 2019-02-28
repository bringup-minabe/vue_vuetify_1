module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : 'http://localhost:8080/cakephp3_customer_system/site/app/',
    devServer: {
        open: process.platform === 'darwin',
        host: '0.0.0.0',
        port: 8888, // CHANGE YOUR PORT HERE!
        https: false,
        hotOnly: false,
    },
    runtimeCompiler: true
}
