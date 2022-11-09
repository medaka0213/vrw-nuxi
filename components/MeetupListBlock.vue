<template lang="pug">
p.ml-3.my-1.text-left(v-if="items") {{items.length}}件が見つかりました
.row
    .p-2.text-left.col-xl-4.col-lg-6(v-for="(item, key) in items" :key="key")
        .bg-white.p-2.py-4
            h5.pl-3.mb-0
                a(v-bind:href="item.itemDetailPath()")
                    | {{item.get_jp_value('title')}}
            .pl-3.p-2.my-1
                MeetupListItem(:item="item")
</template>

<script>
import MeetupListItem from "@/components/MeetupListItem"

export default {
    components: {
        MeetupListItem
    },
    props: [
        "items"
    ]
}
</script>