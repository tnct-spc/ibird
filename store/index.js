export const state = () => ({
  cards: [{
    imgUrl: '/test-page-001.jpg',
    x: 0,
    y: 0
  }]
})

export const mutations = {
  move (state, { cardId, x, y }) {
    state.cards[cardId].x = x
    state.cards[cardId].y = y
  }
}
