<template lang="pug">
.text-left
    p.py-0.my-1.text-sm(v-if="item.type==='live'")
        | 生中継の部
    p.py-0.my-1.text-sm(v-if="item.type==='archive'")
        | アーカイブの部
    p.py-0.my-1.text-sm 
        | 🗓️ 日本時間 {{ item.datetime_format()  }}
    p.py-0.my-1.text-sm
        | 👨‍🚀 VRChat: {{ item.user }} にJOIN
    p.py-0.my-1.text-sm(v-if="item.get_jp_value('tweet')")
        | 🔗 
        ExternalLink(v-bind:href="item.twitterLinkJP()")
            | Twitter
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from 'vue'
import ExternalLink from "@/components/common/ExternalLink.vue";

export default defineComponent({
    props: ["item"],
    components: {
        ExternalLink
    },
})
</script>