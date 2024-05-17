const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://154.194.52.246:8000',
      changeOrigin: true,
      withCredentials: true,
      credentials: 'include',
    }),
  );
};
