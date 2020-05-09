<template>
  <div class="run-separator" v-if="label !== ''">
    <div class="line fixed" />
    <div class="label fixed">{{ label }}</div>
    <div class="line grow" />
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'run-separator',

  props: {
    runs: {
      type: Array,
      required: true,
    },
    run: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },

  computed: {
    label() {
      const day = moment(this.run.createdAt).startOf('day');
      const previous = this.index > 0
                       ? moment(this.runs[this.index - 1].createdAt).startOf('day')
                       : null;

      // If this is the latest run, or if the previous run was on a different day
      if (this.index === 0 || (previous && day.diff(previous, 'days') !== 0)) {
        return this.timestamp(day);
      }

      return '';
    },
  },

  methods: {
    timestamp(day) {
      const diff = moment().startOf('day').diff(day, 'days');

      if (diff === 0) {
        return 'Today';
      } else if (diff === 1) {
        return 'Yesterday';
      } else if (diff < 7) {
        return day.format('dddd');
      }

      return day.format('dddd DD MMM YYYY');
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../sass/colors';

  .run-separator {
    padding: 24px 0 12px 0;

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
  }
</style>
