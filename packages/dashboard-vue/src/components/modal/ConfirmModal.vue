<template>
  <div class="modal-container" v-if="confirmModal.show">
    <div class="modal confirm-modal">
      <div class="title">
        {{ confirmModal.title }}
      </div>
      <div class="body">
        <div>{{ confirmModal.text }}</div>
      </div>
      <div class="options">
        <div
          v-for="option in confirmModal.options"
          class="button"
          :key="option.key"
          :class="option.class"
          @click="optionClicked(option)">
          {{ option.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'confirm-modal',

  computed: {
    ...mapState('app', [
      'confirmModal',
    ]),
  },

  methods: {
    optionClicked(option) {
      this.$store.dispatch('app/confirmModalResult', option.key);
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../sass/colors';
  @import '../../sass/base';

  .modal-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 100;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .modal {
      position: relative;
      width: 25vw;
      height: 28vh;
      margin: auto;
      background-color: $white;
      box-shadow: $shadow;
      border-radius: 10px;
      flex: 0 1 auto;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      min-height: 200px;

      .title {
        flex: 0 1 auto;
        padding: 16px 0;
        font-size: 30px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        border-bottom: 1px solid $gray-e;
      }

      .body {
        padding: 16px;
        flex: 1 0 auto;
        border-bottom: 1px solid $gray-e;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .options {
        flex: 0 1 auto;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;

        .button {
          padding: 16px;
          font-size: 20px;
          flex: 1 0 auto;
          cursor: pointer;
          transition: all 0.15s;

          &:first-child {
            border-bottom-left-radius: 8px;
          }

          &:last-child {
            border-bottom-right-radius: 8px;
          }

          &:not(:first-child) {
            border-left: 1px solid $gray-e;
          }

          &:hover {
            background-color: $off-white;
          }

          &.blue {
            color: $blue;

            &:hover {
              background-color: $blue;
              color: $white;
            }
          }

          &.red {
            color: $red;

            &:hover {
              background-color: $red;
              color: $white;
            }
          }
        }
      }
    }
  }
</style>
