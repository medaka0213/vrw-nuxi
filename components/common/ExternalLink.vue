<template lang="pug">
a(:href="href" target="_blank")
  span.mr-1
    slot
  i.pi.pi-external-link(style="font-size: 0.5rem")
AboutUsBlock
</template>

<script lang="ts">
export default {
  props: ["href"],
  setup(props){
    return {
      props
    }
  }
};
</script>
