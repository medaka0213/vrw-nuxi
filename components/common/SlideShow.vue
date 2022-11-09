<template>
<div class="card">
  <h2>Slide</h2>
<Galleria :value="images" :responsiveOptions="responsiveOptions" :numVisible="5" containerStyle="max-width: 640px">
    <template #item="slotProps">
        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt" style="width: 100%" />
    </template>
    <template #thumbnail="slotProps">
        <img :src="slotProps.item.thumbnailImageSrc" :alt="slotProps.item.alt" />
    </template>
</Galleria>
  <img :src="images[0].itemImageSrc" />
</div>
</template>

<script>
import Galleria from "primevue/galleria";
import { defineComponent, reactive, computed, onMounted } from "vue";

export default defineComponent({
  components: {
    Galleria,
  },
  setup(){
    const images = [
      {
        itemImageSrc: "https://storage.googleapis.com/nextspaceflight/media/rockets/Atlas_Agena_B_with_Ranger_1.jpg",
        thumbnailImageSrc: "https://storage.googleapis.com/nextspaceflight/media/rockets/Atlas_Agena_B_with_Ranger_1.jpg",
        alt: "Description for Image 1",
        title: "Title 1",
      },
      {
        itemImageSrc: "https://storage.googleapis.com/nextspaceflight/media/rockets/Atlas_Agena_B_with_Ranger_1.jpg",
        thumbnailImageSrc: "https://storage.googleapis.com/nextspaceflight/media/rockets/Atlas_Agena_B_with_Ranger_1.jpg",
        alt: "Description for Image 1",
        title: "Title 1",
      },
      {
        itemImageSrc: "https://storage.googleapis.com/nextspaceflight/media/rockets/Atlas_Agena_B_with_Ranger_1.jpg",
        thumbnailImageSrc: "https://storage.googleapis.com/nextspaceflight/media/rockets/Atlas_Agena_B_with_Ranger_1.jpg",
        alt: "Description for Image 1",
        title: "Title 1",
      },
]
    const responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 5,
      },
      {
        breakpoint: "768px",
        numVisible: 3,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
      },
    ]
    return{
        responsiveOptions,
        images,
    }
  }
});
</script>
