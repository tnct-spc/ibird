
export const state = () => ({
  papers: {
    '20180401': [{
      imgUrl: '/test-page-001.jpg',
      x: 0,
      y: 0,
      isSelected: false
    }, {
      imgUrl: '/test-page-001.jpg',
      x: 0,
      y: 400,
      isSelected: false
    }],
    '20170401': [{
      imgUrl: '/test-page-001.jpg',
      x: 0,
      y: 0,
      isSelected: false
    }, {
      imgUrl: '/test-page-001.jpg',
      x: 0,
      y: 400,
      isSelected: false
    }]
  }
})

export const actions = {
  move ({commit}, { classid, paperId, x, y, client }) {
    commit('move', {classid, paperId, x, y})
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
    state.papers[classid][paperId].x = x
    state.papers[classid][paperId].y = y
  },
  selectCard (state, {classid, paperId}) {
    for (let i in getters.papers(classid)) {
      state.papers[classid][i].isSelected = false
    }
    state.papers[classid][paperId].isSelected = true
  }
}
