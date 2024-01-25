const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/",
    createProxyMiddleware({
      target: env.process.REACT_APP_API,
      changeOrigin: true,
    }),
  );
};
