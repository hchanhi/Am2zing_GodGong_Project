const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        createProxyMiddleware(['/api', '/pub', '/sub'],{
            target: 'http://localhost:8080',
            changeOrigin: true,
        }),
        
    );
};