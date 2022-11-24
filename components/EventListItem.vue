<template lang="pug">
.text-left
    p.py-0.my-1.text-sm
        | 🗓️ {{item.datetime_time_type === "CONFIRMED"? "日本時間" : ""}} {{ item.datetime_format_JP || item.date_JP  }}
    p.py-0.my-1.text-sm
        | 🔗 
        ExternalLink(v-bind:href="item.nextSpaceFlightLink()")
            | NextSpaceFlight.com
</template>


<script lang="ts">
import ExternalLink from "@/components/common/ExternalLink.vue";
import { Event } from '@/models/mission'

export default {
    props: {
        item: {
            type: Event,
            required: true
        }
    },
    components: {
        ExternalLink
    },
}
</script>
