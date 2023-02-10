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
    // workboxOptions: {
    //   skipWaiting: true
    // },
    name: "Promos Web App",
  },
};
