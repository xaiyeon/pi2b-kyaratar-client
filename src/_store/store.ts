import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

// Here we can make states, and store information for use site-wide!
// TODO, when user log in store more relevant data!
const getDefaultState = () => {
  return {
    token: null,
    user: null,
    userRole: null,
    isUserLoggedIn: false,
  };
};

export default new Vuex.Store({
  strict: true,
  // to save our state even if refresh
  plugins: [
    createPersistedState(),
  ],
  state: {
    token: null,
    user: null,
    userRole: null,
    isUserLoggedIn: false,
  },
  getters: {
    getAuth: (state) => {
      return state.isUserLoggedIn;
    },
  },
  // some name method use in actions
  mutations: {
    resetAuthStates(state) {
      Object.assign(state, getDefaultState());
    },
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.isUserLoggedIn = true;
      } else {
        state.isUserLoggedIn = false;
      }
    },
    setUser(state, user) {
      state.user = user;
      // console.log(state.user)
      // console.log(user)
    },
    setUserRole(state, userrole) {
      state.userRole = userrole;
    },
  },
  // you do async logic here
  actions: {
    resetAuthStates({ commit }) {
      commit('resetAuthStates');
    },
    setToken({commit}, token) {
      commit('setToken', token);
    },
    setUser({commit}, token) {
      commit('setUser', token);
    },
    setUserRole({commit}, token) {
      commit('setUserRole', token);
    },
  },
});
