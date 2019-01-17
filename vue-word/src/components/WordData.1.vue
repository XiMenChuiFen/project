<template>
  <!--所有单词列表-->
  <el-container direction="vertical" class="user-nav-box">
      <el-main class="title-word">{{wordtitle}}<span>(共{{wordlength}}个)</span></el-main>
      <el-main class="word-boxs">
       <template v-for="(word,index) in datas">
      <el-main class="word-data-box">
        <el-card class="box-card">
            <div slot="header" class="clearfix e-title">
                <span class="English-title">{{word.english}}</span>
                <el-tooltip class="item" effect="dark" content="详情" placement="top-start">
                    <i class="el-icon-tickets word-icon icon"></i>
                </el-tooltip>
                <el-tooltip class="item" effect="dark" content="发音" placement="top-start">
                    <i class="word-icon" @click="pronunciation(word.english)">
                        <svg class="icon svg-lb" style="width: 1.0771484375em;fill: currentColor;overflow: hidden;" viewBox="0 0 1103 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="432"><path d="M567.443 82.155c-11.553-5.682-25.262-4.13-35.334 4.031-0.471 0.396-49.446 40.14-103.508 80.776-94.043 70.733-121.427 82.527-126.985 84.41h-133.25c-0.674 0-1.313 0.1-1.987 0.1H106.22c-15.157 0-27.452 12.553-27.452 28.048v447.654c0 15.494 12.295 28.048 27.452 28.048h217.188c5.457 2.015 31.326 14.24 114.758 83.716 48.538 40.405 92.124 79.884 92.561 80.28 6.232 5.65 14.181 8.624 22.198 8.624 4.614 0 9.296-0.992 13.675-3.007 11.991-5.517 19.705-17.675 19.705-31.12V112.88c0.033-13.116-7.31-25.042-18.863-30.725z m-35.67 757.18c-14.787-12.752-31.292-26.793-48.2-40.735-111.424-92.14-138.977-99.871-157.671-99.871-0.37 0-0.708 0.099-1.078 0.099-0.37 0-0.707-0.1-1.078-0.1H157.015c-19.233 0-23.68-5.55-23.68-25.273V329.901c0-13.38 1.55-21.771 17.348-21.771h151.775c18.19 0 46.146-7.632 168.011-98.781 21.726-16.255 42.946-32.575 61.304-46.913v676.899z m328.275-336.22c0-86.954-46.18-162.807-114.826-203.608-3.099-1.685-10.475-4.922-15.595-4.922-15.225 0-27.586 12.62-27.586 28.18 0 10.44 5.456 19.757 13.709 24.613 53.05 30.79 88.89 88.97 88.89 155.737 0 67.958-37.052 127.028-91.686 157.39-7.95 4.955-13.204 13.941-13.204 24.15 0 15.56 12.362 28.18 27.586 28.18 6.468 0.067 14.147-3.832 14.147-3.832 70.735-40.272 118.565-117.348 118.565-205.888z m-31.83-346.89c-5.12-3.139-10.24-5.683-16.438-5.683-15.157 0-27.452 12.555-27.452 28.049 0 11.167 6.501 20.12 15.663 25.24 100.813 60.062 168.617 171.563 168.617 299.35 0 127.69-67.703 239.124-168.415 299.218-8.825 4.89-16.437 14.173-16.437 25.637 0 15.495 12.294 28.049 27.451 28.049 6.097 0 10.947-2.379 16.236-5.517 116.98-69.709 195.664-199.116 195.664-347.387 0-148.006-78.346-277.149-194.89-346.956z" fill="" p-id="433"></path></svg>
                    </i>
                    <!-- <i class="word-icon p-icon" @click="pronunciation(word.english)"></i> -->
                </el-tooltip>
                 <el-tooltip class="item" effect="dark" content="收藏" placement="top-start">
                    <!-- <i class="el-icon-star-off word-icon icon" @click="mycollection(word.id)"></i> -->
                    <i class="el-icon-star-on word-icon icon"  :class="{icon2:word.collection=='1'}" @click="mycollection(word.id,index)"></i>
                </el-tooltip>
            </div>
            <div class="translation-box">
            <div class="Chinese translation">
                <span>{{word.chinese1}}</span>
                <span>{{word.chinese2}}</span>
                <span>{{word.chinese3}}</span>
            </div>
            <div class="type translation">
                <template v-for="typdata in word.type">
                    <el-button size="mini" round class="type-buttom">{{typdata}}</el-button>
                </template>
            </div>
            <div class="allwrodtime">{{word.time}}</div>
            </div>
        </el-card>
      </el-main> 
       </template>
         <el-alert title="没有数据" type="warning"  center show-icon class="datames" v-show="isdatames"></el-alert>
       </el-main>
  </el-container> 
  
