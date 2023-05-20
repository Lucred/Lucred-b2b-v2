export const state = () => ({
  text: "Processing...",
  icon: "loading", // success || error || warning || loading
  color: "black",
  show: false,
  auto: true,
  top: true,
});

export const mutations = {
  show: (state, body) => {
    if (!body) state.show = false;
    else {
      const { text, icon, auto, color } = body;
      state.text = text || "Operation successful.";
      state.icon = icon || "success";
      state.auto = auto;
      state.show = true;
      state.top = true;
      state.color = color;
    }
  },
  toggle(state, toggle) {
    state.show = toggle;
  },
};

export const getters = {
  properties(state) {
    return {
      text: state.text,
      color: state.color,
      show: state.show,
      auto: state.auto,
      top: state.top,
      timeout: state.timeout,
    };
  },
};
