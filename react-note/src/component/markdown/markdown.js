import React, { Component } from 'react';
import './markdown.css'
import { Input } from 'element-react';
import { Button } from 'element-react';
import emitter from '../../util/events';
import { Message } from 'element-react';

import SimpleMDE from 'simplemde'
// import marked from 'marked'
// import highlight from 'highlight.js'
import 'simplemde/dist/simplemde.min.css'

// const ReactMarkdown = require('react-markdown')

function Title(props) {


    return (
      <div className="m-title">
        <div className="m-title-input"><Input value={props.title}  onChange={props.change} /></div>
        <div className="m-title-buttom">
          {/* <div className="update-time" style={{display:props.timedisplay}}><span>{props.updatetime}</span></div> */}
          <Button type="primary" disabled={props.modify} onClick={props.updatemarkdown}>保存</Button>    
          <Button type="primary" onClick={props.downloadmarkdown}>下载</Button>  
        </div>
      </div>
    )
  // if(props.type==='none'){
  //   return(
  //     <div className="m-title">
  //       <Input value={props.title}  onChange={props.change} />
  //       {/* <Input   onChange={props.change} /> */}
  //       <div className="m-title-buttom">
  //         <Button type="primary" disabled={props.modify} onClick={props.updatemarkdown}>保存</Button>    
  //         <Button type="primary" onClick={props.click}>编辑</Button>
  //       </div>
  //     </div>
  //   )
  // }else{
  //   return(
  //     <div className="m-title">
  //       <Input value={props.title}  onChange={props.change} />
  //       <div className="m-title-buttom">
  //         <Button type="primary" disabled={props.modify} onClick={props.updatemarkdown}>保存</Button>    
  //         <Button type="primary" onClick={props.click}>预览</Button>
  //       </div>
  //     </div>
  //   )
  // }
}



function Mar(params) {
  if(params.type===0){
    return (
      <div className="Mask">无内容</div>
    )
  }

  return false
}

class Markdown extends Component {

  constructor(props) {
    super(props);
    this.state={
      data:'',
      type:0, //编辑器遮罩
      markdown:'',  //默认内容
      edit:'block',
      modify:true,//保存按钮
      title:'', //标题
      updateTimeDisplay:'none',
      // updateTime:'',
      updateKey:false
    }
    
  }
  componentDidMount() {
    this.nomarkdown = emitter.addListener('nomarkdown', (type) => {
      this.setState({
        type:type,
        updateKey:false
      })

    })

    this.markdown = emitter.addListener('markdown', (data,type) => {
      console.log('编辑器接收markdown:',data,type)
     
      let updateKey=type===1?true:false;
      this.setState({
        data:data,
        type:type,
        markdown:data.markdown,
        title:data.label,
        updateTimeDisplay:'none',
        updateKey:updateKey,
        modify:true
      })
      if(data.markdown===" "){
        data.markdown='';
      }
      document.getElementsByClassName('CodeMirror-code')[0].style.height=20000+'px';
      this.smde.value(data.markdown);
      this.smde.togglePreview()
      this.smde.togglePreview()
      document.getElementsByClassName('CodeMirror-code')[0].style.height=20+'px';
    })

    
    this.smde = new SimpleMDE({
      element: document.getElementById('editor').childElementCount,  
      autosave: true,
      // toolbar:true,//工具栏
      toolbar: [
        { //加粗
        name: "bold",
        action: SimpleMDE.toggleBold,
        className: "fa fa-bold",
        title: "加粗",
        },
        { //斜体
          name: "bold",
          action: SimpleMDE.toggleStrikethrough,
          className: "fa fa-strikethrough",
          title: "删除线",
        },
        { //标题
          name: "heading",
          action: SimpleMDE.toggleHeadingSmaller,
          className: "fa fa-header",
          title: "标题",
        },
        { //代码
          name: "code",
          action: SimpleMDE.toggleCodeBlock,
          className: "fa-code",
          title: "代码",
        },
        { //引用
          name: "quote",
          action: SimpleMDE.toggleBlockquote,
          className: "fa fa-quote-left",
          title: "引用",
        },
        { //无序列表
          name: "unordered-list",
          action: SimpleMDE.toggleUnorderedList,
          className: "fa fa-list-ul",
          title: "无序列表",
        },
        { //有序列表
          name: "ordered-list",
          action: SimpleMDE.toggleOrderedList,
          className: "fa fa-list-ol",
          title: "有序列表",
        },
        { //表格
          name: "table",
          action: SimpleMDE.drawTable,
          className: "fa fa-minus",
          title: "表格",
        },
        { //链接
          name: "link",
          action: SimpleMDE.drawLink,
          className: "fa fa-link",
          title: "链接",
        },
        { //水平线
          name: "horizontal-rule",
          action: SimpleMDE.drawHorizontalRule,
          className: "fa fa-minus",
          title: "水平线",
        },
        { //预览
          name: "preview",
          action: SimpleMDE.togglePreview,
          className: "fa fa-eye no-disable",
          title: "预览",
        },
        { //并排
          name: "side-by-side",
          action: SimpleMDE.toggleSideBySide,
          className: "fa fa-columns no-disable no-mobile",
          title: "并排",
        },
        { //全屏
          name: "fullscreen",
          action: SimpleMDE.toggleFullScreen,
          className: "fa fa-arrows-alt no-disable no-mobile",
          title: "全屏",
        }
      ],
      status:false,//底部计数
      autofocus:true,// 聚焦
      initialValue:'',
      spellChecker:false,
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
      },
    })
    
