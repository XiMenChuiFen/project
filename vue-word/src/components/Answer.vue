<template>
  <!--答题-->
  <el-container direction="horizontal" class="hade-box">
    <el-main class="answer-box">
      <el-main class="nav-box">
        <el-tabs tab-position="left" class="nav-box-nav" v-model="activeName">
          <el-tab-pane label="" disabled></el-tab-pane>
          <el-tab-pane label=""  disabled></el-tab-pane>
          <el-tab-pane label=""  disabled></el-tab-pane>
          <el-tab-pane label=""  disabled></el-tab-pane>
          <el-tab-pane label="练习总结" name="练习总结">
            <div class="week-box">
            <!-- <div class="answer-title">练习总结</div> -->
            <div class="week">
              <div class="week-title">每日签到</div>
              <div class="week-icon">
                <template v-for="wk in week">
                <div>
                  <div class="w-i" :class="{weekicons:wk.type=='ok'}"><i class="el-icon-check"></i></div>
                  <div class="week-number">{{wk.wk}}</div>
                </div>
                </template>
              </div>
            </div>
            <div class="week-analysis">
                <div class="primary-box">
                    <div>
                    <div class="all-word-primary-title">答题准确率</div>
                    <el-progress type="circle" :percentage="aAccuracy" class="all-word-primary"></el-progress>
                    </div>
                </div>
                <div class="day-word">
                  <div class="day-box">
                    <div class="day-box-icon"><i class="el-icon-date"></i></div>
                    <div class="day-box-icon-title">
                      <div class="day-box-icon-text text1"><span>{{days}}</span></div>
                      <div class="day-box-icon-text text2"><span>总签到数</span></div>
                    </div>
                  </div>
                  <div class="day-box">
                    <div class="day-box-icon"><i class="el-icon-tickets"></i></div>
                    <div class="day-box-icon-title">
                      <div class="day-box-icon-text text1"><span>{{allanumber}}</span></div>
                      <div class="day-box-icon-text text2"><span>历史答对单词个数</span></div>
                    </div>
                  </div>
                </div>
            </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="答题练习">
            <div class="answer-box-play" v-show="isAnswerBox">
                <div class="answer-boxs-play">
                  <!-- <div class="answer-box-play-title">答题练习</div> -->
                  <div class="answer-box-play-title-box">
                    <div class="week-title-box">参数设置</div>
                    <div class="answer-content-box content-box">
                      <div class="answer-form">
                        <el-form ref="form">
                          <el-form-item label="单词表">
                            <el-select v-model="optionsValue" placeholder="请选择">
                              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" class="label-box">
                              </el-option>
                            </el-select>
                          </el-form-item>
                          <el-form-item label="分钟计时">
                            <!-- <el-input-number v-model="times" :min="1" :max="10" label="答题时间"></el-input-number> -->
                            <el-time-select v-model="times" :picker-options="{start: '00:05',step: '00:01',end: '00:30'}" placeholder="选择时间">
                            </el-time-select>
                          </el-form-item>
                          <el-form-item label="题目数量">
                            <div class="block">
                              <el-slider v-model="numbers" :step="10" :min="10" :max="50" show-stops class="block-box">
                              </el-slider>
                            </div>
                          </el-form-item>
                          <el-form-item label="自动发音">
                            <div class="block">
                               <el-switch v-model="islb" active-text="开闭" inactive-text="关启"></el-switch>
                            </div>
                          </el-form-item>
                          <!-- <el-form-item label="答题模式">
                            <el-switch v-model="isswitch" active-text="挑战" inactive-text="单机"></el-switch>
                          </el-form-item> -->
                          <!-- <el-form-item label="选择人员" v-show="isswitch"> -->
                              <div  v-show="isswitch">
                              <el-transfer v-model="yDataValue" :data="yData" class="switch" :titles="['可选', '已选']"></el-transfer>
                              </div>
                          <!-- </el-form-item> -->
                          <div class="answer-button-box"><el-button type="primary" class="answer-button" @click="ready()">确认</el-button></div>
                        </el-form>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="answer-box-play fill-answer" v-show="isfillAnswerBox"><!--填答案页-->
                <div>
                <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" :show-close="false">
                  <div>1.在答题过程中退出或取消答题,活跃日不增加</div>
                  <div>2.答题未在设定的时间里完成,会自动终止</div>
                  <div>3.每答对一题历史答对单词数也会加一</div>
                  <div>4.完成答题后增加一天活跃日</div>
                  <!-- <div>5.规定时间或中途退出,活跃日不变</div> -->
                  <!-- <div>以上几点都会自动提交你填的答案</div> -->
                  <span slot="footer" class="dialog-footer">
                    <el-button type="primary" @click="start()" class="dialog-button">开始</el-button>
                    <!-- <el-button type="primary" @click="dialogVisible = false" class="dialog-button">确 定</el-button> -->
                  </span>
                </el-dialog>
                </div>
                <div class="answer-boxs-play">
                  <!-- <div class="answer-box-play-title">答题练习</div> -->
                  <div class="answer-box-play-title-box">
                    <div class="week-title-box answer-title-box"><!--开始练习-->
                      <div>题目数量<span>({{pnumber+1}}/{{problemnumber}})</span></div>
                      <div>{{time}}</div>
                    </div>
                    <div class="lb-icon-box" v-show="isanswers">
                      <i @click="pronunciation(problem)">
                        <svg data-v-b46e2438="" viewBox="0 0 1103 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="432" class="icon svg-lb" style="width: 1.07715em; fill: currentcolor; overflow: hidden;"><path data-v-b46e2438="" d="M567.443 82.155c-11.553-5.682-25.262-4.13-35.334 4.031-0.471 0.396-49.446 40.14-103.508 80.776-94.043 70.733-121.427 82.527-126.985 84.41h-133.25c-0.674 0-1.313 0.1-1.987 0.1H106.22c-15.157 0-27.452 12.553-27.452 28.048v447.654c0 15.494 12.295 28.048 27.452 28.048h217.188c5.457 2.015 31.326 14.24 114.758 83.716 48.538 40.405 92.124 79.884 92.561 80.28 6.232 5.65 14.181 8.624 22.198 8.624 4.614 0 9.296-0.992 13.675-3.007 11.991-5.517 19.705-17.675 19.705-31.12V112.88c0.033-13.116-7.31-25.042-18.863-30.725z m-35.67 757.18c-14.787-12.752-31.292-26.793-48.2-40.735-111.424-92.14-138.977-99.871-157.671-99.871-0.37 0-0.708 0.099-1.078 0.099-0.37 0-0.707-0.1-1.078-0.1H157.015c-19.233 0-23.68-5.55-23.68-25.273V329.901c0-13.38 1.55-21.771 17.348-21.771h151.775c18.19 0 46.146-7.632 168.011-98.781 21.726-16.255 42.946-32.575 61.304-46.913v676.899z m328.275-336.22c0-86.954-46.18-162.807-114.826-203.608-3.099-1.685-10.475-4.922-15.595-4.922-15.225 0-27.586 12.62-27.586 28.18 0 10.44 5.456 19.757 13.709 24.613 53.05 30.79 88.89 88.97 88.89 155.737 0 67.958-37.052 127.028-91.686 157.39-7.95 4.955-13.204 13.941-13.204 24.15 0 15.56 12.362 28.18 27.586 28.18 6.468 0.067 14.147-3.832 14.147-3.832 70.735-40.272 118.565-117.348 118.565-205.888z m-31.83-346.89c-5.12-3.139-10.24-5.683-16.438-5.683-15.157 0-27.452 12.555-27.452 28.049 0 11.167 6.501 20.12 15.663 25.24 100.813 60.062 168.617 171.563 168.617 299.35 0 127.69-67.703 239.124-168.415 299.218-8.825 4.89-16.437 14.173-16.437 25.637 0 15.495 12.294 28.049 27.451 28.049 6.097 0 10.947-2.379 16.236-5.517 116.98-69.709 195.664-199.116 195.664-347.387 0-148.006-78.346-277.149-194.89-346.956z" fill="" p-id="433"></path>
                        </svg>
                        </i>
                    </div>
                    <div class="answer-content-box fill-answer-content-box">
                      <div class="answers" v-show="isanswers">
                        <div class="answers-div1">{{problem}}</div>
                        <div class="answers-div2"><el-input v-model="answersInput" placeholder="请输入答案"  clearable :disabled="inputType"></el-input></div>
                        <div class="answers-div4"><el-input v-model="key" placeholder="请输入答案"  clearable :disabled="inputType"></el-input></div>
                        <div class="answers-div3">
                          <el-button type="primary" class="next-answers" @click="next()">查看答案</el-button>
                          <el-button type="warning" class="next-answers" @click="out('取消答题')">{{outText}}</el-button>
                        </div>
                      </div>
                    </div>
                    <div class="look-answer-boxs">
                      <el-form ref="form" v-show="isLookAnswer" class="look-answer">
                      <div class="answer-icon answer-icon2"><i class="el-icon-error"></i><span>答错了</span></div>
                      <el-form-item label="题目:">
                        <span>{{problem}}</span>
                      </el-form-item>
                      <el-form-item label="正确答案:">
                        <span>{{lookAnswer}}</span>
                      </el-form-item>
                      <el-form-item label="你的答案:">
                        <span>{{youAnswer}}</span>
                      </el-form-item>
                      <div class="answers-div3">
                          <el-button type="primary" class="next-answers" @click="nexts()">{{nextText}}</el-button>
                          <el-button type="warning" class="next-answers" @click="out('取消答题')">{{outText}}</el-button>
                      </div>
                      </el-form>
                      <el-form ref="form" v-show="isLookAnswer2" class="look-answer">
                      <div class="answer-icon"><i class="el-icon-success"></i><span>答对了</span></div>
                      <el-form-item label="题目:">
                        <span>{{problem}}</span>
                      </el-form-item>
                      <el-form-item label="正确答案:">
                        <span>{{lookAnswer}}</span>
                      </el-form-item>
                      <el-form-item label="你的答案:">
                        <span>{{youAnswer}}</span>
                      </el-form-item>
                      <div class="answers-div3">
                          <el-button type="primary" class="next-answers" @click="nexts()">{{nextText}}</el-button>
                          <el-button type="warning" class="next-answers" @click="out('取消答题')">{{outText}}</el-button>
                      </div>
                      </el-form>
                    </div>
                    <div class="look" v-show="isjg">
                      <div class="look-answer-progress">
                        <div>
                        <div class="look-answer-progress-title">本次答题准确率</div>
                        <el-progress type="circle" :percentage="accuracy2"></el-progress>
                        <div class="look-answer-progress-titles">本次答对{{anumber}}道题</div>
                        <div class="look-answer-button">
                          <el-button type="warning" class="look-answer-buttons" @click="out('重置完成')">再来一次</el-button>
                        </div>
                        </div>
                      </div>
                      <div class="see-answer">
                        <div class="see-title">正确答案</div>
                        <div class="see">
                          <template v-for="adata in accuracydata">
                          <div class="see-div" :class="{seediv2:adata.type=='no'}">
                            <span class="see-span">{{adata.english}}</span>:
                            <span class="see-span2">{{adata.chinese1}}</span>
                            <span class="see-span2">{{adata.chinese2}}</span>
                            </div>
                          </template>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="xxxx">xxxx</el-tab-pane>
          <el-tab-pane label="yyyy">yyyy</el-tab-pane> -->
        </el-tabs>
      </el-main>
    </el-main>
  </el-container> 
