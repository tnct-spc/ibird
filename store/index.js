import Vue from 'vue'

export const state = () => ({
  papers: { }
})

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
      try {
        state.papers[classid][paperId].x = x
        state.papers[classid][paperId].y = y
      } catch (e) {
        console.log(e)
      }
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
