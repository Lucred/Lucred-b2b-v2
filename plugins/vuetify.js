import Vue from "vue"
import Vuetify from "vuetify/lib"

Vue.use(Vuetify)

const vuetify = new Vuetify({
  iconfont: "mdi",
  theme: {
    themes: {
      dark: {
        primary: "#284cac",
        accent: "#FF9D00",
        secondary: "#66AC4C",
        header: "#000029",
        footer: "#393E6A",
        black: "#000000",
        white: "#FFFFFF",
        grey: "#8F8B8B",
        chip: "#767676",
        lightPurple: "#F8F7FC",
        revBlack: "#333333",
      },
    },
  },
})

export default vuetify
