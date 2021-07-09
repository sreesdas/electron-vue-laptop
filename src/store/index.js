import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      cpfNo: null,
      domainPassword: null,
      name: null,
      designation: null,
      location: null,
      mobile: null,
      locations: [],
      brands: [],
      levels: []
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
