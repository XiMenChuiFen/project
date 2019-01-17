<template>
    <!--首页-->
    <el-container direction="horizontal" class="word">
        <!-- <el-main> -->
        <el-main class="user-nav"><usernav-vue></usernav-vue></el-main>
        <el-main class="word-date"><worddata-vue></worddata-vue></el-main>
        <el-main class="letter-nav"><letternav-vue></letternav-vue></el-main>
        <!-- </el-main> -->
    </el-container>
</template>

<script>
import usernav from '../components/UserNav.vue';
import worddata from '../components/WordData.vue';
import letternav from '../components/LetterNav.vue';
export default {
//   name: 'app',
  components:{
    usernavVue:usernav,
    worddataVue:worddata,
    letternavVue:letternav,
  }
}
</script>

<style scoped>
*{
  margin: 0;
  padding: 0;
  /* overflow: hidden; */
}
/* html,body{
     height: 100%; 
}*/
.el-main{ 
    padding: 0px;
    height: 100% !important;
}
.word{
    height: 100%;
    /* margin-top: -60px; */
}
.user-nav{
    flex: 1;
}
.word-date{
    flex: 8;
    /* overflow: auto; */
}
.letter-nav{
    flex: 1;
    overflow: hidden;
}
::-webkit-scrollbar {
    width: 0px;  
}
</style>
