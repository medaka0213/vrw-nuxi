<template>
  <div id="page-content">
    <header>
      <ul>
        <li><router-link to="/">ホーム</router-link></li>
        <li><router-link to="/mission">ミッション</router-link></li>
        <li><router-link to="/meetup">集会</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <!--
        <li><router-link to="/slides">スライド資料</router-link></li>
        -->
      </ul>
    </header>
    <transition mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
<style>
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