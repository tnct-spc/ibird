export const state = () => ({
  papers: [{
    imgUrl: '/test-page-001.jpg',
    x: 0,
    y: 0,
    isSelected: false
  }, {
    imgUrl: '/test-page-001.jpg',
    x: 0,
    y: 400,
    isSelected: false
  }
  ]
})

export const mutations = {
  move (state, { paperId, x, y }) {
    state.papers[paperId].x = x
    state.papers[paperId].y = y
  },
  selectCard (state, {paperId}) {
    for (let i in state.papers) {
      state.papers[i].isSelected = false
    }
    state.papers[paperId].isSelected = true
  }
}
