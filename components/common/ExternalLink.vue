<template lang="pug">
a(:href="href" target="_blank" :class="class")
  slot
  i.ml-1.pi.pi-external-link(style="font-size: 0.5rem")
AboutUsBlock
</template>

<script lang="ts">
export default {
  props: ["href", "class"],
  setup(props){
    return {
      props
    }
  }
};
</script>
