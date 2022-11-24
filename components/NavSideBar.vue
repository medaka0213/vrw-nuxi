<template lang="pug">
Button(type="button" @click="visibleLeft=true" icon="pi pi-bars" class="m-2")
Sidebar(v-model:visible="visibleLeft" :baseZIndex="10000")
    Menu.w-100(:model="items")
</template>

<script>
import { ref } from 'vue';

export default {
    setup() {
        const visibleLeft = ref(false);
        const items = ref([{
                label: 'ホーム',
                items: [{
                    label: 'Home',
                    icon: 'pi pi-fw pi-home',
                    url: '/'
                },{
                    label: 'About',
                    icon: 'pi pi-fw pi-info-circle',
                    url: "/about"
                }]
            },{
                label: '検索する',
                items: [{
                    label: 'ミッション',
                    icon: 'pi pi-fw pi-search',
                    url: "/mission"
                },{
                    label: '集会',
                    icon: 'pi pi-fw pi-search',
                    url: "/meetup"
                }]
            },{
                label: '外部リンク',
                items: [{
                    label: 'Twitter @vr_launch',
                    icon: 'pi pi-fw pi-twitter',
                    command: () => {
                        window.open("https://twitter.com/vr_launch", "_blank")
                    }
                },{
                    label: 'Google カレンダー',
                    icon: 'pi pi-fw pi-calendar',
                    command: () => {
                        window.open("https://t.co/nL12021X0s", "_blank")
                    }
                },{
                    label: "Discord",
                    icon: 'pi pi-fw pi-discord',
                    command: () => {
                        window.open("https://t.co/cjfnxjZrZG", "_blank")
                    }
                }]
        }]);
        return { items, visibleLeft }
    }
}
</script>
