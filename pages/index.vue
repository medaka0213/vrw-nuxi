<template lang="pug">
.p-4.my-3.page-item.bg-white
    VRWLogo
AboutUsBlock
</template>

<script lang="ts">
import VRWLogo from "@/components/common/Logo.vue"
import AboutUsBlock from "@/components/AboutUs.vue";

export default {
  components: {
    VRWLogo,
    AboutUsBlock
  },
  head() {
    return {
      title: 'Home',
    };
  },
};
</script>
