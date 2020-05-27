module.exports = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        open: true, //配置自动启动浏览器
        // proxy: 'http://localhost:3000/api',
        proxy: {
            "/api": {
                target: 'http://localhost:3000',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            },
            '/upload': {
                target: "http://localhost:3000",
                changeOrigin: true,
                pathRewrite: {
                    '^/upload': '/upload'
                }
            }
        },
    }
};
