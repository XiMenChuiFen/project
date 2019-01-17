<template>
  <div id="app">
    <head-vue></head-vue>
    <router-view></router-view>
    <addword-vue></addword-vue>
  </div>
</template>

<script>
import head from './components/Header.vue';
import addword from './components/AddWord.vue';

// import usernav from './components/UserNav.vue';
export default {
  name: 'app',
  components:{
    headVue:head,
    addwordVue:addword,
    // usernavVue:usernav
  },
   methods:{
  },
   created:function(){
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}
html,body{
  height: 100%;
  min-width: 900px;
  min-height: 700px;
}
#app {
height: 100%;
}

</style>
