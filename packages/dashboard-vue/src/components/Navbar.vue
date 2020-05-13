<template>
  <div class="navbar-container" data-cy="navbar-container">
    <!-- <div class="nav-flex fixed title">Sorry Cypress</div> -->
    <router-link
      class="nav-flex fixed link"
      to='/runs'
      data-cy="nav-link-runs">
      <fa-icon icon="database"></fa-icon>
      <span>All Runs</span>
    </router-link>
    <router-link
      class="nav-flex fixed link"
      to='/test'
      data-cy="nav-link-test-area">
      <fa-icon icon="cog"></fa-icon>
      <span>Test Area</span>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'navbar',


};
</script>

<style lang="scss" scoped>
  @import '../sass/colors';

  .navbar-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    background-color: $black;
    padding-left: 20px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.5);
    z-index: 10;

    display: flex;
    flex-direction: row;
    justify-content: flex-start;

    .nav-flex {
      padding: 10px 24px;
      margin: 0 8px 0 0;
      line-height: 30px;
      border-bottom: 5px solid transparent;
      color: $gray-text;

      span {
        margin-left: 12px;
      }

      &.fixed {
        flex: 0 1 auto;
      }

      &.grow {
        flex: 1 0 auto;
      }

      &.title {
        padding-left: 50px;
        padding-right: 50px;
        font-size: 1.5rem;
        font-weight: bold;
      }

      &.link {
        font-weight: bold;
        text-decoration: none;
      }

      &:hover {
        color: $white-text;
        background-color: $black-light;
      }

      &.router-link-active {
        color: $white-text;
        border-bottom: 5px solid $blue;
      }

      &.router-link-exact-active {
        color: $blue;
        background-color: $black-light;
      }
    }
  }
</style>
