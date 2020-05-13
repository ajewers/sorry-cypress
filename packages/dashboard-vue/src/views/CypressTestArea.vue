<template>
  <div class="cypress-test-area-view">
    <div class="row">
      <input
        class="text-input item fixed"
        type="text"
        placeholder="Text One"
        v-model="textOne"
        data-cy="text-one" />
      <input
        class="text-input item fixed"
        type="text"
        placeholder="Text Two"
        v-model="textTwo"
        data-cy="text-two" />
      <input
        class="text-input item fixed"
        type="text"
        placeholder="Text Three"
        v-model="textThree"
        data-cy="text-three" />
      <div
        class="item grow label"
        data-cy="label">
        <span v-if="[textOne, textTwo, textThree].includes('') === false">
          {{ textOne }}, {{ textTwo }} and {{ textThree }}!
        </span>
      </div>
    </div>
    <div class="row">
      <div
        class="button item fixed"
        v-if="!showCard"
        @click="toggleCard()"
        data-cy="button-show">
        Show
      </div>
      <div
        class="button item fixed"
        v-if="showCard"
        @click="toggleCard()"
        data-cy="button-hide">
        Hide
      </div>
      <div
        class="button item fixed"
        @click="add(1)"
        data-cy="button-one">
        +1
      </div>
      <div
        class="button item fixed"
        @click="add(10)"
        data-cy="button-ten">
        +10
      </div>
      <div
        class="button item fixed"
        @click="add(100)"
        data-cy="button-one-hundred">
        +100
      </div>
      <div
        class="button item fixed"
        @click="add(1000)"
        data-cy="button-one-thousand">
        +1000
      </div>
      <div
        class="button item fixed"
        @click="add(10000)"
        data-cy="button-ten-thousand">
        +10000
      </div>
      <div
        class="item grow label"
        data-cy="count">
        {{ count }}
      </div>
    </div>
    <div
      v-if="showCard"
      class="card item grow"
      data-cy="card">
      Card
    </div>
  </div>
</template>

<script>
export default {
  name: 'CypressTestAreaView',

  data: () => ({
    textOne: '',
    textTwo: '',
    textThree: '',
    showCard: false,
    count: 0,
  }),

  methods: {
    toggleCard() {
      this.showCard = !this.showCard;
    },

    add(n) {
      this.count += n;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../sass/colors';
@import '../sass/base';

.cypress-test-area-view {
  padding: 20px;

  .row {
    margin-bottom: 16px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .item {
      margin: 0 10px;

      &.fixed {
        flex: 0 1 auto;
      }

      &.grow {
        flex: 1 0 auto;
      }
    }

    .text-input {
      border: none;
      border-radius: 5px;
      font-size: 30px;
      padding: 5px;
    }

    .button {
      padding: 16px;
      font-size: 20px;
      background-color: $white;
      color: $blue;
      border-radius: 5px;
      min-width: 152px;
      transition: all 0.15s;
      cursor: pointer;

      &:hover {
        background-color: $blue;
        color: $white;
      }
    }

    .label {
      border: none;
      border-radius: 5px;
      font-size: 30px;
      padding: 5px;
      background-color: $blue;
      color: $white;
    }
  }

  .card {
    min-height: 500px;
  }
}
</style>
