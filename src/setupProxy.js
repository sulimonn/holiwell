const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://holiwell.ru/api',
      changeOrigin: true,
    }),
  );

  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'https://holiwell.ru/auth',
      changeOrigin: true,
    }),
  );

  app.use(
    '/files',
    createProxyMiddleware({
      target: 'https://holiwell.ru/files',
      changeOrigin: true,
    }),
  );
  app.use(
    '/v2',
    createProxyMiddleware({
      target: 'https://rest-api-test.tinkoff.ru/v2',
      changeOrigin: true,
    }),
  );
};
