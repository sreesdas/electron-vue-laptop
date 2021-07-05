import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      cpfno: null,
      password: null,
      name: null,
      designation: null,
      location: null,
      level: null,
      locations: [],
      brands: [] 
    }
  },
  mutations: {
    LOGIN: (state, user) => state.user = user
  },
  actions: {
    login: (context, user) => context.commit('LOGIN', user)
  },
  modules: {
  }
})
