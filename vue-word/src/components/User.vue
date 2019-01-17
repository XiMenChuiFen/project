<template>
  <div class="user">
      <div class="word-box">
          <div class="title-box">
             <h5>所有单词</h5> 
             <div class="title">
                 <div class="e">英文</div>
                 <div class="z1">中文1</div>
                 <div class="z2">中文2</div>
                 <!-- <div class="z3">中文3</div> -->
                 <div class="type">类型</div>
                 <div class="time">时间</div>
                 <div class="icon">操作</div>
             </div>
          </div>
        <template  v-for="(word,index) in data">
          <div class="word-li">
              <div class="word-li-title">
                    <div class="word-e">{{word.english}}</div>
                    <div class="word-z1">{{word.chinese1}}</div>
                    <div class="word-z2">{{word.chinese2}}</div>
                    <!-- <div class="word-z3">{{word.chinese3}}</div> -->
                    <div class="word-type">
                        <template  v-for="type in word.type">
                            {{type}}
                        </template>
                    </div>
                    <div class="word-time">{{word.time}}</div>    
                    <div class="open-icon"  @click="openli(index)"><i class="el-icon-more"></i></div>    
              </div>
               <div class="update-word-date-none">
                <div class="update-word-date">
                        <div class="word-e"><input type="text"  v-model="e"></div>
                        <div class="word-z1"><input type="text" v-model="z1"></div>
                        <div class="word-z2"><input type="text" v-model="z2"></div>
                        <!-- <div class="word-z3"><input type="text" v-model="z3"></div> -->
                        <div class="word-type"><input type="text" v-model="type"></div>
                        <!-- <div class="word-time"></div> -->
                        <div class="icon-box">
                            <div class="word-icon" @click="deleteword(index,word.id)"><div class="icon-back"><i class="el-icon-delete"></i></div></div> 
                            <div class="word-icon" @click="updateword(index,word.id,e,z1,z2,type)"><div class="icon-back"><i class="el-icon-edit"></i></div></div>
                        </div>    
                </div>
               </div>
          </div>
        </template>
      </div>
  </div>
</template>

