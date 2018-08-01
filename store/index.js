import Vue from 'vue'

export const state = () => ({
  papers: { }
})

export const actions = {
  move ({commit}, { classid, paperId, x, y, client }) {
    client.send(JSON.stringify({ classid, paperId, x, y }))
  }
}

export const getters = {
  papers (state) {
    return classid => {
      return state.papers[classid]
    }
  }
}

export const mutations = {
  move (state, { classid, paperId, x, y }) {
    if (state.papers[classid]) {
      state.papers[classid][paperId].x = x
      state.papers[classid][paperId].y = y
    }
  },
  selectCard (state, {classid, paperId}) {
    for (var i = 0; i < state.papers[classid].length; i++) {
      state.papers[classid][i].isSelected = false
    }
    state.papers[classid][paperId].isSelected = true
  },
  fixPapers (state, {classid, documents}) {
    Vue.set(state.papers, classid, documents)
  }
}
