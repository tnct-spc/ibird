import Vue from 'vue'

export const state = () => ({
  papers: {}
})

export const getters = {
  papers (state) {
    return state.papers
  }
}

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
  fixPapers (state, {documents}) {
    Object.keys(state.papers).forEach(key => {
      Vue.delete(state.papers, key)
    })
    Object.keys(documents).forEach(key => {
      Vue.set(state.papers, key, documents[key])
    })
  }
}
