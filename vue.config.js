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
    workboxOptions: {
      skipWaiting: true,
    },
    name: "Promos Web App",
    theme_color: "#000",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    icons: [
      {
        src: "@/assets/AppIcon.svg",
        type: "image/svg+xml",
        purpose: "any maskable",
      },
    ],
  },
};
