<template lang="pug">
.text-left
    p.py-0.my-1.text-sm
        | 🗓️ {{item.datetime_time_type === "CONFIRMED"? "日本時間" : ""}} {{ item.datetime_format_JP || item.date_JP  }}
    p.py-0.my-1.text-xs
        | 🔗 
        a(v-bind:href="item.nextSpaceFlightLink()" target="_blank")
            | NextSpaceFlight.com
</template>


<script lang="ts">
import { Event } from '@/models/mission'
export default {
    props: {
        item: {
            type: Event,
            required: true
        }
    }
}
</script>
