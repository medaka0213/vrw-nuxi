<template lang="pug">
AboutUsBlock
</template>

<script lang="ts">
import AboutUsBlock from "@/components/AboutUs.vue";

export default {
  components: {
    AboutUsBlock
  },
  head() {
    const title = 'About'
    return {
      title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: title }
      ]
    };
  },
};
</script>
