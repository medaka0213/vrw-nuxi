<template lang="pug">
span
  | Credit: {{ item.user }} / 
  a(href="https://creativecommons.org/licenses/by-sa/4.0/deed.ja" target="_blank")
    | CC-BY-SA 4.0
.bg-blue.bg-secondary.border
  Galleria(:value="images" class="border" :numVisible="10")
      template(#item="slotProps")
          img(:src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%; display: block;")
      template(#thumbnail="slotProps")
          img(:src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 90%; display: block;")
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: ["item",] ,
  setup(props) {
    console.log(props)
    const images = computed(() => {
      return [...Array(props.item["data-length"])].map((_, i) => {
        return {
          alt: props.item.pk + "-" + i,
          itemImageSrc:`https://img.virtualrocketwatching.net/slide/${props.item.pk}/${('00000'+i).slice(-5)}.jpeg`
      }})
    })
    return {
      images
    }
  },
})
</script>

<style>
.p-galleria .p-galleria-thumbnail-container {
  background : none;
}
</style>