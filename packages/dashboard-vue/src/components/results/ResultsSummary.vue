<template>
  <div class="results-summary">
    <span class="item">
      <fa-icon icon="redo"></fa-icon>
      <span class="result">{{ stats.skipped + stats.pending }}</span>
    </span>
    <span class="item">
      <fa-icon icon="check" class="icon passed"></fa-icon>
      <span class="result">{{ stats.passes }}</span>
    </span>
    <span class="item">
      <fa-icon icon="times" class="icon failed"></fa-icon>
      <span class="result">{{ stats.failures }}</span>
    </span>
  </div>
</template>

<script>
export default {
  name: 'results-summary',

  props: {
    stats: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../sass/base';

  .results-summary {
    color: gray;
    font-size: 0.9rem;
    flex: 0 1 auto;

    .item {
      padding-right: 16px;

      .result {
        padding-left: 6px;
      }
    }
  }
</style>
