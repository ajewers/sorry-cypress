<template>
  <div class="video">
    <div v-if="!url" class="loading">
     <fa-icon icon="spinner" spin></fa-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cy-video',

  props: {
    url: {
      type: String,
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../sass/colors';

  .video {
    width: 600px;
    height: 380px;
    background-color: $black;
    margin: auto;
    border-radius: 5px;

    .loading {
      line-height: 380px;
      font-size: 2rem;
      color: $white;
    }
  }
</style>
