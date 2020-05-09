<template>
  <div class="runs-view">
    <ApolloQuery
      :query="require('../graphql/getRunsFeed.graphql')"
      :variables="{ cursor }">
      <template v-slot="{ result: { data }, isLoading }">
        <div v-if="!isLoading && data && data.runFeed">
          <!-- Run summary card -->
          <div v-for="(run, index) in data.runFeed.runs" :key="run.runId">
            <run-separator :run="run" :runs="data.runFeed.runs" :index="index" />
            <run-summary :run="run" :isLink="true" />
          </div>

          <!-- Load more button -->
          <div v-if="data.runFeed.hasMore">
            Load More
          </div>
        </div>
        <!-- Loading spinner -->
        <div v-else-if="isLoading" class="loading">
          <fa-icon icon="spinner" spin></fa-icon>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import RunSummary from '@/components/runs/RunSummary.vue';
import RunSeparator from '@/components/runs/RunSeparator.vue';

export default {
  name: 'Runs',

  components: {
    'run-summary': RunSummary,
    'run-separator': RunSeparator,
  },

  data: () => ({
    cursor: '',
  }),
};
</script>

<style lang="scss" scoped>
  .runs-view {
    padding: 0 20px;

    .loading {
      font-size: 2rem;
      padding: 20px;
    }
  }
</style>
