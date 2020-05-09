<template>
  <div class="run-detail card">
    <div class="column">
      <div class="heading">
        <div class="line fixed" />
        <div class="label fixed">Spec Files</div>
        <div class="line grow" />
      </div>
      <div class="specs-container">
        <div
          class="spec-row"
          v-for="spec in run.specs"
          :key="spec.spec"
          :class="[{ selected: isSelected(spec) }, specResult(spec)]"
          @click="() => specClicked(spec)">
          <span class="label">{{ spec.spec }}</span>
          <results-summary
            v-if="spec.results"
            class="spec-results-summary"
            :stats="spec.results.stats" />
        </div>
      </div>
    </div>
    <div class="column details" v-if="selected">
      <div class="heading">
        <div class="line fixed" />
        <div class="label fixed">{{ selectedFile }}</div>
        <div class="line grow" />
      </div>
      <cy-video v-if="selected.results" :url="selected.results.videoUrl" />
    </div>
  </div>
</template>

<script>
import runResultMixin from '@/mixins/runResult.mixin';

import ResultsSummary from '@/components/results/ResultsSummary.vue';
import CyVideo from '@/components/media/CyVideo.vue';

export default {
  name: 'run-detail',

  mixins: [runResultMixin],

  components: {
    'results-summary': ResultsSummary,
    'cy-video': CyVideo,
  },

  props: {
    run: {
      type: Object,
      required: true,
    },
  },

  data: () => ({
    selected: null,
  }),

  computed: {
    selectedFile() {
      if (!this.selected) {
        return '';
      }

      const parts = this.selected.spec.split('/');

      return parts[parts.length - 1];
    },
  },

  methods: {
    specClicked(spec) {
      this.selected = spec;
    },

    isSelected(spec) {
      return this.selected && this.selected.spec === spec.spec;
    },

    specResult(spec) {
      if (spec.results == null) {
        return 'pending';
      }

      if (spec.results.stats.failures !== 0) {
        return 'failed';
      }

      return 'passed';
    },
  },

  mounted() {
    console.log(this.run);
  },
};
</script>

<style lang="scss" scoped>
  @import '../../sass/colors';
  @import '../../sass/base';

  .run-detail {
    min-height: 150px;
    margin-top: -1px;
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .column {
      flex: 1 0 auto;
      text-align: center;
      margin: 0 20px;
      max-width: calc(50vw - 85px);

      .heading {
        margin-bottom: 20px;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        .line {
          min-width: 32px;
          align-self: center;
          margin-top: 2px;
          border-bottom: 1px solid $gray-c;
        }

        .label {
          padding: 0 12px;
          color: $gray-9;
          font-size: 0.9rem;
        }

        .fixed {
          flex: 0 1 auto;
        }

        .grow {
          flex: 1 0 auto;
        }

        .label {
          font-size: 1.1rem;
          color: $gray;
        }
      }

      .specs-container {
        max-height: calc(100vh - 260px);
        overflow-y: auto;

        .spec-row {
          margin: 6px 0;
          padding: 12px;
          text-align: left;
          cursor: pointer;
          transition: all 0.15s;
          border-left: 4px solid transparent;
          display: flex;
          flex-direction: row;
          justify-content: flex-start;

          &:hover,
          &.selected {
            background-color: $blue-selected;
            box-shadow: $shadow;
          }

          .label {
            flex: 1 0 auto;
          }

          .spec-results-summary {
            flex: 0 1 auto;
          }

          &.passed {
            border-left-color: $green;
          }

          &.failed {
            border-left-color: $red;
          }

          &.pending {
            border-left-color: $blue;
          }
        }
      }
    }
  }
</style>
