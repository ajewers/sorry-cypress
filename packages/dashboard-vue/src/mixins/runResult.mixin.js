export default {
  name: 'runResultMixin',

  computed: {
    result() {
      if (this.run.specs.some(spec => spec.results == null)) {
        return 'pending';
      }

      if (this.run.specs.some(spec => spec.results.stats.failures !== 0)) {
        return 'failed';
      }

      return 'passed';
    },

    stats() {
      const stats = {
        failures: 0,
        passes: 0,
        pending: 0,
        skipped: 0,
      };

      this.run.specs.reduce((results, next) => {
        if (next.results) {
          ['failures', 'passes', 'pending', 'skipped'].forEach(r => {
            results[r] += next.results.stats[r];
          });
        }

        return results;
      }, stats);

      return stats;
    },
  },
};
