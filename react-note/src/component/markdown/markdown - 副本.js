import React, { Component } from 'react';
import './markdown.css'
import { Input } from 'element-react';
import { Button } from 'element-react';
import emitter from '../../util/events';
import { Message } from 'element-react';
import SimpleMDE from 'simplemde'
import marked from 'marked'
import highlight from 'highlight.js'
import 'simplemde/dist/simplemde.min.css'

const ReactMarkdown = require('react-markdown')

function Title(props) {

  if(props.type==='none'){
    return(
      <div className="m-title">
        <Input value={props.title}  onChange={props.change} />
        {/* <Input   onChange={props.change} /> */}
        <div className="m-title-buttom">
          <Button type="primary" disabled={props.modify} onClick={props.updatemarkdown}>保存</Button>    
          <Button type="primary" onClick={props.click}>编辑</Button>
        </div>
      </div>
    )
  }else{
    return(
      <div className="m-title">
        <Input value={props.title}  onChange={props.change} />
        <div className="m-title-buttom">
          <Button type="primary" disabled={props.modify} onClick={props.updatemarkdown}>保存</Button>    
          <Button type="primary" onClick={props.click}>预览</Button>
        </div>
      </div>
    )
  }
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
      html:'# This is a header\n\nAnd this is a paragraph',
      markdown:'',
      edit:'block',
      modify:true,//保存按钮
      title:'', //
    }
    

  }
  componentDidMount() {
    this.nomarkdown = emitter.addListener('nomarkdown', (type) => {
      this.setState({
        type:type,
      })

    })

    this.markdown = emitter.addListener('markdown', (data,type) => {
      console.log('编辑器接收markdown:',data,type)
      this.setState({
        data:data,
        type:type,
        html:data.markdown,
        title:data.label
      })
      this.smde.value(data.markdown)
    })

      this.smde = new SimpleMDE({
        element: document.getElementById('editor').childElementCount,  
        autofocus: true,
        autosave: true,
        toolbar:false,//工具栏
        status:false,//底部计数
        autofocus:true,// 聚焦
        initialValue:'',
        previewRender: function(plainText) {
          return marked(plainText,{
            renderer: new marked.Renderer(),
            gfm: true,
            pedantic: false,
            sanitize: false,
            tables: true,
            breaks: true,
            smartLists: true,
            smartypants: true,
            highlight: function (code) {
              return highlight.highlightAuto(code).value;
            }
          });
        },
      })
      

    this.smde.codemirror.on("change",()=>{
      console.log('编辑器内容变化了');
      console.log('编辑器内容:',this.smde.value())
      let m=this.smde.value();
      this.setState({
        markdown:m,
        html:this.smde.value()
      })
    })

  }
  change(e){
    console.log(e,'标题');
    this.setState({
      title:e.replace(/^\s*|\s*$/g,""),
      modify:false
    })
    // console.log(this.smde.value())
  }
  edit(){ 
    console.log('预览&编辑');
    if(this.state.edit==='none'){
      this.setState({
        edit:'block',
      })
    }else{
      this.setState({
        edit:'none'
      })
    }
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
  render() {
    return (
      <div className="Markdown-box">
        <Mar type={this.state.type}/>
        <Title title={this.state.title} 
        change={(e)=>this.change(e)} 
        click={()=>this.edit()} 
        type={this.state.edit}
        modify={this.state.modify}
        updatemarkdown={()=>this.updateMarkdown()}
        />
        <div className="edit">
          <div className="left" style={{display:this.state.edit}}>
            <div className="edit-m">
              <textarea id="editor"></textarea>
            </div>
          </div>
          <div className="right">
            <div className="edit-html">
            <ReactMarkdown source={this.state.html} />
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default Markdown;
