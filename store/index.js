export const state = () => ({
  papers: [{
    imgUrl: '/test-page-001.jpg',
    x: 0,
    y: 0
  }]
})

export const mutations = {
  move (state, { paperId, x, y }) {
    state.papers[paperId].x = x
    state.papers[paperId].y = y
  }
}
