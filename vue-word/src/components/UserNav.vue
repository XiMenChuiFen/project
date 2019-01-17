<template>
  <!--所有用户导航-->
  <el-container direction="horizontal" class="user-nav-box">
      <el-row class="tac nav-box">
        <el-col :span="12" class="boder">
            <h5 class="all" @click="userword('全部成员')">全部单词</h5>
            <el-menu default-active="2" class="el-menu-vertical-demo ul-box">
            <el-submenu index="1"  v-show="isuser3">
                <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>管理组</span>
                </template>
                <el-menu-item-group>
                <template  v-for="(users3,index) in allusers3">
                    <el-menu-item :index="'1-'+index+1" class="user-li" @click="userword(users3.name)">{{users3.name}}</el-menu-item>
                </template>
                <!-- <el-menu-item index="1-2"  class="user-li">选项2</el-menu-item> -->
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2"  v-show="isuser2">
                <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>脱产组</span>
                </template>
                <el-menu-item-group>
                    <template  v-for="(users2,index) in allusers2">
                        <el-menu-item :index="'2-'+index+1" class="user-li" @click="userword(users2.name)">{{users2.name}}</el-menu-item>
                    </template>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3"  v-show="isuser1">
                <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>雏鹰组</span>
                </template>
                <el-menu-item-group>
                    <template  v-for="(users1,index) in allusers1">
                        <el-menu-item :index="'3-'+index+1" class="user-li" @click="userword(users1.name)">{{users1.name}}</el-menu-item>
                    </template>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                <!-- <i class="el-icon-location"></i> -->
                <span>个人中心</span>
                </template>
                <el-menu-item-group>
                    <template>
                        <el-menu-item index="4-1" class="user-li" @click="userword('我的收藏')">我的收藏</el-menu-item>
                        <el-menu-item index="4-2" class="user-li"> <router-link to="/User">管理单词</router-link></el-menu-item>
                    </template>
                </el-menu-item-group>
            </el-submenu>
            <!-- <h6 class="mycollection"  @click="userword('我的收藏')"><span>我的收藏</span></h6> -->
            </el-menu>
        </el-col>
      </el-row>
  </el-container> 
</template>

<script>
import connect from '../js/connector.js'
export default {
  // name: 'head',
  data(){
      return{
          allusers2:[],//脱产组
          allusers3:[],//管理员
          allusers1:[],//菜鸟
          allword:'',//全部数据
          isuser1:false,
          isuser2:false,
          isuser3:false,
          isuserword:true,
      }
  },
  methods:{
      getuser(){
        this.$http.get('/api?api=users_data').then((res)=>{
             connect.$emit('users',res.data);
            for(let i=0; i<res.data.length; i++){//成员分组
                if(res.data[i].show_switch=="2"){
                    this.isuser2=true,
                    this.allusers2.push(res.data[i]);
                }else if(res.data[i].show_switch=="3"){
                    this.isuser3=true,
                    this.allusers3.push(res.data[i]);
                }else if(res.data[i].show_switch=="1"){
                    this.allusers1.push(res.data[i]);
                    this.isuser1=true,
                    console.log(allusers1);
                }
            }
            // console.log(res.data);
            // console.log(this.allusers2);
            // console.log(this.allusers3);
        });
      },
    //   getworddata(){
    //       let th=this;//接受所有单词
    //       connect.$on('getword',function(data){
    //           th.allword=data;
    //           console.log(th.allword);
    //         // console.log('1');
    //       });
    //   },
      userword(username){//筛选用户添加的单词
        let th=this;
        this.$notify({
                title:`${username}的单词`,
                duration:1000,
        });
        connect.$emit('userworddata',username);
      }
  },
  created(){
      this.getuser();
    //   this.getworddata();
  }
}
</script>
<style scoped>
*{
  margin: 0;padding: 0;
  /* overflow: hidden; */
  min-width: 100px;
}
html,body{
    height: 100%;
}
.user-nav-box{
    height: 100%;
   /* margin-top: 60px; */
   padding-top: 60px;
}

.all{
    height: 56px;
    box-sizing: border-box;
    font-size: 18px !important;
    padding: 0px !important;
    text-align: center !important ;
    line-height: 56px;
    margin-top: 40px;
    cursor: pointer;
    /* background: #409EFF; */
}
.all:hover{
    /* background: #ecf5ff; */
    color: #409EFF;
}
.user-li{
    padding: 0px !important;
    text-align: center;
    min-width: 100%;
    /* flex:1; */
}
.user-li a{
    display: block;
    text-decoration: none;
    color: #303133;
    /* font-weight: 400; */
    /* font-size: 14px; */
}
.ul-box{
    border: none;
}
/* .boder{ */
    /* box-sizing: border-box; */
    /* border-right: solid 1px #e6e6e6; */
/* } */
.el-col-12 {
    width: 100%;
}
.nav-box{
    /* display: block; */
    flex: 1;
    box-sizing: border-box;
    border-right: solid 1px #e6e6e6;
}
.el-menu-item.is-active {
    color: #000;
}
.mycollection{
    height: 56px;
    line-height: 56px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    color: #303133;
    cursor: pointer;
}
.mycollection:hover{
    background-color: #ecf5ff;
}
</style>
