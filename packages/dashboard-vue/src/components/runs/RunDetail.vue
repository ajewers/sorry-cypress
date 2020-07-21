<template>
  <div>
    <div class="run-detail card">
      <div class="column" v-if="!selected">
        <div class="heading">
          <div class="line fixed" />
          <div class="label fixed">{{ run.specs.length }} Spec Files</div>
          <div class="line grow" />
        </div>
        <div class="grid-container">
          <div
            class="grid-row clicky"
            v-for="spec in run.specs"
            :key="spec.spec"
            :class="[{ selected: isSelected(spec) }, specResult(spec)]"
            @click="() => specClicked(spec)">
            <div class="icon">
              <fa-icon :icon="specIcon(spec)" :class="['icon', specResult(spec)]"></fa-icon>
            </div>
            <div class="label">{{ spec.spec }}</div>
            <results-summary
              v-if="spec.results"
              :stats="spec.results.stats" />
          </div>
        </div>
      </div>
      <div v-else>
        <div
          class="selected-spec"
          :class="[specResult(selected)]">
          <div class="icon">
            <fa-icon :icon="specIcon(selected)" :class="['icon', specResult(selected)]"></fa-icon>
          </div>
          <div class="label">{{ selected.spec }}</div>
          <results-summary
            v-if="selected.results"
            :stats="selected.results.stats" />
        </div>
      </div>
    </div>
    <instance-detail
      v-if="selected"
      :instanceId="selected.instanceId" />
  </div>
</template>

<script>
import runResultMixin from '@/mixins/runResult.mixin';

import ResultsSummary from '@/components/results/ResultsSummary.vue';
import InstanceDetail from '@/components/instance/InstanceDetail.vue';

export default {
  name: 'run-detail',

  mixins: [runResultMixin],

  components: {
    'results-summary': ResultsSummary,
    'instance-detail': InstanceDetail,
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
      console.log(this.selected);
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

    specIcon(spec) {
      switch (this.specResult(spec)) {
        case 'pending':
          return 'spinner';

        case 'passed':
          return 'check';

        case 'failed':
          return 'times';

        default:
          return 'spinner';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../sass/colors';
  @import '../../sass/base';

  .run-detail {
    margin-top: -1px;
    padding-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .column {
      flex: 1 1 auto;
      text-align: center;
      margin: 0 20px;

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
    }

    .selected-spec {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      padding: 12px;

      .icon {
        padding: 0 8px 0 4px;
      }

      .label {
        flex: 1 0 auto;

        .chevron {
          color: $gray-a;
        }
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

      &.skipped {
        border-left-color: $gray;
      }
    }
  }
</style>
