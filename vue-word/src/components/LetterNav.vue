<template>
  <!--字母导航-->
  <el-container direction="vertical" class="user-nav-box">
    <div class="letter">
        <template v-for="letter in Allletter">
        <div @click="open(letter)" :class="{li:titles==letter}">{{letter}}</div>
        </template>
    </div>
  </el-container> 
</template>

<script>
import connect from '../js/connector.js'
export default {
//   name: 'head',
    data(){
        return{
            Allletter:["#","A","B","C","D","E","F","G","H","I","J","K","L","M","O","P","Q","R","s","T","U","V","W","Z"],
            allword:'',//原始所有单词数据
            word:'',
            titles:'',
        }
    },
    methods: {
        getword(){//接受所有单词数据
            let th=this;
            connect.$on('getword',function(data){
              th.allword=data;
            //   console.log(th.allword);
            });
        },
        open:function(e){
            let title='';
            this.titles=e;
            let th=this;
            if(e=="#"){
                title="查看所有单词";
            }else{
                title=`查看首字母为${e}的单词`;
            }
            this.$notify({
                title:title,
                duration:1000,
            });
            connect.$emit('letterworddata',e);
            connect.$on('userworddata',function(title){
                // console.log(title);
                th.titles=title;
            })
            // console.log(this.titles);
        },
    },
    created(){
        this.getword();
    }
}
</script>
<style scoped>
*{
  margin: 0;padding: 0;
  overflow: hidden;
}
.user-nav-box{
    /* margin-top: 100px; */
    height: 100%;
    display: flex;
    flex-direction:row ;
    justify-content: center;
    padding:100px 0px;
}
.letter{
    /* display: flex;
    flex-direction: column; */
    padding:20px 0px 20px 0px;
    /* height: 100%; */
    width: 30px;
    box-sizing: border-box; 
    background: #409EFF;
    display: flex;
    flex-wrap: wrap;
    flex-direction:row ;
    justify-content:space-between;
}
.letter div,.li{
    width: 30px;
    text-align: center;
    color: #ffff;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}
.li{
    background: rgb(255, 208, 75) !important; 
}
.letter div:hover{
    background: rgb(255, 208, 75) !important;
}
.letter div:active{
    background: rgb(255, 208, 75) !important;
}
</style>
