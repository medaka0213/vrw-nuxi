<template lang="pug">
img(type="image/svg+xml" :src="src" alt="VRW-Logo")
</template>

<script lang="ts">
export default {
    name: "VRWLogo",
    props: {
        lang: {
            type: String,
            default: "jp"
        },
    },
    setup(props) {
        const logo_jp = "https://img.virtualrocketwatching.net/image/image_4f7d6ac8-9c74-4ef5-a917-44129992ca44.svg"
        const logo_en = "https://img.virtualrocketwatching.net/image/image_21912965-e900-4ae4-a902-910d6b188b59.svg"
        const src = computed(() => props.lang.toLowerCase() === "jp" ? logo_jp : logo_en);
        return { src };
    },
};
</script>

<style scoped>
img {
    display: block;
    max-width: 100%;
    height: auto;
}
</style>