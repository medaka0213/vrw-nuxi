<template lang="pug">
span redirecing...
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router";

export default defineComponent({
    name: 'App',
    setup() {
        const route = useRoute();
        const params = {
            pk: route.params.pk,
            type: ["launch", "event"].includes(route.params.type)? "mission" : route.params.type // launch, event は mission にリダイレクト
        };
        onMounted(() => {
            location.href = `/${params.type}/detail/?pk=${params.pk}`;
        });
    },
    head() {
        const title = 'ミッション詳細'
        return {
            title,
            meta: [
                { hid: 'og:title', property: 'og:title', content: title }
            ]
        };
    },
})
</script>

<style scoped>
img{
  width:100%;
  height:auto;
  object-fit:cover;
}
</style>
