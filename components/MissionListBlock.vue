<template lang="pug">
p.ml-3.my-1.text-left(v-if="items") {{items.length}}件が見つかりました
.row
    .p-2.text-left.col-xl-4.col-lg-6(v-for="(item, key) in items" :key="key")
        .bg-white.p-2.py-4
            h5.pl-3.mb-0
                a(v-bind:href="item.itemDetailPath()")
                    | {{item.get_jp_value('name')}}
            .pl-3.p-2.my-1
                EventListItem(:item = "item" v-if="item.itemType() == 'event'")
                LaunchListItem(:item = "item" v-if="item.itemType() == 'launch'")
</template>

<script lang="ts">
import LaunchListItem from "@/components/LaunchListItem"
import EventListItem from "@/components/EventListItem"

export default {
    components: {
        LaunchListItem,
        EventListItem
    },
    props: [
        "items"
    ]
}
</script>