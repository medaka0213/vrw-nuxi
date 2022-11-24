<template lang="pug">
nav.d-none.d-sm-block
  router-link.m-2(to="/")
    i(class="pi pi-home mr-1") 
    | ホーム
  router-link.m-2(to="/mission")
    i(class="pi pi-search mr-1") 
    | ミッション
  router-link.m-2(to="/meetup") 
    i(class="pi pi-search mr-1") 
    | 集会
  router-link.m-2(to="/about")
    i(class="pi pi-info-circle mr-1") 
    | About
</template>

<style scoped>
header{
  background : #004F8A;
  text-align: right;
}
.v-enter-active, .v-leave-active {
  transition: opacity .5s;
}
.v-enter, .v-leave-to {
  opacity: 0;
}
nav{
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
  position: absolute;
  left: 50px;
  top: 16px;
}
a{
  color: #fff;
}
</style>
