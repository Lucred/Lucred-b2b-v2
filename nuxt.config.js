const pkg = require("./package");

module.exports = {
  // mode: "universal",

  /*
   ** Headers of the page
   */
  head: {
    title: "Lucred B2B",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Lucred B2B",
      },
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons",
      },
    ],
    script: [
      {
        src: "https://cdnjs.cloudflare.com/ajax/libs/echarts/4.0.4/echarts-en.min.js",
      },
    ],
  },

  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#284cac" },

  axios: {
    credentials: true,
    baseURL: "https://lucred-backend.onrender.com/api/v1/",
  },

  /*
   ** Global CSS
   */
  css: [
    // '~/assets/style/theme.styl',
    // '~/assets/style/app.styl',
    "font-awesome/css/font-awesome.css",
    "roboto-fontface/css/roboto/roboto-fontface.css",
  ],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "@/plugins/vee-validate",
    { src: "~/plugins/vuetify", ssr: false },
    { src: "~/plugins/persistedState.client.js" },
  ],

  /*
   ** Nuxt.js modules
   */
  modules: ["@nuxtjs/axios"],

  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/vuetify"],

  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {},
  },
};
