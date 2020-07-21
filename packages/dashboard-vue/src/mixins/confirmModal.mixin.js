export default {
  methods: {
    showConfirmModal({
      title,
      text,
      options,
      callback,
    }) {
      this.$store.commit('app/showConfirmModal', {
        title,
        text,
        options,
        callback,
      });
    },
  },
};
