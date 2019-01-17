<template>
  <!--翻译-->
  <el-container direction="horizontal" class="translate">
      <el-main class="translate-box">
        <el-main class="translate-type">
            <el-form>
                <el-select v-model="label1" placeholder="请选择语言">
                  <el-option label="自动检测" value="auto" class="label-box"></el-option>                  
                  <el-option label="中文" value="zh-CHS" class="label-box"></el-option>
                  <el-option label="英文" value="EN" class="label-box"></el-option>
                  <el-option label="日文" value="ja" class="label-box"></el-option>
                  <el-option label="韩文" value="ko" class="label-box"></el-option>
                  <el-option label="法文" value="fr" class="label-box"></el-option>
                  <el-option label="俄文" value="ru" class="label-box"></el-option>
                  <el-option label="葡萄牙文" value="pt" class="label-box"></el-option>
                  <el-option label="西班牙文" value="es" class="label-box"></el-option>
                </el-select>
                <i class="el-icon-sort translate-icon"></i>
                <el-select v-model="label2" placeholder="请选择语言">
                  <el-option label="中文" value="zh-CHS" class="label-box"></el-option>
                  <el-option label="英文" value="EN" class="label-box"></el-option>
                  <el-option label="日文" value="ja" class="label-box"></el-option>
                  <el-option label="韩文" value="ko" class="label-box"></el-option>
                  <el-option label="法文" value="fr" class="label-box"></el-option>
                  <el-option label="俄文" value="ru" class="label-box"></el-option>
                  <el-option label="葡萄牙文" value="pt" class="label-box"></el-option>
                  <el-option label="西班牙文" value="es" class="label-box"></el-option>
                </el-select>
                <el-button type="primary" class="translate-button" @click="fy()">翻译</el-button>
            </el-form>
        </el-main>
        <el-main class="translate-text">
          <el-main class="text-box-1 text-box">
            <el-input type="textarea"  placeholder="请输入内容" v-model="textarea" class="textarea" resize="none" :input="gettext()">
            </el-input>
            <div class="translate-text-icon">
                <div class="translate-text-icon-box">
                <el-tooltip class="item" effect="dark" content="发音" placement="top-start" v-show="icon">
                    <i class="word-icon" @click="pronunciation(textarea)">
                        <svg class="icon svg-lb" style="width: 1.0771484375em;fill: currentColor;overflow: hidden;" viewBox="0 0 1103 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="432"><path d="M567.443 82.155c-11.553-5.682-25.262-4.13-35.334 4.031-0.471 0.396-49.446 40.14-103.508 80.776-94.043 70.733-121.427 82.527-126.985 84.41h-133.25c-0.674 0-1.313 0.1-1.987 0.1H106.22c-15.157 0-27.452 12.553-27.452 28.048v447.654c0 15.494 12.295 28.048 27.452 28.048h217.188c5.457 2.015 31.326 14.24 114.758 83.716 48.538 40.405 92.124 79.884 92.561 80.28 6.232 5.65 14.181 8.624 22.198 8.624 4.614 0 9.296-0.992 13.675-3.007 11.991-5.517 19.705-17.675 19.705-31.12V112.88c0.033-13.116-7.31-25.042-18.863-30.725z m-35.67 757.18c-14.787-12.752-31.292-26.793-48.2-40.735-111.424-92.14-138.977-99.871-157.671-99.871-0.37 0-0.708 0.099-1.078 0.099-0.37 0-0.707-0.1-1.078-0.1H157.015c-19.233 0-23.68-5.55-23.68-25.273V329.901c0-13.38 1.55-21.771 17.348-21.771h151.775c18.19 0 46.146-7.632 168.011-98.781 21.726-16.255 42.946-32.575 61.304-46.913v676.899z m328.275-336.22c0-86.954-46.18-162.807-114.826-203.608-3.099-1.685-10.475-4.922-15.595-4.922-15.225 0-27.586 12.62-27.586 28.18 0 10.44 5.456 19.757 13.709 24.613 53.05 30.79 88.89 88.97 88.89 155.737 0 67.958-37.052 127.028-91.686 157.39-7.95 4.955-13.204 13.941-13.204 24.15 0 15.56 12.362 28.18 27.586 28.18 6.468 0.067 14.147-3.832 14.147-3.832 70.735-40.272 118.565-117.348 118.565-205.888z m-31.83-346.89c-5.12-3.139-10.24-5.683-16.438-5.683-15.157 0-27.452 12.555-27.452 28.049 0 11.167 6.501 20.12 15.663 25.24 100.813 60.062 168.617 171.563 168.617 299.35 0 127.69-67.703 239.124-168.415 299.218-8.825 4.89-16.437 14.173-16.437 25.637 0 15.495 12.294 28.049 27.451 28.049 6.097 0 10.947-2.379 16.236-5.517 116.98-69.709 195.664-199.116 195.664-347.387 0-148.006-78.346-277.149-194.89-346.956z" fill="" p-id="433"></path></svg>
                    </i>
                    <!-- <i class="word-icon p-icon" @click="pronunciation(word.english)"></i> -->
                </el-tooltip>
                <!-- <el-tooltip class="item" effect="dark" content="收藏" placement="top-start" v-show="icon">
                  <i class="el-icon-star-on word-icon icon" v-show="icon" @click="taddword()">
                </i> -->
                 </el-tooltip>
                </div>
                <div class="text-leght">
                  <span>{{textleght}}</span>/50
                </div>
            </div>
          </el-main>
          <el-main class="text-box-2 text-box">
            <div class="result-box">
              <div>{{Translatetext}}</div>
            </div>
            <div class="translate-text-icon">
                <el-tooltip class="item" effect="dark" content="发音" placement="top-start" v-show="icon">
                    <i class="word-icon" @click="pronunciation(Translatetext)">
                        <svg class="icon svg-lb" style="width: 1.0771484375em;fill: currentColor;overflow: hidden;" viewBox="0 0 1103 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="432"><path d="M567.443 82.155c-11.553-5.682-25.262-4.13-35.334 4.031-0.471 0.396-49.446 40.14-103.508 80.776-94.043 70.733-121.427 82.527-126.985 84.41h-133.25c-0.674 0-1.313 0.1-1.987 0.1H106.22c-15.157 0-27.452 12.553-27.452 28.048v447.654c0 15.494 12.295 28.048 27.452 28.048h217.188c5.457 2.015 31.326 14.24 114.758 83.716 48.538 40.405 92.124 79.884 92.561 80.28 6.232 5.65 14.181 8.624 22.198 8.624 4.614 0 9.296-0.992 13.675-3.007 11.991-5.517 19.705-17.675 19.705-31.12V112.88c0.033-13.116-7.31-25.042-18.863-30.725z m-35.67 757.18c-14.787-12.752-31.292-26.793-48.2-40.735-111.424-92.14-138.977-99.871-157.671-99.871-0.37 0-0.708 0.099-1.078 0.099-0.37 0-0.707-0.1-1.078-0.1H157.015c-19.233 0-23.68-5.55-23.68-25.273V329.901c0-13.38 1.55-21.771 17.348-21.771h151.775c18.19 0 46.146-7.632 168.011-98.781 21.726-16.255 42.946-32.575 61.304-46.913v676.899z m328.275-336.22c0-86.954-46.18-162.807-114.826-203.608-3.099-1.685-10.475-4.922-15.595-4.922-15.225 0-27.586 12.62-27.586 28.18 0 10.44 5.456 19.757 13.709 24.613 53.05 30.79 88.89 88.97 88.89 155.737 0 67.958-37.052 127.028-91.686 157.39-7.95 4.955-13.204 13.941-13.204 24.15 0 15.56 12.362 28.18 27.586 28.18 6.468 0.067 14.147-3.832 14.147-3.832 70.735-40.272 118.565-117.348 118.565-205.888z m-31.83-346.89c-5.12-3.139-10.24-5.683-16.438-5.683-15.157 0-27.452 12.555-27.452 28.049 0 11.167 6.501 20.12 15.663 25.24 100.813 60.062 168.617 171.563 168.617 299.35 0 127.69-67.703 239.124-168.415 299.218-8.825 4.89-16.437 14.173-16.437 25.637 0 15.495 12.294 28.049 27.451 28.049 6.097 0 10.947-2.379 16.236-5.517 116.98-69.709 195.664-199.116 195.664-347.387 0-148.006-78.346-277.149-194.89-346.956z" fill="" p-id="433"></path></svg>
                    </i>
                    <!-- <i class="word-icon p-icon" @click="pronunciation(word.english)"></i> -->
                </el-tooltip>
            </div> 
          </el-main>
        </el-main>
        <el-main class="translation-results-box" v-show="istranslation">
          <el-main>
            <div class="translation-results-text">{{textar}}</div>
            <div class="translation-results">
              <template v-for="translationE in translatione">
                  <span>{{translationE}}</span>
              </template>
              <!-- <span>译文</span>
              <span>译文</span>
              <span>译文</span>
              <span>译文</span> -->
            </div>
          </el-main>
        </el-main>
        <el-main class="webphrase-box" v-show="isweb">
          <div class="webphrase">
            <div class="webphrase-nav">
              <div>网络短语</div>
              <!-- <div>网络短语</div>
              <div>网络短语</div> -->
            </div>
          </div>
          <template v-for="webtext in webtranslation">
          <div class="webphrase-tetx">
            <div class="webphrase-tetx-e">
              <span>{{webtext.key}}</span>
              <!-- <el-tooltip class="item" effect="dark" content="发音" placement="top-start"> -->
                    <i class="word-icon" @click="pronunciation(webtext.key)">
                        <svg class="icon svg-lb webphrase-svg-lb" style="width: 1.0771484375em;fill: currentColor;overflow: hidden;" viewBox="0 0 1103 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="432"><path d="M567.443 82.155c-11.553-5.682-25.262-4.13-35.334 4.031-0.471 0.396-49.446 40.14-103.508 80.776-94.043 70.733-121.427 82.527-126.985 84.41h-133.25c-0.674 0-1.313 0.1-1.987 0.1H106.22c-15.157 0-27.452 12.553-27.452 28.048v447.654c0 15.494 12.295 28.048 27.452 28.048h217.188c5.457 2.015 31.326 14.24 114.758 83.716 48.538 40.405 92.124 79.884 92.561 80.28 6.232 5.65 14.181 8.624 22.198 8.624 4.614 0 9.296-0.992 13.675-3.007 11.991-5.517 19.705-17.675 19.705-31.12V112.88c0.033-13.116-7.31-25.042-18.863-30.725z m-35.67 757.18c-14.787-12.752-31.292-26.793-48.2-40.735-111.424-92.14-138.977-99.871-157.671-99.871-0.37 0-0.708 0.099-1.078 0.099-0.37 0-0.707-0.1-1.078-0.1H157.015c-19.233 0-23.68-5.55-23.68-25.273V329.901c0-13.38 1.55-21.771 17.348-21.771h151.775c18.19 0 46.146-7.632 168.011-98.781 21.726-16.255 42.946-32.575 61.304-46.913v676.899z m328.275-336.22c0-86.954-46.18-162.807-114.826-203.608-3.099-1.685-10.475-4.922-15.595-4.922-15.225 0-27.586 12.62-27.586 28.18 0 10.44 5.456 19.757 13.709 24.613 53.05 30.79 88.89 88.97 88.89 155.737 0 67.958-37.052 127.028-91.686 157.39-7.95 4.955-13.204 13.941-13.204 24.15 0 15.56 12.362 28.18 27.586 28.18 6.468 0.067 14.147-3.832 14.147-3.832 70.735-40.272 118.565-117.348 118.565-205.888z m-31.83-346.89c-5.12-3.139-10.24-5.683-16.438-5.683-15.157 0-27.452 12.555-27.452 28.049 0 11.167 6.501 20.12 15.663 25.24 100.813 60.062 168.617 171.563 168.617 299.35 0 127.69-67.703 239.124-168.415 299.218-8.825 4.89-16.437 14.173-16.437 25.637 0 15.495 12.294 28.049 27.451 28.049 6.097 0 10.947-2.379 16.236-5.517 116.98-69.709 195.664-199.116 195.664-347.387 0-148.006-78.346-277.149-194.89-346.956z" fill="" p-id="433"></path></svg>
                    </i>
              <!-- </el-tooltip> -->
            </div>
            <div class="webphrase-tetx-z">
              <template v-for="webtexte in webtext.value">
              <span>{{webtexte}}；</span>
              </template>
              <!-- <span>短语中文</span>
              <span>短语中文</span>
              <span>短语中文</span>
              <span>短语中文</span> -->
            </div>
          </div>
          </template>
        </el-main>
      </el-main>
  </el-container> 
