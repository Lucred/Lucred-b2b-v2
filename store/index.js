export const state = () => ({
  drawer: true,
  isSignedIn: false,
  B2B: null,
  token: null,
});

export const mutations = {
  toggleDrawer(state) {
    state.drawer = !state.drawer;
  },
  drawer(state, val) {
    state.drawer = val;
  },
  setB2B(state, B2B) {
    state.B2B = B2B || null;
    state.isSignedIn = !!B2B;
    state.token = B2B.token;
  },
};

export const getters = {
  isSignedIn(state) {
    return state.isSignedIn;
  },
};
