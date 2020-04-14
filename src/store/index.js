import Vue from 'vue'
import Vuex from 'vuex'
import member from './member'
import stage from './stage'
import socket from './socket'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    develop: true
  },
  mutations: {
    init (state) {
      state.develop = false
    }
  },
  modules: {
    member,
    stage,
    socket
  }
})
