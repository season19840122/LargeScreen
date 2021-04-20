const app = {
  state: {
    classifyData: {},
    districtCode: '330800', // 行政区编码
  },
  mutations: {
    m_classifyData: (state, data) => {
      state.classifyData = data;
    },
    // m_page: (state, page) => {
    //   Object.keys(page).forEach(function (key) {
    //     state.page[key] = page[key];
    //   });
    // }
  },
  actions: {
    getClassifyData: ({ commit }, data) => {
      commit('m_classifyData', data);
    },
    // getFailModal: ({ dispatch, commit }, failMsg) => {
    //   dispatch('getFailMsg', failMsg).then(() => {
    //     commit('m_currentModal', 'otherFail');
    //   });
    // }
  }
};

export default app;