</template>

<script>
import connect from '../js/connector.js'
export default {
  // name: 'head',
  data(){
    return {
      username:'',//所有用户
      // uname:'',//登陆者
      activeName:'练习总结',
      isAnswerBox:true,//开始页面
      isfillAnswerBox:false,//写答案页
      // wAccuracy:0,//所有单词熟悉率
      aAccuracy:0,//平均答题准确率
      //下来选择框属性
      options: [{
          value: 'allword',
          label: '全部单词'
        }],
      optionsValue:'allword',//下来选择框的值
        //时间
      times:'00:05',
      //题目数量
      numbers: 0,
      //模式开关和人员选择开关
      isswitch:false,
      //人员选择
      yData:[],//循环的人员数据
      yDataValue:[],//选中的人员key
      //填答案
      answersInput:'',
      key:'',//单词的key
      id:'',//单词id
      //模拟框提示
      dialogVisible: false,

      worddatas:'',//存获取api后的数据(原始数据不可修改)
      worddata:'',//获取api后数据(输出页面用)
      problem:'',//要输出的题目
      problemnumber:'',//题目数量输出
      number:0,//计算题目数量
      pnumber:'',//第几条题目
      time:'',//计时
      inputType:true,//答案输入框是否可以输入
      setTime:'',//计时器

      // //按钮文本
      nextText:'下一题',
      outText:'取消',
      //存答案
      answerData:[],
      isanswers:true,
      isLookAnswer:false,//查看答案 错的
      isLookAnswer2:false,//对的
      lookAnswer:'',//正确答案
      youAnswer:'',//填入的答案
      islb:false,//喇叭
      isjg:false,//所有题目答完后的成绩页
      accuracy2:0,//本次答题准确率
      anumber:0,//本次答对的题数
      allanumber:0,//历史答对的题数
      days:0,//活跃天数
      accuracydata:[],//答完题输出全部答案

      //每日签到
      week:[
          {
            wk:'周一',
            data:'',
            type:'no',
          },
          {
            wk:'周二',
            data:'',
            type:'no',
          },
          {
            wk:'周三',
            data:'',
            type:'no',
          },
          {
            wk:'周四',
            data:'',
            type:'no',
          },
          {
            wk:'周五',
            data:'',
            type:'no',
          },
          {
            wk:'周六',
            type:'no',
          },
          {
            wk:'周日',
            data:'',
            type:'no',
          }
      ],

    };
  },
  methods:{
    handleClose(done) {//模态框
    //     // this.$confirm('确认关闭？')
    //       // .then(_ => {
    //       //   // done();
    //       // })
    //       // .catch(_ => {});
    },
    users(){//选多人时输出所有用户
      let th=this;
      connect.$on('username',function(name){
        th.username=name;
        // console.log(th.username);
        th.$http.get('/api?api=users_data').then((res)=>{
            // console.log(res.data);
            // console.log(th.username);
            let obj={
              disabled:'',//可选 false可选择
              key:'',//数据库用户的id
              label:'',//用户名
            };
            for(let i=0; i<res.data.length;i++){
              if(res.data[i].name!=th.username){//去除登陆者的名字
                obj={
                  disabled:false,
                  key:res.data[i].name,
                  label:res.data[i].name,
                };
                th.yData.push(obj);
              }
              let objs={
                  value:res.data[i].name,
                  label:res.data[i].name,
              }
              th.options.push(objs);
            }
            // console.log(th.yData);
        });
        //获取总结页数据
        th.$http.get(`/summary?username=${th.username}`).then((res)=>{
          // console.log(res);//活跃天和历史答对单词个数
          if(res.data=="null"){
            th.allanumber=0;
            th.days=0;
          }else{
            th.allanumber=res.data.wordnumber;
            th.days=res.data.day;
            //平均答题准确率
            let n=res.data.nowordnumber*1+res.data.wordnumber*1;
            // console.log(res.data.nowordnumber*1+res.data.wordnumber*1);
            th.aAccuracy=(res.data.wordnumber/n*100).toFixed(2)*1;//*1字符串转数字
          }
        })
        //每日练习
        th.$http.get(`/week?username=${th.username}`).then((res)=>{
          // console.log(res);
          if(res.data==""){
            res.data=[];
          }else{
            //获取api数据改变成一周,周日到周一的数据
            let weeks = new Array("一", "二", "三", "四", "五", "六","日");  
            let j = new Date().getDay();  
            let jdata ="周"+weeks[j-1];  
            console.log(th.getMyDay(0),jdata);
            let index;
            let ind=-1;//大于今天的日期倍数
            // let inds=0;//小于今天的日期倍数
            // let indexs=0;
            let i=-1;
            for(let o=0;o<th.week.length;o++){
              if(th.week[o].wk==jdata){//定位今天的日期小标位置
                index=o;
                // console.log(indexs);
              }
              if(index<=o+1){//今天和未来的日期日期
                ind++;
                // console.log(index);
                th.week[o].data=th.getMyDay(ind*-1000);
                // th.week[o].data="后";
              }
            }


            for(let i=0;i<th.week.length;i++){//已经过去的日期不包括今天 **因为index作用域问题需要另一个循环
              if(th.week[i].data==""){
                th.week[i].data=th.getMyDay((index-i)*1000);
              }
            }
            //获取数据时数组不够7的长度
            let length=res.data.length;
            if(res.data.length<7){
              for(let t=0;t<th.week.length-length;t++){
                let reddata={
                  days:"",
                  id:"",
                  username:"",
                }
                res.data.push(reddata);
              }
            }
            // console.log(res.data);
            //判断是否有相同
            for(let r=0;r<th.week.length;r++){
              for(let w=0;w<res.data.length;w++){
                if(th.week[r].data==res.data[w].days){
                th.week[r].type='ok';
                }
              }
            }
            // console.log( res.data);
            console.log(th.week,res.data);
          }
        })

      });
    },
    getMyDay(times){//获取时间
      let day1 = new Date();
      day1.setTime(day1.getTime()-24*60*60*times);//data:1000是作天 200是前天 0是今天
      let m=day1.getMonth()+1;
      let d=day1.getDate();
      if(m<10){
        m="0"+m;
      }
      if(d<10){
        d="0"+d;
      }
      let s1 = day1.getFullYear()+"-" +m+ "-" +d;
      // let s1 = day1.getFullYear()+"-" + (day1.getMonth()+1) + "-" + day1.getDate();
      return s1;
    },
    ready(){//开始按钮 设置答题参数
      let isready=false;
      if(this.optionsValue!="" && this.numbers>=10 && this.numbers<=50){
        this.isjg=false;//成绩页
        // console.log(this.optionsValue,this.times,this.numbers,this.yDataValue);
        if(this.isswitch==false){
          // console.log('1');
          isready=true;
        }else{
          if(this.yDataValue.length>=1){
            // console.log(this.yDataValue);
             isready=true;
          }else{
            isready=false;
            this.$notify({
              title:`人员不能为空`,
              duration:1000,
            });
          }
        }
        // console.log(isready);
      }else{
        isready=false;
        this.$notify({
          title:`单词表不能为空`,
          duration:1000,
        });
      }

      if(isready){//所有选项符合条件后再请求数据库
        if(this.isswitch==false){
            this.yDataValue=[];
        }
        console.log(this.optionsValue,this.times,this.numbers,this.yDataValue);
        this.$http.get(`/getsubject?options=${this.optionsValue}&time=${this.times}&number=${this.numbers}&enemy=${this.yDataValue}&user=${this.username}`).then((res)=>{
            // console.log(res.data);
            this.worddatas=res.data;
            this.worddata=res.data;
            if(res.data.number==200){//单人
              // this.$notify({
              //   title:`设置完成开始计时答题`,
              //   duration:2000,
              // });
              this.problemnumber=res.data.data.length;
               this.isAnswerBox=false;
               this.isfillAnswerBox=true;
               this.dialogVisible=true//模态框
            }else if(res.data.number==220){//多人
              // this.$notify({
              //   title:`挑战已发出,开始计时答题`,
              //   duration:2000,
              // });
               this.isAnswerBox=false;
               this.isfillAnswerBox=true;
                this.dialogVisible=true//模态框
            }else{
              this.$notify({
                title:`参数错误`,
                duration:1000,
              });
            }
        })
      }
    },
    start(){//提示框开始按钮
      let th=this;
      this.dialogVisible=false;
      // this.problemnumber=this.worddata.data.length;
      let t=this.worddata.time.split(":")[1]*60;//截取需要字符,答题的限制时间
      th.time=this.worddata.time.split(":")[1]+":00";//默认输出时间
      th.problem=th.worddata.data[th.number].english;//题目输出
      th.key=th.worddata.data[th.number].encryption;//key输出
      th.id=th.worddata.data[th.number].id;//单词id输出
      th.pnumber=th.number;//已经到第几条题目
      th.setTime=setInterval(function(){
        let min = parseInt(t/60);
        let sec = parseInt(t%60);
        if(sec<10) sec = '0'+sec;
        if(min<10) min = '0'+min;
        th.time=min+":"+sec;
        t--;
        th.inputType=false;//等时间开始跳财能输入
        if(t<0){//计时结束
          th.inputType=true;
          clearInterval(th.setTime);//0秒清除计时器
          th.$notify({
                title:`时间到`,
                duration:1000,
          });
          th.isjg=true;//成绩页
          th.isLookAnswer=false;//查看答案 错的
          th.isLookAnswer2=false;//对的
          th.isanswers=false;
          //计时结束自动跳到成绩页
          let d;
          let n=0;//答对的题数
          if(th.answerData==""){//没有回答过一道题
             for(let i=0; i<th.worddata.data.length;i++){
                d={
                  chinese1:th.worddata.data[i].chinese1,
                  chinese2:th.worddata.data[i].chinese2,
                  english:th.worddata.data[i].english,
                  type:"no",
                }
                th.accuracydata.push(d);
             }
            // alert("dd");
            th.accuracy2=0;//本次答题准确率
          }else{//没有回答全部题目
            for(let i=0; i<th.worddata.data.length;i++){
              if(th.answerData[i]==undefined || th.answerData[i].type=='no'){
                d={
                  chinese1:th.worddata.data[i].chinese1,
                  chinese2:th.worddata.data[i].chinese2,
                  english:th.worddata.data[i].english,
                  type:"no",
                }
              }else if(th.answerData[i].type=="ok"){
                n++;
                d={
                  chinese1:th.worddata.data[i].chinese1,
                  chinese2:th.worddata.data[i].chinese2,
                  english:th.worddata.data[i].english,
                  type:"ok",
                }
              }
              th.accuracydata.push(d);
            }
            th.accuracy2=n/th.answerData.length*100;//本次答题准确率
          }
          th.anumber=n;//本次答对的题数
        }
        // console.log(t);
      },1000);//输出到页面
      if(this.islb==true){
        this.pronunciation(this.problem);
      }
      // console.log(this.worddata,this.worddatas);
    },
    nexts(){//答案body按钮
      //用于跳下一题和清空上次题目的数据
      if(this.worddata.data.length>this.number){//判断是否最后一题
        if(this.isanswers==true){
          this.isanswers=false;
        
        }else{
          this.isanswers=true;
        }
        this.isLookAnswer=false;
        this.isLookAnswer2=false;
        this.id='';
        this.problem='';
        this.answersInput='';
        this.key='';//清空上次输入的答案和题目和key和id
        this.pnumber=this.number;
        this.problem=this.worddata.data[this.number].english;
        this.key=this.worddata.data[this.number].encryption;//key输出
        this.id=this.worddata.data[this.number].id;//单词id输出
        if(this.islb==true){
          this.pronunciation(this.problem);
        }
      }else{//最后一题回答完点击查看所有答案
          // console.log('最后一题回答完点击查看所有答案');
          this.isjg=true;//成绩页
          this.isLookAnswer=false;//查看答案 错的
          this.isLookAnswer2=false;//对的
          clearInterval(this.setTime);
          // console.log(this.answerData);
          // console.log(this.worddata);
          // let ds=[];
          let d;
          let n=0;//答对的题数
          for(let i=0; i<this.worddata.data.length;i++){
            if(this.answerData[i].type=="no" || this.answerData[i]==undefined){
              d={
                chinese1:this.worddata.data[i].chinese1,
                chinese2:this.worddata.data[i].chinese2,
                english:this.worddata.data[i].english,
                type:"no",
              }
            }else if(this.answerData[i].type=="ok"){
              n++;
              d={
                chinese1:this.worddata.data[i].chinese1,
                chinese2:this.worddata.data[i].chinese2,
                english:this.worddata.data[i].english,
                type:"ok",
              }
            }
            this.accuracydata.push(d);
          }
          // console.log(ds);
          console.log(this.accuracydata);
          this.accuracy2=n/this.answerData.length*100;//本次答题准确率
          this.anumber=n;//本次答对的题数

          //答完所有题增加活跃天数
          this.$http.get(`/day?username=${this.username}`).then((res)=>{
            console.log(res);
            this.allanumber=res.data.wordnumber;
            this.days=res.data.day;
          })
      }
    },
    next(){//查看答案
      //判断要显示答案body还是输入答案body
      if(this.isanswers==true){
        this.isanswers=false;
       
      }else{
        this.isanswers=true;
      }
      this.isLookAnswer=false;
      this.isLookAnswer2=false;
      this.number++;
      let data={
          id:this.id,
          english:this.problem,
          chinese:this.answersInput,
          encryption:this.key,
          type:"",
        }
      this.answerData.push(data);//存填入的答案
      console.log(this.answerData);
      if(this.worddata.data.length>=this.number+1){//点击一下题输出下道题
        //判断答案
        this.$http.get(`/answer?id=${this.id}&e=${this.problem}&c=${this.answersInput}&encryption=${this.key}&username=${this.username}`).then((res)=>{
            // console.log(res.data.answer);
            if(res.data.number==200){
              this.isLookAnswer2=true;//答对的
              data.type="ok";
            }else if(res.data.number==220){
              this.isLookAnswer=true;//答错的
               data.type="no";
            }
            this.lookAnswer=res.data.answer;
            this.youAnswer=this.answersInput;
            //更新练习总结
            this.$http.get(`/summary?username=${this.username}`).then((res)=>{
              console.log(res);//活跃天和历史答对单词个数
                this.allanumber=res.data.wordnumber;
                this.days=res.data.day;
                //平均答题准确率
                // let n=res.data.nowordnumber*1+res.data.wordnumber*1;
                // console.log(res.data.nowordnumber*1+res.data.wordnumber*1);
                // this.aAccuracy=(res.data.wordnumber/n*100).toFixed(2)*1;
            })
        });
      }else{
        this.nextText='领取活跃日';
        this.$http.get(`/answer?id=${this.id}&e=${this.problem}&c=${this.answersInput}&encryption=${this.key}&username=${this.username}`).then((res)=>{
            // console.log(res.data.answer);
            if(res.data.number==200){
              this.isLookAnswer2=true;//答对的
              data.type="ok";
            }else if(res.data.number==220){
              this.isLookAnswer=true;//答错的
              data.type="on";
            }
            this.lookAnswer=res.data.answer;
            this.youAnswer=this.answersInput;
            //平均答题准确率
            this.$http.get(`/summary?username=${this.username}`).then((res)=>{
              console.log(res);//活跃天和历史答对单词个数
                this.allanumber=res.data.wordnumber;
                this.days=res.data.day;
                //平均答题准确率
                let n=res.data.nowordnumber*1+res.data.wordnumber*1;
                console.log(res.data.nowordnumber*1+res.data.wordnumber*1);
                this.aAccuracy=(res.data.wordnumber/n*100).toFixed(2)*1;
            })
        });
      }
      // console.log(this.number);
      // console.log(this.answerData);
    },
    out(e){//取消答题
    //重置参数
        this.isAnswerBox=true;//显示答题设置盒子
        this.isfillAnswerBox=false;//隐藏答题盒子
        clearInterval(this.setTime);//清除计时器
        this.time="";//计时器清零
        this.isswitch=false;
        this.worddatas='';
        this.worddata='';
        this.answersInput='',
        this.isanswers=true;
        this.isLookAnswer=false;//查看答案 错的
        this.isLookAnswer2=false;//对的
        this.accuracydata=[];//最后输出所有题目和答案

        this.$notify({
            title:e,
            duration:1000,
        });

      this.problem='';//要输出的题目
      this.problemnumber='';//题目数量输出
      this.number=0;//计算题目数量
      this.pnumber='';//第几条题目
      this.inputType=true;//答案输入框是否可以输入

      //存答案
      this.answerData=[];
      this.lookAnswer='';//正确答案
      this.youAnswer='';//填入的答案
      this.islb=false;//喇叭
      this.isjg=false;//所有题目答完后的成绩页
      this.accuracy2=0;//本次答题准确率
      this.anumber=0;//本次答对的题数
      this.nextText='下一题';

    },
  pronunciation(e){//发音
        let th=this;
        this.url=`http://fanyi.baidu.com/gettts?lan=en&text=${e}&spd=3&source=web`;
        let audio =document.createElement('audio');//生成audio
        this.audio=audio;
        this.audio.src = this.url;//赋值src
        this.audio.play();
    },
  },
  created(){
    this.users();
  }
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
  height: 100%;
  background: #f9f9f9;
}
.nav-box{
  height: 100%;
}
.nav-box-nav{
  height: 100%;
}
.week-box{
  margin-left: -100px;
}
.answer-title{
  font-size: 20px;
  text-align: center;
  /* margin-top: 100px; */
  margin-top: 50px;
  font-weight: bold;
  color: #409EFF;
}
.week{
  width: 50%;
  /* height: 200px; */
  border: 1px solid #e0dddd;
  /* margin:30px auto; */
  margin:100px auto 30px auto;
  border-radius: 4px;
  padding-bottom: 20px;
}
.week-title,.week-title-box{
  height: 50px;
  line-height: 50px;
  padding-left: 20px;
  box-sizing: border-box;
  font-size: 16px;
  background:#cccccc4d; 
  border-bottom: 1px solid #e0dddd;
   box-sizing: border-box;
  color: #909399;
}
.week-icon{
  display:flex;
  justify-content: space-between; 
  padding: 20px  50px 0px 50px;

}
.w-i{
  background: #fff;
}
.weekicons,.w-i{
  height: 40px;
  width: 40px;
  border-radius: 50%;
  /* background: #409EFF; */
  text-align: center;
  border:  1px solid #e0dddd;
  box-sizing: border-box;
}
.weekicons{
 background: #409EFF;
}
.week-number{
  margin-top: 15px;
  text-align: center;
  font-size: 13px;
   color: #909399;
}
.weekicons i,.w-i i{
  font-size: 18px;
  font-weight: bold;
  line-height: 40px;
  color: #fff;
}
.week-analysis{
  width: 100%;
  /* margin-left: 100px; */
  display: flex;
  margin-top: 50px;
  justify-content: center;
}
.primary-box{
  width: 30%;
  border:  1px solid #e0dddd; 
  display: flex;
  justify-content: center;
  padding-right:10px; 
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.primary-box>div{
  display: flex;
  flex-wrap: wrap; 
  justify-content: center;
}
.all-word-primary-title{
  text-align: center;
  padding: 40px 0px 30px 0px;
  width: 100%;
  color: #909399;
}
.all-word-primary{
  margin-bottom: 40px; 
}
.day-word{
  width: 20%;
  border:  1px solid #e0dddd; 
  border-left: none;
  box-sizing: border-box;
    border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.day-box{
  height: 50%;
  border-bottom: 1px solid #e0dddd; 
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0px 10px 0px 10px; 
}
.day-box-icon{
  font-size: 30px;
  color: #409EFF;
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.day-box-icon-title{
  flex: 8;
  display: flex;
  /* align-items: center; */
  color: #909399;
  flex-wrap: wrap;
}
.day-box-icon-text{
  width: 100%;
  /* height: 30px; */
  /* flex: 1; */
}
.text1{
  font-size: 20px;
  display:flex;
  align-items: flex-end;
   color:#409EFF;
}
.text2{
  font-size: 14px;
}

.answer-box-play,.fill-answer-box{
  /* width: 100%; */
  /* background: #cccccc; */
  margin-left: -100px;
  padding-bottom: 20px;
}
.answer-boxs-play,.fill-answer-boxs{
  width: 50%;
  /* margin: 0 auto; */
  margin:70px auto 0 auto;
}
.answer-box-play-title{
      font-size: 20px;
    text-align: center;
    margin-top: 50px;
    /* margin-top: 100px; */
    font-weight: bold;
    color: #409EFF;
}
.answer-box-play-title-box{
  width: 100%;
  min-height: 500px;
  border: 1px solid #e0dddd;
  margin:30px auto;
  border-radius: 4px;
  padding-bottom: 50px;
  box-sizing: border-box;
}
.week-title-box{
  height: 50px;
  line-height: 50px;
  font-size: 16px;
}
.answer-form{
  padding: 20px;
}
.label-box{
  text-indent: 20px;
}
.block-box{
  width: 50%;
  padding: 0px 20px 0px 20px;
}
.answer-button-box{
  display: flex;
  /* justify-content:center; */
}
.answer-button{
  height: 40px;
  width: 20%;
  margin-top: 30px;
}
.answer-content-box{
  padding: 0px 20px 0px 20px;
}
.switch{
  width: 100%;
  display: flex;
}
.percentage-box{
  margin-top: 20px;
}
.answers{
  width: 50%;
  margin:0 auto;
  /* padding: 20px 0px ; */
}
.answers div{
  width: 100%;
  padding: 20px 0px 0px 0px;
}
.next-answers{
  height: 40px;
  width: 80px;
  margin: 0 auto;
  margin-right: 19px;
}
.week-title-box span{
  font-size: 12px;
}
.answers-div1{
  text-align: center;
}
.answers-div3{
  margin-top: 20px;
}
.answer-title-box{
  padding-right: 20px;
  display: flex;
  justify-content: space-between;
}
.dialog-button{
  height: 32px;
  width: 56px;
}
.answers-div4{
  display: none;
}
.answer-icon{
  display: flex;
  justify-content:center;
  align-items: center;
  margin-top: 20px;
  color: #409EFF;
}
.answer-icon i{
  font-size: 30px; 
  /* color: #409EFF; */
}
.answer-icon span{
  font-size: 26px;
  margin-left: 10px;
}
.answer-icon2{
  color: #F56C6C;
  margin-bottom: 20px;
}
.look-answer-boxs{
  padding: 20px 20px 0px 0px;
}
.look-answer{
  padding:0px 50px 0px 50px;
}
.answers-div1{
  height: 40px;
  line-height: 40px;
}
.svg-lb{
  font-size: 24px;
  cursor: pointer;
}
.svg-lb:hover{
  color: #409EFF;
}
.lb-icon-box{
  padding: 20px 20px 0px 20px;
  display:flex;
}
.content-box{
      padding: 40px 20px 0px 20px;
}
.lb-icon-box i{
  display:block;
  height: 26px;width: 24px;
  margin-right: 10px;
}
.look{
  width: 100%;
  height: 100%;
  margin-top: 75px;
  display: flex;
}

.look-answer-progress{
  width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
}
.look-answer-progress div{
  /* width: 100%; */
}
.look-answer-progress-title{
  margin-bottom: 20px;
  text-align: center;
      color: #909399;
}
.look-answer-progress-titles{
  margin-top: 20px;
  text-align: center;
      color: #909399;
}
.see-answer{
  width: 50%;
}
.see-title{
  text-align: center;
  color: #909399;
}
.see{
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}
.see div,.see-div{
  padding: 5px 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
    /* color: #909399; */
    margin: 5px 10px 10px 10px;
}
.see-div{
  color: #909399;
}
.seediv2{
  background:#F56C6C; 
  color: #fff;
}
.see-span{
  margin-right: 5px;
}
.see-span2{
  margin-left: 5px;
}
.look-answer-buttons{
    height: 40px;
    width: 100%;
    margin-top: 20px;
}
</style>