<script>
import connect from '../js/connector.js'
export default {
  // name: 'head',
  data(){
    return{
        username:'',
        data:[],
        e:'',
        z1:'',
        z2:'',
        z3:'',
        type:'',
        id:'',
    }
  },
  methods:{
    getusername(){//获取用户单词
        let th=this;
        connect.$on('username',function(name){
            th.username=name;
            console.log(name);
            th.$http.get(`/userword?user=${name}`).then((res)=>{
                // console.log(res.data);
                th.data=[];
                for (let index = 0; index < res.data.length; index++) {
                    let types=[]//切割单词类型
                    types=res.data[index].type.split(",");
                    let word={
                        id:res.data[index].id,
                        chinese1:res.data[index].chinese1,
                        chinese2:res.data[index].chinese2,
                        // chinese3:res.data[index].chinese3,
                        english:res.data[index].english,
                        time:res.data[index].time,
                        type:types,
                        user:res.data[index].user,
                    }
                    th.data.push(word);
                }
                // th.datas=th.data;
                console.log(th.data);
            });
        });
    },
    openli(index){// 打开li
    console.log('ok');
        let th=this;
        let numbers=index;
        // th.id='';
        th.e='';
        th.z1='';
        th.z2='';
        // th.z3='';
        th.type='';
        $(".word-box>div .update-word-date-none").eq(numbers).slideToggle("slow",function(){
            let t="";
            for(let i=0;i<th.data[numbers].type.length;i++){//数字转字符串并且加上空格
                if(i>0 && i <th.data[numbers].type.length){
                     t+=" "+th.data[numbers].type[i];
                }else{
                    t+=th.data[numbers].type[i];
                }
                // console.log(t);
            }
             th.id=th.data[numbers].id;
            th.e=th.data[numbers].english;
            th.z1=th.data[numbers].chinese1;
            th.z2=th.data[numbers].chinese2;
            // th.z3=th.data[numbers].chinese3;
            // th.type=th.data[numbers].type;
            th.type=t;
            // console.log(th.data[numbers].type);
        });//下拉
        $(".word-box>div .update-word-date-none").not($(".word-box>div .update-word-date-none").eq(numbers)).slideUp("slow");//上拉
    },
    updateword(index,id,e,z1,z2,type){//修改单词
        // console.log(index, this.data[index]);
        // console.log(index,id,e,z1,z2,type);
        // let t=type.split(",");
        let  reg=new RegExp(" ","g")//创建RegExp对象
        let  t=type.replace(reg,",")//空格换为逗号
        this.$http.get(`/updateword?id=${id}&username=${this.username}&english=${e}&chinese1=${z1}&chinese2=${z2}&type=${t}`).then((res)=>{
            // console.log(res);
            if(res.data.number==200){
                this.$notify({
                    title:"修改成功",
                    duration:1000,
                });
                // let typearr=[];
                this.data[index].english=e;
                this.data[index].chinese1=z1;
                this.data[index].chinese2=z2;
                this.data[index].type=t;
            }else if(res.data.number==404){
                this.$notify({
                    title:`修改失败${res.data.mes}`,
                    duration:1000,
                });
            }else if(res.data.number==400){
                this.$notify({
                    title:`修改失败`,
                    duration:1000,
                });
            }
        })
        // console.log(t);
    },
    deleteword(index,id){
        console.log(id);
        this.$http.get(`/deleteword?id=${id}&username=${this.username}`).then((res)=>{
            console.log(res);
            if(res.data.number==200){
                $(".word-box>div").eq(index+1).slideUp("slow");//隐藏已经删除的单词
                this.$notify({
                    title:"删除成功",
                    duration:1000,
                });
            }else if(res.data.number==404){
                this.$notify({
                    title:"删除失败",
                    duration:1000,
                });
            }
        })
    }
  },
  created(){
      this.getusername();
  }
}
</script>
<style scoped>
*{
  margin: 0;padding: 0;
  overflow: hidden;
}
html,body{
    width: 100%;
    height: 100%;
     background:#ECF0F1; 
}
.user{
    width: 100%;
    min-height: 100%;
    background: #000;
    position: relative;
    top: 60px;
    background: #ECF0F1;
    padding-top: 40px;
    padding-bottom: 100px;
}
.word-box{
    width: 90%;
    margin: 0 auto;
    height: 100%;
    background: #fff;
    border-radius: 20px;
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 30px;
     padding-bottom: 50px;
}
.title-box h5{
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 30px;
}
.title{
    height: 50px;
    line-height: 50px;
    display: flex;
    color: rgb(64, 158, 255);
    font-weight: bold;
    border-bottom: 2px solid  rgb(64, 158, 255);
    box-sizing: border-box;
}
.e,.time{
    flex: 1.5;
    text-align: center;
}
.icon-box{
    flex:2;
    display: flex;
    justify-content:flex-end;
}
.z1,.z2,.z3,.type{
    flex: 2;
    text-align: center;
}
.icon{
    flex: 0.5;
    text-align: center;
}
.word-li{
    width: 100%;
    /* height: 50px; */
    border-bottom: 1px solid  #eee;
    cursor: pointer;
}
.word-li:nth-child(2n){
    background: #f8f8f8;
}
.word-li:hover{
    background: rgba(33, 160, 239, 0.06);
}
.word-li-title{
    height: 50px;
    display: flex;
}
.update-word-date-none{
    display: none;
}
.update-word-date{
    display: flex;
    background: rgb(64, 158, 255);;
    border-top:  1px solid  #eee;
    color: #fff;
    /* display: none; */
}
.word-li-title>div,.update-word-date>div{
    height: 50px;
    line-height: 50px;
}
.update-word-date>div input{
    text-align: center;
    color: rgb(64, 158, 255);
}
.word-e,.word-time{
    flex: 1.5;
    text-align: center;
}
.word-z1,.word-z2,.word-z3,.word-type{
    flex: 2;
    text-align: center;
}
.open-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 0.5;
}
.word-time{
    font-size: 12px;
}
.word-icon{
    display: flex;
    justify-content: center;
    align-items: center;
    /* flex: 0.5; */
}
.icon-back{
    /* padding: 5px; */
    width: 30px;
    height: 30px;
    border-radius: 50%;
    /* background: #fff; */
    display: flex;
    justify-content: center;
    align-items: center;
}
.icon-back i:hover{
    color:#fff; 
}
 .icon-back i{
    color: #000;
    /* font-weight: bold; */
 }
 .open-icon i:hover{
     color: rgb(64, 158, 255);
 }
 .update-word-date div input{
     width: 90%;
     height: 30px;
     border: none;
 }
 /* .top{
     transform: rotate(180deg);
     transition: 0.5s;
 } */
</style>
