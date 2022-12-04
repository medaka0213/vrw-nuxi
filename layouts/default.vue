<template lang="pug">
header
    NavSideBar
    NavBar
.page-content.mx-auto
    .row.p-0
        .text-left.col-xl-9.col-sm-12
            slot
        .col-xl-3
            .my-3.sidebar_fixed
                .text-center.p-3.mb-3.bg-white
                    Image(
                        src="https://img.virtualrocketwatching.net/images/events/00000.jpg"
                        width="100%"
                        height="auto"
                        alt="Calendar"
                        preview
                    ).border
                    | イベントカレンダー
                    .text-xs 画像をクリックして拡大
                .text-center.p-3.mb-3.bg-white
                    Image(
                        src="https://img.virtualrocketwatching.net/images/countdown/000.jpg"
                        width="100%"
                        height="auto"
                        alt="Calendar"
                        preview
                    ).border
                    | ミッションタイムライン
                    .text-xs 画像をクリックして拡大
                .text-center.p-3.mb-3.bg-white(v-if="$ua.browser !== 'Safari'")
                    GoogleCalendar
.bg-white.text-center.p-3.footer
    p
        span.mr-3
            a(href="/").text-sm
                | ホーム
        span.mr-3
            a(href="/about").text-sm
                | このサイトについて
        span.mr-3
            a(href="/mission").text-sm
                | ミッション検索
        span.mr-3
            a(href="/meetup").text-sm
                | 集会検索
    p
        span.mr-3
            a(target="_blank" href="https://t.co/nL12021X0s")
                | Twitter
        span.mr-3
            a(target="_blank" href="https://t.co/nL12021X0s")
                | Calendar
        span.mr-3
            a(target="_blank" href="https://t.co/nL12021X0s")
                | Discord
        span.mr-3
            a(target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLScESvA557taE0zYj8gzlx2cQwrUDWs3cPxDnCWlacfUWTVLwg/viewform")
                | 参加者アンケート
        span.mr-3
            a(target="_blank" href="https://docs.google.com/forms/d/e/1FAIpQLSeA5e7jdzyvLZD9-fs01ixzUJjJhcZKN65pjGSYj46nYYDEPw/viewform")
                | スタッフ参加希望フォーム
        span デバッグ用 {{ $ua.browser }}
    p ©2022 VirtualRocketWatching
</template>

<script lang="ts">
import GoogleCalendar from "@/components/common/GoogleCalendar";
import NavSideBar from "@/components/NavSideBar";
import NavBar from "@/components/NavBar";
import ExternalLink from "@/components/common/ExternalLink.vue";

export default {
    components: {
        GoogleCalendar,
        NavSideBar,
        NavBar,
        ExternalLink
    }
};
</script>

<style>
.html-class {
}
.body-class {
    margin: 0;
    background-color: #eee;
}
.page-content {
    text-align: left;
    max-width: 1500px;
    min-height: 100vh;
}
.sidebar_fixed {
    position: sticky;
    top: 25px;
}
.sidebar_content {
    margin-bottom: 100px;
}
header {
    background: #004f8a;
}
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s;
}
.v-enter,
.v-leave-to {
    opacity: 0;
}
.footer a {
    color: #8a8a8a;
}
</style>