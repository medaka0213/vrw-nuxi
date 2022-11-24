<template lang="pug">
header
    NavSideBar
    NavBar
.page-content.mx-auto
    .row.p-0
        .text-left.col-xl-9.col-sm-12
            slot
        .col-xl-3
            .bg-white.p-4.my-3.sidebar_fixed
                GoogleCalendar
</template>

<script lang="ts">
import GoogleCalendar from "@/components/common/GoogleCalendar";
import NavSideBar from "@/components/NavSideBar";
import NavBar from "@/components/NavBar";

export default {
    components: {
        GoogleCalendar,
        NavSideBar,
        NavBar
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
</style>