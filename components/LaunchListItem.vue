<template lang="pug">
.text-left
    p.py-0.my-1.text-sm 
        | 🗓️ {{item.datetime_time_type === "CONFIRMED"? "日本時間" : ""}} {{ item.datetime_format_JP  }}
    p.py-0.my-1.text-sm(v-if="item.get_jp_value('rocket')")
        |🚀 {{ item.get_jp_value('provider') }} | {{ item.get_jp_value('rocket') }}
    p.py-0.my-1.text-sm(v-if="item.get_jp_value('site')")
        | 🌍 {{ item.get_jp_value('site') }}
    p.py-0.my-1.text-sm(v-if="item.get_jp_value('overview')")
        | 💬 {{ item.get_jp_value('overview') }}
    p.py-0.my-1.text-sm
        | 🔗 
        ExternalLink(v-bind:href="item.nextSpaceFlightLink()")
            | NextSpaceFlight.com
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from 'vue'
import ExternalLink from "@/components/common/ExternalLink.vue";

export default defineComponent({
    props: ["item"],
    components: {
        ExternalLink
    },
})
</script>
