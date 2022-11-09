<template>
    <div class="youtube">
        <iframe
            :width="width"
            :src="`https://www.youtube.com/embed/${videoId}?start=${start}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: [Number, String],
            default: 640,
        },
        videoId: {
            type: String,
            required: true,
        },
        start: {
            type: [Number, String],
            default: 0,
        },
    },
};
</script>

<style>
.youtube {
  width: 100%;
  aspect-ratio: 16 / 9;
}
.youtube iframe {
  width: 100%;
  height: 100%;
}
</style>