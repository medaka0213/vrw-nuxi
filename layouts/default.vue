<template lang="pug">
header
  ul
    li
      router-link(to="/") ホーム
    li
      router-link(to="/mission") ミッション
    li
      router-link(to="/meetup") 集会
    li
      router-link(to="/about") About
    // li
    //   router-link(to="/slides") スライド資料
.page-content.mx-auto
  .row.p-0
    .text-left.col-xl-9.col-sm-12
      slot
    .col-xl-3
      .bg-white.p-4.my-3.sidebar_fixed
          GoogleCalendar
</template>

<script lang="ts">
import GoogleCalendar from "@/components/common/GoogleCalendar"

export default {
    components: {
        GoogleCalendar
    }
}
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
header{
  background : #004F8A;
}
.v-enter-active, .v-leave-active {
  transition: opacity .5s;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
ul{
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
}
ul li{
  margin: 10px;
}

ul a{
  color: #fff;
}
</style>