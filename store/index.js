import Vue from 'vue'
import axios from 'axios'

export const state = () => ({
  papers: {},
  cursorOffset: {x: 0, y: 0},
  authUser: null,
  bbFieldSize: {x: 0, y: 0},
  controlSelecterSize: {x: 0, y: 0}
})

export const mutations = {
  move (state, { docid, x, y }) {
    if (state.papers[docid]) {
      try {
        state.papers[docid].x = x
        state.papers[docid].y = y
        state.papers[docid].updatedAt = new Date()
      } catch (e) {
        console.log(e)
      }
    }
  },
  selectCard (state, {docid}) {
    Object.keys(state.papers).forEach(key => {
      state.papers[key].isSelected = false
    })
    state.papers[docid].isSelected = true
  },
  refreshPapers (state, {documents}) {
    Object.keys(state.papers).forEach(key => {
      Vue.delete(state.papers, key)
    })
    Object.keys(documents).forEach(key => {
      Vue.set(state.papers, key, documents[key])
    })
  },
  setCursorOffset (state, {x, y}) {
    state.cursorOffset.x = x
    state.cursorOffset.y = y
  },
  setUser (state, user) {
    state.authUser = user
  },
  setbbFieldSize (state, {x, y}) {
    state.bbFieldSize.x = x
    state.bbFieldSize.y = y
  },
  setControlSelecterSize (state, {x, y}) {
    state.controlSelecterSize.x = x
    state.controlSelecterSize.y = y
  }
}
export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    if (req.session && req.session.authUser) {
      commit('setUser', req.session.authUser)
    }
  },
  async login ({ commit }, { username, password }) {
    try {
      const { data } = await axios.post('/api/login', { username, password })
      commit('setUser', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error(error.response.data.message)
      }
      throw error
    }
  },

  async logout ({ commit }) {
    await axios.post('/api/logout')
    commit('setUser', null)
  }
}
