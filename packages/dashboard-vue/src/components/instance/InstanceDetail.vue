<template>
  <div class="instance-detail">
    <ApolloQuery
      :query="require('../../graphql/getInstance.graphql')"
      :variables="{ instanceId }"
      :update="out">
      <template v-slot="{ result: { data }, isLoading }">
        <div v-if="isLoading">
          Loading
        </div>
        <div v-if="data">
          <!-- Video -->
          <cy-video
            :url="data.videoUrl || testUrl" />

          <!-- Inidividual test results -->
          <div class="list-container" v-if="data.results">
            <div
              class="list-row"
              v-for="test in data.results.tests"
              :key="test.title.join('.')"
              :class="[test.state]">
              <div class="icon">
                <fa-icon :icon="testIcon(test)" :class="['icon', test.state]"></fa-icon>
              </div>
              <div class="label">
                <span class="ms">
                  [{{ data.results.stats.wallClockDuration }} ms]
                </span>
                <span
                  v-for="(part, index) in test.title"
                  :key="part">
                  {{ part }}
                  <span v-if="index !== test.title.length - 1" class="chevron"> > </span>
                </span>
              </div>
              <div>
                <span class="link">Details</span>
              </div>
            </div>
          </div>
        </div>
      </template>
    </ApolloQuery>
  </div>
</template>

<script>
import CyVideo from '@/components/media/CyVideo.vue';

export default {
  name: 'instance-detail',

  components: {
    'cy-video': CyVideo,
  },

  props: {
    instanceId: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    testUrl: 'https://sorry-cypress-suade.s3.amazonaws.com/f9efebf5-37cc-4d6b-a656-684be9582634.mp4',
  }),

  methods: {
    testIcon(test) {
      switch (test.state) {
        case 'passed':
          return 'check';

        case 'skipped':
          return 'redo';

        default:
          return 'times';
      }
    },

    out(data) {
      console.log(data);
      return data.instance;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../sass/base';

  .list-container {
    max-height: calc(100vh - 260px);
  }

  .ms {
    color: $gray-8;
  }
</style>
