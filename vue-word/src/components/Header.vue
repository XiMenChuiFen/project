<template>
  <!--头部 -->
  <el-container direction="horizontal" class="hade-box">
    <el-main class="hade-logo"><!--logo-->
      <a href="http://10.21.40.40/star2/index.html"><img src="../assets/logo_v2.png" alt="logo"></a>
    </el-main>
    <el-main class="hade-nav"><!--导航-->
      <el-container direction="horizontal" class="hade-nav-box">
        <el-main class="hade-nav-left nav">
          <el-menu class="el-menu-demo" mode="horizontal" background-color="#409EFF">
            <el-menu-item index="1" class="nav-li">
              <span :class="{licolor:this.$route.path=='/word' || this.$route.path=='/' }">
              <router-link to="/word">单词库
              </router-link></span>
            </el-menu-item>
            <el-menu-item index="2" class="nav-li">
              <span :class="{licolor:this.$route.path=='/Translate/'+this.$route.params.en || this.$route.path=='/Translate'}">
                <router-link to="/Translate">在线翻译</router-link>
              </span>
            </el-menu-item>
             <el-menu-item index="2" class="nav-li">
              <span :class="{licolor:this.$route.path=='/Answer'}">
                <router-link to="/Answer">答题模式</router-link>
              </span>
            </el-menu-item>
          </el-menu>
        </el-main>
        <el-main class="hade-nav-right nav">
          <el-input placeholder="请输入内容" class="input" v-model="inputdata" v-show="isinput" :disabled="true"></el-input>
          <el-button type="primary" icon="el-icon-search" class="search" @click="search()" v-show="isinput" ></el-button>
          <el-button type="primary" icon="el-icon-plus" class="search" @click="add()" v-show="isinput"></el-button>
        </el-main>
      </el-container>
    </el-main>
    <el-main class="hade-user">
       <!-- <el-tooltip class="item" effect="dark" content="管理单词" placement="top-start"> -->
         <el-main class="user-img"><span :class="{licolor:type=='/User'}" @click="nav('/User')">
          <el-tooltip class="item" effect="dark" content="管理单词" placement="top-start">
         <router-link to="/User">{{username}}</router-link>
         </el-tooltip>
         </span>
         </el-main>
         <!-- </el-tooltip> -->
    </el-main>
  </el-container> 
  <!-- </div> -->
</template>

<script>
import connect from '../js/connector.js'
// import userdate from '../js/login.js'
export default {
  // name: 'head',
  data(){
    return{
      type:this.$route.path || '/word',
      isopen:true,
      username:'',
      inputdata:'',
      isinput:false,
    }
  },
  methods:{
    urls(){
      const path = this.$route.path; 
        // console.log(path);
        if(path=='/word' || path=='/'){
          this.isinput=true;
        }else{
          this.isinput=false;
        }
    },
    nav(){//导航高亮
      // this.type=$type;
      //请求获取登陆者的名
       this.$http.jsonp('http://10.21.40.205/VueWordApi/userss.php?key='+this.GetQueryString('key')+'&jsonp=fun').then((res)=>{
        // console.log(res.data.name);
        this.username=res.data.name;
        connect.$emit('username',this.username);
      });
    },
    add(){//打开添加单词页
      // console.log(this.username);
      connect.$emit('openaddword',this.isopen);
    },
    GetQueryString(name){//key
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
    },
    getuser(){//请求获取登陆者的名
      this.$http.jsonp('http://10.21.40.205/VueWordApi/userss.php?key='+this.GetQueryString('key')+'&jsonp=fun').then((res)=>{
        // console.log(res.data.name);
        this.username=res.data.name;
        connect.$emit('username',this.username);
      });
    },
    search(){
      console.log(this.inputdata);
    }
  },
  created:function(){
    this.getuser();
    this.urls();
  },
  watch:{//检测页面变化
    "$route":function(){//检测路由地址变化
        this.urls();
        this.nav();
    }
  }
}
</script>
<style scoped>
*{
  margin: 0;padding: 0;
  overflow: hidden;
}
.hade-box{
  height: 60px;
  background: #409EFF;
  /* position: relative; */
  position: fixed;
  /* margin-top: 60px; */
  width: 100%;
  z-index: 3;
}
.hade-logo,{
  flex: 1;
}
.hade-user{
  flex: 1;
}
.hade-nav{
  flex: 8;
}
.hade-logo{
  text-align: center;
}
.hade-logo img{
  height: 100%;
}
.nav{
  height: 60px;
}
.hade-nav-left{
  flex: 6;
}
.hade-nav-right{
  flex: 4;
  display: flex;
}

/*nav*/
.el-menu-demo{
  display: flex;
  justify-content: center;
}
.nav-li{
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  border: none;
}
.licolor a{
  color:rgb(255, 208, 75) !important; 
}
.nav-li:hover{
  background: transparent !important;
}
.nav-li span{
  display: block;
  height: 60px;
  box-sizing: border-box;
}
/* .nav-li span:hover{ */
  /* border-bottom:2px solid rgb(255, 208, 75) !important;; */
/* } */
.nav-li span a:hover{
  color: rgb(255, 208, 75) !important;
}
.nav-li a{
  display: block;
  color: #000;/*rgb(255, 208, 75)*/
  font-size: 16px;
  text-decoration: none;
}
.input{
  flex: 5;
  line-height: 60px;
  margin-right: 5px;
  /* margin-left: 110px; */
}
.search{
  margin-top: 5px;
  height: 50px;
  flex: 1;
  font-size: 24px;
}
.user-img{
  height: 50px;
  margin-top: 5px;
 
}
.user-img{
  display:flex;
  justify-content: center;
  box-sizing: border-box;
}
.user-img img{
  margin-right: 20px;  
   border-radius: 50%;
  height: 100%;
}
.user-img span{
  height: 50px;
  line-height:50px ;
}

.user-img a{
  display: block;
  width: 100%;
  height: 100%;
  text-decoration: none;
  color: #000
}
.user-img a:hover{
  color:rgb(255, 208, 75) !important; 
}
</style>
