<template lang="pug">
DafaultLayout
    .row.bg-white.p-4.my-3(v-if="store.state.item.isReceived")
        .text-left(class="col-12")
            h1.text-primary
                | {{item.get_jp_value("title")}}
        .text-left.col-12.col-lg-6
            img(
                v-bind:src="posterUrl || 'https://img.virtualrocketwatching.net/VRWlogo_21-02-14_JP.png'"
                alt="Image" max-width="100%" preview
            )
            span(class="text-gray-600 text-sm" v-if="item.image_credit && !posterUrl")
                | Credit: {{item.image_credit}}
        .text-left.col-12.col-lg-6(v-if="item.pk")
            .p-3.mb-3.border.bg-light
                MeetupListItem(:item = "item")
            .p-3.mb-3.border.bg-light
                p.mb-0
                    a(:href= "msision.itemDetailPath()" )
                        | ミッション詳細

    span(v-else) 
        | loading...
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from "vue-router";

import MeetupListItem from "@/components/MeetupListItem"
import SlideItemBlock from "@/components/SlideItemBlock"
import CountdownBlock from "@/components/CountdownBlock"
import MissionTimer from "@/components/common/MissionTimer"

import store from '@/store'


export default defineComponent({
    name: 'App',
    components: {
        MeetupListItem,
        SlideItemBlock,
        CountdownBlock,
        MissionTimer,
    },
    setup(props){
        const route = useRoute();
        const item = computed(() => {
            if (store.state.item.isReceived){
                return store.state.item["meetup"][0]
            } else {
                return {}
            }
        })
        const posterUrl = computed(() => {
            if (store.state.item.isReceived){
                let imgs = store.state.item["image"] || []
                if (imgs.length > 0){
                    let res = imgs.filter(img => img.name.endsWith("JP"))
                    return res[0].src()
                }
            }
            return item.value.image_url
        })
        const msision = computed(() => {
            if (store.state.item.isReceived){
                if (store.state.item["event"]){
                    return store.state.item["event"][0]
                } else {
                    return store.state.item["launch"][0]
                }
            } 
            return {}
        })
        const state = reactive({
            item:{},
            relations: {},
            references: {},
            loaded: false,
        })
        async function getItems(){
            console.log(props)
            const _props = {
                type: "meetup",
                pk: route.query.pk
            }
            await store.commit('item/set_received', false)
            await store.dispatch('item/get_single_item', _props)
            await store.dispatch('item/get_item_relation', _props)
            await store.dispatch('item/get_item_reference', _props)
            await store.commit('item/set_received', true)
        }
        onMounted(() => {
            getItems()
        })
        return{
            msision,
            item,
            posterUrl,
            store,
            state,
            getItems,
        }
    },
    head() {
        const title = '集会詳細'
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
