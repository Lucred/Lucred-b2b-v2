import createPersistedState from "vuex-persistedstate";

export default ({ store }) => {
  createPersistedState({
    token: window.localStorage.getItem("b2b_token"),
    data: window.localStorage.getItem("b2b_data")
  })(store);
};