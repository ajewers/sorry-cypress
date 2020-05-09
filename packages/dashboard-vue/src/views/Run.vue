<template>
  <div class="run-view">
    <ApolloQuery
      :query="require('../graphql/getRun.graphql')"
      :variables="{ runId }">
      <template v-slot="{ result: { data } }">
        <!-- Run summary -->
        <run-summary class="run-summary" v-if="data && data.run" :run="data.run" />
        <run-detail v-if="data && data.run" :run="data.run" />
        <!-- Loading spinner -->
        <div v-else class="loading">
          <fa-icon icon="spinner" spin></fa-icon>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import RunSummary from '@/components/runs/RunSummary.vue';
import RunDetail from '@/components/runs/RunDetail.vue';

export default {
  name: 'Run',

  computed: {
    runId() {
      return this.$route.params.runId;
    },
  },

  components: {
    'run-summary': RunSummary,
    'run-detail': RunDetail,
  },
};
</script>

<style lang="scss" scoped>
  .run-view {
    padding: 20px;

    .loading {
      font-size: 2rem;
      padding: 20px;
    }

    .run-summary {
      position: sticky;
      top: 50px;
      z-index: 5;
    }
  }
</style>
