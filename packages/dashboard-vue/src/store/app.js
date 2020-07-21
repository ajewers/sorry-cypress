export default {
  namespaced: true,

  state: {
    confirmModal: {
      show: false,
      title: '',
      text: '',
      options: [],
      callback: result => result,
    },
  },

  mutations: {
    showConfirmModal(state, {
      title,
      text,
      options,
      callback,
    }) {
      state.confirmModal.title = title;
      state.confirmModal.text = text;
      state.confirmModal.options.splice(0, state.confirmModal.options.length, ...options);
      state.confirmModal.callback = callback;
      state.confirmModal.show = true;
    },

    hideConfirmModal(state) {
      state.confirmModal.show = false;
      state.confirmModal.title = '';
      state.confirmModal.text = '';
      state.confirmModal.options.splice(0, state.confirmModal.options.length);
      state.confirmModal.callback = result => result;
    },
  },

  actions: {
    confirmModalResult({ state, commit }, result) {
      state.confirmModal.callback(result);

      commit('hideConfirmModal');
    },
  },
};