</template>

<script>
import md5 from 'js-md5'
import connect from '../js/connector.js'
export default {
  // name: 'head',
  data(){
    return{
      isfy:false,//开关
      istranslation:false,//最佳翻译模块
      icon:false,
      isweb:false,//网络短语
      isaudio:true,
      worde:'',//点击单词表里在线翻译的英文单词
      datas:'',//存api返回的数据
      label1: 'auto',//下拉表1需要翻译的语言
      label2: 'zh-CHS',//下拉表2翻译的语言
      textarea:'',//文本域
      textar:'',//原需要翻译文本
      Translatetext:'',//最佳翻译//
      textleght:'0',//文本域的字符数
      translatione:'',//所有译文
      webtranslation:'',//网络短语
      username:'',//用户名
    }
  },
  methods:{
    fy(){
      //api必要参数
      // console.log(this.textarea);
        if(this.textarea!=undefined && this.textarea.length<=50){
        let appKey="6c204df226fc74a0";
        let key="pPZMYm95Rtj6DIAKOzZX7HOVlCopvgfS";
        let rundan=Math.floor(Math.random()*100);
        let sign=md5(appKey+this.textarea+rundan+key);
        this.$http.get(`/Translate?q=${this.textarea}&from=${this.label1}&to=${this.label2}&appKey=${appKey}&salt=${rundan}&sign=${sign}`).then((res)=>{
            this.datas=res.data;
            console.log(this.datas);
            if(this.datas.errorCode==0){
                this.translatione="";//重置数据
                this.webtranslation="";
                this.icon=true;//显示发音收藏icon
                this.textarea=this.datas.query;//输入的文本域
                this.Translatetext=this.datas.translation[0];//最佳翻译//
                this.textar=this.datas.query//原需要翻译的文本
                if(this.datas.basic!=undefined){//只有译为英文或中文才有的对象
                  this.istranslation=true;
                  this.translatione=this.datas.basic.explains;//所有译文
                }else{
                    this.istranslation=false;
                }
                if(this.datas.web!=undefined){
                  this.isweb=true;
                  this.webtranslation=this.datas.web;//网络短语
                }else{
                  this.isweb=false;
                }
            }
        })
        }else{
          this.$notify({
              title:"输入内容错误",
              duration:1000,
          });
        }
    },
    getworde(){
      this.worde=this.$route.params.en;
      this.textarea=this.worde;
      if(this.$route.params.en){//判断是否从icon进来页面
        this.fy();
      } 
      let th=this;
      connect.$on('username',function(username){
        //  console.log(username);
        th.username=username;
       })//获取用户名
    },
    gettext(){//检测是否输入文本
      console.log(this.textarea);
      if(this.textarea!=undefined && this.textarea.length<=50){
         this.textleght=this.textarea.length;
      }//else{
        // this.$notify({
        //       title:"字符超长",
        //       duration:1000,
        // });
      // }
      if(this.textarea==""){//文本域没有字符时
         this.isweb=false;
         this.istranslation=false;
         this.Translatetext="";
      }
    },
    taddword(){//添加
      // console.log(this.username);
      // let en="my";
      // let zh="我的";
      // let re="/^[/u4E00-/u9FA5]+$/";
      // // console.log(this.textarea,this.Translatetext);
      //    this.$http.get('/taddword?english='+en+'&chinese1='+zh+'&user='+this.username).then((res)=>{
      //           this.$notify({
      //               title:res.data.mes,
      //               duration:1500,
      //           });
      //           if(res.data.number==200){
      //           }
      //       });
    },
    pronunciation(e){//发音
      let th=this;
      // console.log(e);
      if(this.isaudio==true){
          this.isaudio=false;
          this.url=`http://fanyi.baidu.com/gettts?lan=zh&text=${e}&spd=5&source=web`;
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
  },
  created(){
    // this.fy();
    this.getworde();
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
}
.translate{
  padding-top: 100px;
  width: 100%;
  min-height: 100%;
  justify-content: center;
  background: #f9f9f9;
  /* height: 100px; */
  /* background: #000; */
}
.translate-box{
  flex:0.7;
  /* background: #ccc; */
}
.translate-type{
  height: 40px;
  margin-bottom: 30px;
}
.translate-text{
  display: flex;
}
.translate-icon{
  margin: 0px 10px 0px 10px;
  transform: rotate(90deg);
  font-size: 20px;
  font-weight: bold;
  color: #409EFF;
  line-height: 40px;
}
.label-box{
  text-indent: 20px;
}
.translate-button{
  height: 40px;
  width: 80px;
  position: relative;
  top: -15px;
  margin-left: 30px;
}
.text-box{
  height: 200px;
  width: 100%;
  /* border: 1px solid red; */
  position: relative;
  border-radius: 4px;
}
.textarea{
  display: flex;
  height: 100%;
  width: 100%;
  font-size: 18px;
}
.result-box{
  height: 100%;
  width: 100%;
  border: 1px solid #eee;
  border-left: 0;
  background-color: #f0f0f0;
}
.result-box div{
  padding: 10px 20px 0px 20px;
  font-size: 18px;
}
.translate-text-icon{
  width: 100%;
  height: 30px;
  position: absolute;
  bottom: 0px;
  padding-left: 15px;
  padding-right: 20px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.translate-text-icon-box{
  /* width: 100%; */
  height: 29px;
  background: #fff;
}
.text-leght{
  font-size: 12px;
  line-height: 26PX;
  color: #909399;
}
.text-leght span{
  color: #409EFF;
}
.svg-lb{
  font-size: 20px;
  margin-right: 10px;
  cursor: pointer;
}
.word-icon{
  font-size: 20px;
  cursor: pointer;
}
.translation-results-box{
  margin-top: 30px;
  width: 50%;
  padding: 20px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
}
.translation-results-text{
  /* margin-bottom: 5px; */
  color: #409EFF;
}
.translation-results{
  display: flex;
  flex-wrap: wrap;
  padding: 0px 10px 0px 10px;
  /* line-height: 27px; */
  margin-top: -5px;
}
.translation-results span{
  display: block;
  /* padding: 10px; */
  /* padding: 10px 0px 0px 10px; */
  padding: 10px 20px 0px 0px;
  font-size: 13px;
}
.webphrase-box{
  width: 50%;
  margin-top: 30px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  padding-bottom: 20px;
}
.webphrase{
  line-height: 50px;
  background: #fff;
  /* box-sizing: border-box; */
  position: relative;
  margin-bottom: 20px;
}
.webphrase-nav{
  display: flex;
  margin: 20px 0px 0px 0px;
}
.webphrase-nav div{
  /* padding: 0px 20px 0px 20px; */
  margin: 0px 20px 0px 20px;
  box-sizing: border-box;
  border-bottom: 2px solid #409EFF;
}
.webphrase-tetx{
  /* margin-top: 20px; */
  padding: 0px 20px 10px 20px;
}
.webphrase-tetx-e{
  /* margin-bottom: 5px; */
}
.webphrase-tetx-e span{
  font-size: 13px;
}
.webphrase-tetx-z{
  font-size: 12px;
  color: #909399;
  display: flex;
  flex-wrap: wrap;
  padding-left: 10px;
}
.webphrase-tetx-z span{
  display: block;
  margin: 5px 0px 0px 0px;
}
.webphrase-svg-lb{
  position: relative;
  top: 3.5px;
  font-size:18px;
}
</style>
