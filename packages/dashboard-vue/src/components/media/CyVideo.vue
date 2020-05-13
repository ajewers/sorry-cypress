<template>
  <div class="video-container">
    <video v-if="url" class="video" controls autoplay>
      <source :src="url" type="video/mp4" />
    </video>
    <div v-else class="no-video">
      <fa-icon icon="video-slash"></fa-icon>
      <span class="label">No video found.</span>
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

  .video-container {
    margin: auto;
    margin-bottom: 16px;
    border-radius: 5px;

    .video {
      width: 100%;
      box-shadow: $shadow;

      &:focus {
        outline: none;
      }
    }

    .no-video {
      background-color: $black;
      padding: 16px;
      text-align: center;
      color: $white;
      border-radius: 5px;

      .label {
        margin-left: 12px;
      }
    }
  }
</style>
