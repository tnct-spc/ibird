export const state = () => ({
  papers: []
})

export const getters = {
  papers (state) {
    return state.papers
  }
}

export const mutations = {
  move (state, { paperId, x, y }) {
    if (state.papers) {
      try {
        state.papers[paperId].x = x
        state.papers[paperId].y = y
        state.papers[paperId].updatedAt = new Date()
      } catch (e) {
        console.log(e)
      }
    }
  },
  selectCard (state, {paperId}) {
    for (var i = 0; i < state.papers.length; i++) {
      state.papers[i].isSelected = false
    }
    state.papers[paperId].isSelected = true
  },
  fixPapers (state, {documents}) {
    state.papers.splice(0, state.papers.length)
    documents.forEach(d => {
      state.papers.push(d)
    })
  }
}