</template>

<script>
import connect from '../js/connector.js'
export default {
//   name: 'app',
    data(){
        return{
            data:[],//单词原始数据
           datas:[],//单词分类数据
           wordtitle:'全部单词',
           wordlength:'',//单词数量
           url:'',//发音链接
           audio:'',//音频
           isaudio:true,//开关
           username:'',//用户名
           isdatames:false,
        }
    },
    components:{
        // usernavVue:usernav
    },
    methods:{
        getusername(){//获取用户名
            let th=this;
            connect.$on('username', function(username){
                // console.log(id,username);
                th.username=username;
            });
        },
        getword(){//获取所有的单词数据
            let th=this;
            let allword;//存全部单词数据
            let wordColle=[];//单词收藏数据
            //  console.log('1');
            // connect.$on('username', function(username){
                this.$http.get('/getword').then((res)=>{//获取全部单词
                    allword=res;
                    th.wordlength=res.data.length;
                    console.log(allword);
                    if(res.data.mes=="没有数据"){
                        th.isdatames=true;
                    }
                    th.$http.get(`/getmycollection?${this.username}`).then((res)=>{//获取已收藏单词
                        // wordColle=[];
                        for(let i=0; i<res.data.length; i++){
                           wordColle.push(res.data[i].wordid);
                        }
                        console.log(res.data,'已收藏单词');
                        let word=[];
                        let types=[]//切割单词类型
                        for (let index = 0; index < allword.data.length; index++) {
                            types=allword.data[index].type.split(",");
                            if(wordColle.indexOf(allword.data[index].id) >= 0 ){//改变数据结构并且为已经收藏的单词加识别
                                word={
                                    id:allword.data[index].id,
                                    chinese1:allword.data[index].chinese1,
                                    chinese2:allword.data[index].chinese2,
                                    chinese3:allword.data[index].chinese3,
                                    english:allword.data[index].english,
                                    time:allword.data[index].time,
                                    type:types,
                                    collection:'1',
                                    user:allword.data[index].user,
                                }
                            }else{
                                word={
                                    id:allword.data[index].id,
                                    chinese1:allword.data[index].chinese1,
                                    chinese2:allword.data[index].chinese2,
                                    chinese3:allword.data[index].chinese3,
                                    english:allword.data[index].english,
                                    time:allword.data[index].time,
                                    type:types,
                                    collection:'0',
                                    user:allword.data[index].user,
                                }
                            }
                            th.data.push(word);
                        }
                        // console.log(wordColle.join(","));
                        th.datas=th.data;
                        console.log(th.datas,'全部单词');
                        connect.$emit('getword',th.datas);
                    });
                });
            // });
        },
        getuserword(){//取筛单词后输出
            let th=this;
            connect.$on('userworddata',function(worddata,username){
                if(worddata.length==0){
                    th.isdatames=true;
                }else{
                    th.isdatames=false;
                }
                th.datas=worddata;//按用户筛选
                console.log(worddata,username);
                th.wordtitle=username;
                th.wordlength=worddata.length;
                
            });
            connect.$on('letterworddata',function(worddata,e){
                if(worddata.length==0){
                    th.isdatames=true;
                }else{
                    th.isdatames=false;
                }
                th.datas=worddata;//按首字母筛选
                th.wordtitle=`${e}`;
                th.wordlength=worddata.length;
                
            })
        },
        updateword(){//添加单词后更新列表
            let th=this;
            connect.$on('updateword',function(number){
                if(number==200){
                    th.data=[];
                    th.datas=[];
                    th. getword();
                    th.isdatames=false;
                }  
            })
        },
        pronunciation(e){//发音
            let th=this;
            if(this.isaudio==true){
                this.isaudio=false;
                this.url=`http://fanyi.baidu.com/gettts?lan=en&text=${e}&spd=3&source=web`;
                let audio =document.createElement('audio');//生成audio
                this.audio=audio;
                this.audio.src = this.url;//赋值src
                this.$notify({
                    title:"开始播放读音",
                    duration:1000,
                });
                this.audio.play();
                // console.log(this.isaudio);
            }
            this.audio.onended = function() {//读音播放完
                th.isaudio=true;
                th.$notify({
                    title:"读音播放结束",
                    duration:1000,
                });
                // console.log(th.isaudio);

            }
            this.audio.onerror = function() {//读音无法播放
                th.$notify({
                    title:"读音播放错误",
                    duration:1000,
                });
            }
        },
        mycollection(id,index){//我的收藏
            // console.log(id,this.username);
            this.$http.get(`/mycollection?wordid=${id}&username=${this.username}`).then((res)=>{
                // console.log(this.username);
                if(res.data.number==200){
                    this.$notify({
                    title:res.data.mes,
                    duration:1000,
                    });
                    if(this.wordtitle!=="全部单词"){
                        for(let i=0;i<this.data.length;i++){
                            if(this.data[i].id==id){
                                this.data[i].collection='1';
                            }
                            // console.log('1');
                        }
                        for(let i=0;i<this.datas.length;i++){
                            if(this.datas[i].id==id){
                                this.datas[i].collection='1';
                            }
                            console.log('1');
                        }
                        console.log(this.data);
                        // connect.$emit('getword',data);
                    }else{
                    let data=[];
                    let word;
                    for(let i=0;i<this.datas.length;i++){
                        if(this.datas[i].id==id){
                            word={
                                id:this.datas[i].id,
                                chinese1:this.datas[i].chinese1,
                                chinese2:this.datas[i].chinese2,
                                chinese3:this.datas[i].chinese3,
                                english:this.datas[i].english,
                                time:this.datas[i].time,
                                type:this.datas[i].type,
                                collection:'1',
                                user:this.datas[i].user,
                            }
                        }else{
                            word={
                                id:this.datas[i].id,
                                chinese1:this.datas[i].chinese1,
                                chinese2:this.datas[i].chinese2,
                                chinese3:this.datas[i].chinese3,
                                english:this.datas[i].english,
                                time:this.datas[i].time,
                                type:this.datas[i].type,
                                collection:this.datas[i].collection,
                                user:this.datas[i].user,
                            }
                        }
                        data.push(word);
                        // this.data=data;
                    }
                    this.datas=data;
                    console.log(data);
                    connect.$emit('getword',data);
                    }
                }else if(res.data.number==404){
                    this.$notify({
                        title:res.data.mes,
                        duration:1000,
                    });

                    if(this.wordtitle!=="全部单词"){
                        for(let i=0;i<this.datas.length;i++){
                            if(this.datas[i].id==id){
                                this.datas[i].collection='0';
                            }
                        }
                        for(let i=0;i<this.data.length;i++){
                            if(this.data[i].id==id){
                                this.data[i].collection='1';
                            }
                            console.log('0');
                        }
                        //取消收藏标识
                        let data=[];
                        let word;
                        for(let i=0;i<this.data.length;i++){
                            if(this.data[i].id==id){
                                word={
                                    id:this.data[i].id,
                                    chinese1:this.data[i].chinese1,
                                    chinese2:this.data[i].chinese2,
                                    chinese3:this.data[i].chinese3,
                                    english:this.data[i].english,
                                    time:this.data[i].time,
                                    type:this.data[i].type,
                                    collection:'0',
                                    user:this.data[i].user,
                                }
                            }else{
                                word={
                                    id:this.data[i].id,
                                    chinese1:this.data[i].chinese1,
                                    chinese2:this.data[i].chinese2,
                                    chinese3:this.data[i].chinese3,
                                    english:this.data[i].english,
                                    time:this.data[i].time,
                                    type:this.data[i].type,
                                    collection:this.data[i].collection,
                                    user:this.data[i].user,
                                }
                            }
                            data.push(word);
                            // this.data=data;
                        }
                        // this.datas=data;
                        console.log(this.data);
                        connect.$emit('getword',data);
                    }else{
                        let data=[];
                        let word;
                        for(let i=0;i<this.datas.length;i++){
                            if(this.datas[i].id==id){
                                word={
                                    id:this.datas[i].id,
                                    chinese1:this.datas[i].chinese1,
                                    chinese2:this.datas[i].chinese2,
                                    chinese3:this.datas[i].chinese3,
                                    english:this.datas[i].english,
                                    time:this.datas[i].time,
                                    type:this.datas[i].type,
                                    collection:'0',
                                    user:this.datas[i].user,
                                }
                            }else{
                                word={
                                    id:this.datas[i].id,
                                    chinese1:this.datas[i].chinese1,
                                    chinese2:this.datas[i].chinese2,
                                    chinese3:this.datas[i].chinese3,
                                    english:this.datas[i].english,
                                    time:this.datas[i].time,
                                    type:this.datas[i].type,
                                    collection:this.datas[i].collection,
                                    user:this.datas[i].user,
                                }
                            }
                            data.push(word);
                            // this.data=data;
                        }
                        this.datas=data;
                        console.log(data);
                        connect.$emit('getword',data);
                    }
                }
            })
        }
    },
    created(){
        this.getword();
        this.getuserword();
        this.updateword();
        this.getusername();
    }
}
</script>
<style scoped>
*{
  margin: 0;padding: 0;
  overflow: hidden;
}
.e-title{
    min-width: 165px;
}
.user-nav-box{
    /* margin-top: 60px; */
    margin-top: 97px;
    padding-top: 20px;
    overflow: auto;
}
.title-word{
    font-size: 18px;
    font-weight: bold;
    padding: 0px 80px;
}
.title-word span{
    font-size: 12px;
    font-weight: bold;
    color: #409EFF;
    margin-left: 5px;
}
.word-boxs{
    display: flex;
    flex-wrap: wrap;
   /* justify-content:space-between; */
   /* justify-content:content; */
   justify-content: space-between;
   /* padding:0px 0px 50px 80px; */
   padding:0px 80px 50px 80px; ;
}
.word-data-box{
    flex:none;
    /* width: 300px; */
    margin-top: 30px;
    min-width: 210px;
    box-shadow:0px 2px 5px #00000021;
}
.word-data-box:hover{
     box-shadow:0px 0px 9px #409eff59;
}
.word-icon{
    /* font-size: 18px; */
    font-size: 20px;
    float: right; 
    margin-left: 10px;
}
.type span{
    padding: 4px;
    background: #409EFF;
    border-radius:5px;
}
.translation span:nth-child(2n){
    margin: 0px 5px; 
}
.type{
    font-size: 14px;
    color: #fff;
}
.type-buttom{
    margin-top: 15px;
    color: #409EFF;
    border-color: #c6e2ff;
    box-sizing: border-box;
    background: #c6e2ff;
    margin-left: 10px;
}
.allwrodtime{
    margin-top: 15px;
    text-align:right;
    font-size: 12px;
    transform: scale(0.9);
    float:right;
}
.icon{
    cursor: pointer;
}
.icon2{
    color:#409EFF; 
}

.icon:hover{
    color:#409EFF; 
}
.icon2:hover{
     color:#000; 
}
.svg-lb{
    /* color: red; */
}
.datames{
    height: 50px;
    margin-top: 30px;
    transition: 0s;
}

@media screen and (max-width:900px) {
    .user-nav-box{
        justify-content: center;
         padding: 20px 10px 0px 10px;
    }
    .word-data-box{
        width: 100%;
    }
    .word-boxs{
        padding: 0px 0px 50px 20px;
    }
}

@media screen and (max-width:1005px) {
    .word-boxs{
        box-sizing: border-box;
        padding: 0px 0px 50px 20px;
    }
}
</style>
