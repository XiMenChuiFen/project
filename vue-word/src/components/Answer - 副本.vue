<template>
  <!--答题-->
  <el-container direction="horizontal" class="hade-box">
    <el-main class="answer-box">
      <el-main class="answer-nav">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-menu-item index="1" class="item">
                <span slot="title" class="nav-title nav-t"><router-link to="/Day">每日进度</router-link></span>
              </el-menu-item>
            </el-menu>
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-menu-item index="1" class="item">
                <span slot="title" class="nav-title"><router-link to="">每日进度</router-link></span>
              </el-menu-item>
            </el-menu>
             <el-menu default-active="2" class="el-menu-vertical-demo">
              <el-menu-item index="1" class="item">
                <span slot="title" class="nav-title"><router-link to="">每日进度</router-link></span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-main>
      <el-main class="answer-content">
        
      </el-main>
    </el-main>
  </el-container> 
</template>

<script>
export default {
  // name: 'head',
}
</script>
<style scoped>
*{
  margin: 0;padding: 0;
  overflow: hidden;
}
html,body{
  height: 100%;
}
.hade-box{
  height: 100%;
  padding-top: 60px;
  min-width: 900px;
  
}
.answer-box{
  width: 50%;
  height: 100%;
  background: #f9f9f9;
  display: flex;
}
.answer-content{
  flex: 9;
}
.tac{
  padding-top: 40px;
}
.el-menu{
  border: none;
}
.answer-nav{
  flex: 1;
  height: 100%;
  background: #fff;
  border-right:solid 1px #e6e6e6; 
}
.item{
  padding-left: 0px !important;
  text-align: center;
  color: #303133;
}
.nav-t{
  font-size: 18px;
  font-weight: bold;
}
.nav-title a{
  text-decoration: none;
  color: #303133;
}
</style>
