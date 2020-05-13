<template>
  <div class="runs-view">
    <ApolloQuery
      :query="require('../graphql/getRunsFeed.graphql')"
      :variables="{ cursor }">
      <template v-slot="{ result: { data }, isLoading, query }">
        <div v-if="data && data.runFeed">
          <!-- Run summary card -->
          <div v-for="(run, index) in data.runFeed.runs" :key="run.runId">
            <run-separator :run="run" :runs="data.runFeed.runs" :index="index" />
            <run-summary :run="run" :isLink="true" />
          </div>

          <!-- Load more button -->
          <div class="load-more-row">
            <div
              v-if="data.runFeed.hasMore"
              class="card button"
              @click="loadMore(query, data.runFeed)">
              Load More
            </div>
          </div>
        </div>
        <!-- Loading spinner -->
        <div v-if="isLoading" class="loading">
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

  methods: {
    async loadMore(query, runFeed) {
      await query.fetchMore({
        variables: {
          cursor: runFeed.cursor,
        },
        updateQuery: (prev, { fetchMoreResult }) => {
          prev.runFeed.cursor = fetchMoreResult.runFeed.cursor;
          prev.runFeed.hasMore = fetchMoreResult.runFeed.hasMore;
          prev.runFeed.runs.push(...fetchMoreResult.runFeed.runs);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../sass/colors';
  @import '../sass/base';

  .runs-view {
    padding: 0 20px;

    .loading {
      font-size: 2rem;
      padding: 20px;
    }

    .load-more-row {
      margin-top: 16px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;

      .button {
        padding: 16px 32px;
        border-radius: 3px;
        margin-left: 4px;
        cursor: pointer;

        &:hover {
          background-color: $white-hover;
        }
      }
    }
  }
</style>
