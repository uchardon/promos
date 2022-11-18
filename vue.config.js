module.exports = {
  transpileDependencies: true,

  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/css/main.scss";',
      },
    },
    sourceMap: true,
  },

  pwa: {
    name: "Promos Web App",
  },
};
