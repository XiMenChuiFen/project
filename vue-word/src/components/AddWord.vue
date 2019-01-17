<template>
  <!--添加单词-->
  <el-container class="add-word">
    <!-- <el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button> -->
    <el-dialog title="添加单词" :visible.sync="dialogFormVisible" class="dialog">
    <div class="from-box">
        <div>
        <el-form>
            <el-form-item label="单词">
            <el-input v-model="english" auto-complete="off" placeholder="请输入英文(必填)"></el-input>
            </el-form-item>
            <el-form-item label="中文">
                <el-input v-model="chinese1" auto-complete="off" placeholder="请输入中文1(必填)"></el-input>
                <el-input v-model="chinese2" auto-complete="off" placeholder="请输入中文2(必填)"></el-input>
                <!-- <el-input v-model="chinese3" auto-complete="off" placeholder="请输入中文3(必填)"></el-input> -->
            </el-form-item>
        </el-form>
        </div>
        <div class="teg-box">
            <div class="teg-title"><span>添加标签:(最少添加一个标签)</span></div>
            <div class="te">
            <el-tag :key="tag" v-for="tag in dynamicTags" closable:disable-transitions="false" @close="handleClose(tag)"  closable>{{tag}}</el-tag>
            <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
            </el-input>
            <el-button v-else class="button-new-tag" size="small" @click="showInput" v-show="istag">+New Tag</el-button>
            </div>
        </div>
    </div>
    <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false" class="dialog-footer-botton">取 消</el-button>
        <el-button type="primary" class="dialog-footer-botton" @click="addword()">添 加</el-button>
    </div>
    </el-dialog>
  </el-container> 
</template>

<script>
import connect from '../js/connector.js'
export default {
  // name: 'head',
    data() {
      return {
        //表单
        dialogFormVisible: false,
        english:'',
        chinese1:'',
        chinese2:'',
        chinese3:'',
        chinese:[],
        username:'',
        //标签
        dynamicTags: [],
        inputVisible: false,
        inputValue: '',
        istag:true,
      };
    },
    methods:{
        open(){
            let th=this;
            connect.$on('openaddword',function(isopen){
                // console.log(isopen);
                th.dialogFormVisible=isopen;
            });
        },

        //标签
        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1); 
            if(this.dynamicTags.length<=4){//小于4个标签就不能添加了
                       this.istag=true;
            }
        },

        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
                  if(this.dynamicTags.length==4){//大于4个标签就不能添加了
                       this.istag=false;
                  }
                // console.log(this.dynamicTags.length);
            });
        },

        handleInputConfirm() {
            let inputValue = this.inputValue;
            if (inputValue) {
                this.dynamicTags.push(inputValue);
            }
            this.inputVisible = false;
            this.inputValue = '';
        },
        getuser(){
            let th=this;
            connect.$on('username',function(name){
                // console.log(name);
                th.username=name;
            })
        },
        //提交单词到数据库
        // addword(){
        //     //隐藏添加页
        //     // console.log('1');
        //     this.dialogFormVisible=false;
        //     this.$http.get('/addword?english='+this.english+'&chinese1='+this.chinese1+'&chinese2='+this.chinese2+'&chinese3='+this.chinese3+'&user='+this.username+'&type='+this.dynamicTags).then((res)=>{
        //         console.log(res.data);
        //         this.$notify({
        //             title:res.data.mes,
        //             duration:1500,
        //         });
        //         this.chinese=[];
        //         if(res.data.number==200){
        //             this.english='';
        //             this.chinese1='';
        //             this.chinese2='';
        //             this.chinese3='';
        //             this.dynamicTags=[];
        //             connect.$emit('updateword',res.data.number);
        //         }
        //     });
        // }
        addword(){
            //隐藏添加页
            // console.log('1');
            this.dialogFormVisible=false;
            this.$http.get('/addword?english='+this.english+'&chinese1='+this.chinese1+'&chinese2='+this.chinese2+'&user='+this.username+'&type='+this.dynamicTags).then((res)=>{
                console.log(res.data);
                this.$notify({
                    title:res.data.mes,
                    duration:1500,
                });
                this.chinese=[];
                if(res.data.number==200){
                    // this.english='';
                    // this.chinese1='';
                    // this.chinese2='';
                    // // this.chinese3='';
                    // this.dynamicTags=[];
                    connect.$emit('updateword',res.data.number,this.english,this.chinese1,this.chinese2,this.username,this.dynamicTags);
                    this.english='';
                    this.chinese1='';
                    this.chinese2='';
                    this.dynamicTags=[];
                }
            });
        }

    },
    created(){
        this.open();
        this.getuser();
    }
}
</script>
<style scoped>
*{
  margin: 0;padding: 0;
  overflow: hidden;
}
.add-word{
    position: absolute;
    top:0px;
    /* z-index: 5; */
}
.add-word>div{
    /* min-width: 900px; */
}
.dialog-footer-botton{
    padding: 12px 20px;
}
.from-box{
    display: flex;
    margin-top:-30px;
}
.from-box>div{
    width: 100%;
}
.te{
    display: flex;
    flex-wrap: wrap;
}
.el-tag + .el-tag {
    margin-left: 10px;
  }
.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 20px;
}
.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
     margin-top: 20px;
}
.teg-box{
    /* display: flex; */
    /* flex-wrap: wrap; */
    /* height: 100px; */
    /* justify-content:flex-start; */
    padding-left: 20px;
}
.el-tag,.button-new-tag {
    padding: 0px 5px 0px 5px;
    margin-top: 20px;
}
.teg-title{
    width: 100%;
    height: 24px;
    margin-top: 8px;
    /* display: flex; */
    /* height: auto; */
}
</style>