    //编辑器内容改变
    this.smde.codemirror.on("change",()=>{
      console.log('编辑器内容变化了');
      // console.log('编辑器内容:',this.smde.value(),'-',this.state.markdown);
      this.setState({
        markdown:this.smde.value(),
      })
    })
    //聚焦编辑器
    this.smde.codemirror.on("focus",()=>{
      console.log('聚焦编辑器');
      this.setState({
        modify:false
      })
    })
    
    document.addEventListener('keydown',(event)=>{
      let currKey = event.keyCode||event.which||event.charCode;
      if(currKey === 83 && (event.ctrlKey||event.metaKey) && this.state.updateKey){
        event.preventDefault();
        console.log('Ctrl+S');
        this.updateMarkdown()
      }
    })

  }
  change(e){ //获取title
    // console.log(e,'标题',this.smde.value());
    this.setState({
      title:e.replace(/^\s*|\s*$/g,""),
      modify:false
    })
  }
  updateMarkdown(){
    console.log('保存markdown');
    console.log(this.state.markdown,this.state.title,this.state.data);

    fetch(
      global.constants.url+'/updatemarkdown',
      { method: 'post',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `t=${localStorage.user}&fileid=${this.state.data.id}&label=${this.state.title}&markdown=${this.state.markdown}`
    })
    .then((response )=> response.json())
    .then(data => {
      let messType="";
      if(data.code===200){
        messType="success";
        emitter.emit('updatemarkdown',data);//更新完markdown后
        this.setState({
          modify:true,
          updateTimeDisplay:'block',
          // updateTime:data.time
        })
      }else{
        messType="warning";
      }
      Message({
        message: data.text,
        type: messType,
      });

    })
  }
  downloadmarkdown(){
    console.log('下载');
    console.log(this.state.data.downloadId,this.state.type);
    Message({
      message:'下载中,请稍等!',
      duration:1000
    });
    fetch(
      global.constants.url+'/downloadmarkdown',
      { method: 'post',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `t=${localStorage.user}&id=${this.state.data.downloadId}&type=${this.state.type}`
    })
    .then((response )=> response.json())
    .then(data => {
      console.log(data);
      let messType;
      if(data.code===200){
        messType="success";
        let a = document.createElement('a')
        a.href =  global.constants.downloadurl+data.name+'.md';
        a.download = this.state.data.label+'.md'
        a.click();
      }else{
        messType="warning";
      }
      Message({
        message: data.text,
        type: messType,
      });
    })

  }
  render() {
    return (
      <div className="Markdown-box">
        <Mar type={this.state.type}/>
        <Title title={this.state.title} 
        timedisplay={this.state.updateTimeDisplay}
        // updatetime={this.state.updateTime}
        change={(e)=>this.change(e)} 
        type={this.state.edit}
        modify={this.state.modify}
        updatemarkdown={()=>this.updateMarkdown()}
        downloadmarkdown={()=>this.downloadmarkdown()}
        />
        <div className="edit">
          <div className="editor" style={{display:this.state.edit}}>
              <textarea id="editor" placeholder="请输入正文"></textarea>
          </div>
        </div>
      </div>
    )
  }

}

export default Markdown;
