<template lang="pug">
.bg-white.p-3.my-3
    h2 「ロケット打ち上げを観る集会」について
    p
        | VRChatでロケットの打ち上げ生中継・アーカイブ動画を同時視聴する、パブリックビューイングイベントを行っています。
        br
        | 実物大の3Dモデルや教材を用いて、最新の宇宙開発事情をお届けします。
    
    p 最新の打ち上げ情報については、下記のリンクをご覧ください。
    .d-flex.flex-wrap
        .mr-4
            a(href="/mission") 
                i.pi.pi-search.mr-1
                | ミッション検索
        .mr-4
            a(href="/meetup") 
                i.pi.pi-search.mr-1
                | 集会検索

.bg-white.my-3.p-3
    h3 外部リンク

    p
        |告知・スケジュール・打ち上げ情報の確認等にご利用ください
    .d-flex.flex-wrap
        .mr-4
            ExternalLink(href="https://twitter.com/vr_launch")
                i.pi.pi-twitter.mr-1
                | Twitter
        .mr-4
            ExternalLink(href="https://t.co/nL12021X0s")
                i.pi.pi-calendar.mr-1
                | Google Calendar
        .mr-4
            ExternalLink(href="https://t.co/cjfnxjZrZG")
                i.pi.pi-discord.mr-1
                | Discord

.bg-white.my-3.p-3
    h3 ご連絡先
    p
        | ご意見・ご要望等ございましたら、下記のGoogle Form までお問い合わせください。
    .d-flex.flex-wrap
        .mr-3
            ExternalLink(href="https://docs.google.com/forms/d/e/1FAIpQLScESvA557taE0zYj8gzlx2cQwrUDWs3cPxDnCWlacfUWTVLwg/viewform") 
                i.pi.pi-envelope.mr-1
                | 参加者アンケート
        
        .mr-3
            ExternalLink(href="https://docs.google.com/forms/d/e/1FAIpQLSeA5e7jdzyvLZD9-fs01ixzUJjJhcZKN65pjGSYj46nYYDEPw/viewform")
                i.pi.pi-envelope.mr-1
                | スタッフ参加希望フォーム
</template>

<script lang="ts">
import ExternalLink from "@/components/common/ExternalLink.vue";

export default {
    props: ["href"],
    components: {
        ExternalLink
    },
    setup(props){
        return {
            props
        }
    }
};
</script>

