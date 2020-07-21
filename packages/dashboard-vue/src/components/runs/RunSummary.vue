<template>
  <div class="run-summary card" :class="[result, { 'is-link': isLink }]" @click="runClicked">
    <div class="run-summary-icon">
      <span>
        <fa-icon
          v-if="result === 'passed'"
          icon="check"
          class="icon passed">
        </fa-icon>
        <fa-icon
          v-else-if="result === 'failed'"
          icon="times"
          class="icon failed">
        </fa-icon>
        <fa-icon
          v-else-if="result === 'pending'"
          icon="spinner"
          spin
          class="icon pending">
        </fa-icon>
      </span>
    </div>
    <div class="run-summary-content">
      <div class="title-row">
        <span>{{ run.meta.ciBuildId }}</span> -
        <span>{{ run.meta.commit.message }}</span>
      </div>
      <div class="details-row">
        <span class="item"><fa-icon icon="user"></fa-icon></span>
        <span class="item">{{ run.meta.commit.authorName }}</span>
        <span class="item">&middot; </span>
        <span class="item"><fa-icon icon="calendar-alt"></fa-icon></span>
        <span class="item">{{ timestamp }}</span>
        <span class="item">&middot; </span>
        <span class="item"><fa-icon icon="code-branch"></fa-icon></span>
        <span class="item">{{ run.meta.commit.branch }}</span>
      </div>
    </div>
    <results-summary class="run-summary-results" :stats="stats" />
    <div class="options-container"  @mouseleave="hideOptions">
      <div class="run-summary-options" @click.stop="optionsClicked">
        <fa-icon icon="ellipsis-h"></fa-icon>
      </div>
      <div class="options-menu" v-if="showOptions">
        <div class="item header">Options</div>
        <div class="item clicky delete" @click.stop="deleteClicked">
          <fa-icon icon="trash"></fa-icon>
          <span class="label">Delete</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

import runResultMixin from '@/mixins/runResult.mixin';

import ResultsSummary from '@/components/results/ResultsSummary.vue';

import GQL_DEL_RUN from '@/graphql/deleteRun.graphql';
import GQL_GET_RUNS_FEED from '@/graphql/getRunsFeed.graphql';

export default {
  name: 'run-summary',

  mixins: [runResultMixin],

  components: {
    'results-summary': ResultsSummary,
  },

  props: {
    run: {
      type: Object,
      required: true,
    },
    isLink: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    showOptions: false,
  }),

  computed: {
    timestamp() {
      return moment.utc(this.run.createdAt).format('HH:mm DD/MM/YYYY');
    },
  },

  methods: {
    runClicked() {
      if (this.isLink) {
        this.$router.push({ path: `/runs/${this.run.runId}` });
      }
    },

    optionsClicked() {
      this.showOptions = true;
    },

    hideOptions() {
      this.showOptions = false;
    },

    deleteClicked() {
      this.showConfirmModal({
        title: 'Delete Run',
        text: 'Are you sure you want to delete this run?',
        options: [
          { key: 'cancel', label: 'Cancel' },
          { key: 'ok', label: 'Delete', class: 'red' },
        ],
        callback: this.deleteConfirmed,
      });
    },

    deleteConfirmed(result) {
      if (result !== 'ok') {
        return;
      }

      this.$apollo.mutate({
        mutation: GQL_DEL_RUN,
        variables: {
          runId: this.run.runId,
        },
        update: (store, { data }) => {
          const cache = store.readQuery({
            query: GQL_GET_RUNS_FEED,
            variables: {
              cursor: '',
            },
          });

          cache.runFeed.runs = cache.runFeed.runs
          .filter(r => data.deleteRun.runIds.includes(r.runId) === false);

          store.writeQuery({
            query: GQL_GET_RUNS_FEED,
            variables: {
              cursor: '',
            },
            data: cache,
          });
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../sass/colors';
  @import '../../sass/base';

  .run-summary {
    min-height: 43px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .run-summary-icon {
      min-width: 24px;
      padding: 0 16px 0 0px;
      line-height: 47px;
      flex: 0 1 auto;
    }

    .run-summary-content {
      flex: 1 0 auto;

      .title-row {
        font-size: 1.1rem;
        text-align: left;

        &.title {
          flex: 0 1 auto;
          font-weight: bold;
        }
      }

      .details-row {
        margin-top: 10px;
        font-size: 0.9rem;
        text-align: left;
        color: $gray;

        .item {
          padding-right: 8px;
        }
      }
    }

    .run-summary-results {
      line-height: 47px;
      margin-right: 47px;
    }

    .run-summary-options {
      position: absolute;
      top: 0;
      right: 0;
      opacity: 0.6;
      line-height: 79px;
      font-size: 0.8rem;
      padding: 0 24px;
      color: $gray;
      transition: all 0.15s;
      cursor: pointer;

      &:hover {
        color: black;
        background-color: $off-white;
      }
    }

    .options-menu {
      position: absolute;
      top: 50px;
      right: 16px;
      background-color: $white;
      box-shadow: $shadow-modal;
      z-index: 10;
      border-radius: 5px;
      cursor: default;

      .item {
        padding: 16px 50px;
        font-size: 0.9rem;

        &.header {
          padding: 8px 50px;
          border-bottom: 1px solid $gray-e;
          color: $gray;
        }

        &.clicky {
          cursor: pointer;

          &:hover {
            background-color: $white-hover;
          }

          .label {
            margin-left: 16px;
          }
        }

        &.delete {
          color: $red;

          &:hover {
            color: $white;
            background-color: $red;
          }
        }

        &:last-child {
          border-bottom-right-radius: 5px;
          border-bottom-left-radius: 5px;
        }
      }
    }

    &.is-link {
      cursor: pointer;
    }

    &.is-link:hover {
      background-color: $white-hover;
    }
  }
</style>
