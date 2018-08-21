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
    if (state.papers) {
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
    for (var i = 0; i < state.papers.length; i++) {
      state.papers[i].isSelected = false
    }
    state.papers[docid].isSelected = true
  },
  fixPapers (state, {documents}) {
    Object.keys(state.papers).forEach(key => Vue.delete(state.papers, key))
    Object.keys(documents.key).forEach(key => Vue.set(state.papers, key, documents.key))
  }
}
