import React, { Component } from 'react';
import './openMarkdown.css'
import Nav from '../component/nav/nav';
import Errors from '../component/errors/errors';
import { Message } from 'element-react';
import { Button } from 'element-react';
import 'whatwg-fetch'
import SimpleMDE from 'simplemde'
import 'simplemde/dist/simplemde.min.css'

function ErrorsBox(props){ //url不正确提示

  if(props.type){
    return (
      <div className="share-errors">
        <Errors />
      </div>
    )
  }
  return false
}


// function Markdown(props){
//   if(props.username===null){
//     return false;
//   }else{
//     return (
//       <div className="open-markdown-box"> 
//         <div className="open-markdown">
        
//         </div>
//         <div className="open-markdown-user">
//             <div className="author-name">{props.username}</div>
//             <div className="add-time"><i className="el-icon-date"></i>{props.time}</div>
//             <div className="download-markdown"><Button size="small" type="primary" onClick={props.download}>下载</Button></div>
//         </div>
//       </div>
//     )
//   }
// }

class Open extends Component {
  constructor(props) {
    super(props);
    console.log(props)
    this.rout=props; 
    this.state={
      openId:props.match.params.id, //路由参数
      shareId:props.match.params.shareid,//分享id
      shareNumber:props.match.params.number,//分享number
      errors:false,// 错误层
      userName:null,//分享者名
      time:'',//文件更新时间
      markdown:'',//markdown内容
      downloadId:'',//下载id
      html:''
    }
  }

  componentWillMount(){
    this.getInto();
    this.getFile();
    // console.log(this.mar.togglePreview())
    
  }

  
  getInto() {
    // console.log(this.state.shareId);
    //路径有参数
    if(this.state.openId!==undefined){
      this.setState({
        errors:false
      })
    }else{
      this.setState({
        errors:true
      })
    }

  }

  getFile(){
    console.log('url参数：',this.state.openId);
    fetch(
      global.constants.url+`/getmarkdown?openid=${this.state.openId}&numbers=${this.state.shareNumber}&shareid=${this.state.shareId}`,
      { method: 'get',}
    )
    .then((response )=> response.json())
    .then(data => {
      console.log(data);
      if(data.code===200){
        this.setState({
          userName:data.markdown.user,
          time:data.markdown.time.split(' ')[0],
          markdown:data.markdown,
          downloadId:data.markdown.downloadId,
          html:data.markdown.markdown
        })
        this.mar.value(data.markdown.markdown);
        //  document.getElementsByClassName('CodeMirror-code')[0].style.height=20+'px';
         this.mar.togglePreview()
      }else{
        this.setState({
          errors:true,
          userName:null,
        })
        Message({
          message: data.text,
          type: "warning",
        });
      }
    })
  }
  downloadmarkdown(){
    console.log('下载');
    fetch(
      global.constants.url+'/downloadmarkdown',
      { method: 'post',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `id=${this.state.downloadId}&type=1`
    })
    .then((response )=> response.json())
    .then(data => {
      console.log(data);
      let messType;
      if(data.code===200){
        messType="success";
        let a = document.createElement('a')
        a.href =  global.constants.downloadurl+data.name+'.md';
        a.download = this.state.markdown.label+'.md'
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
  componentDidMount() {
    this.mar = new SimpleMDE({
      element: document.getElementById('mark').childElementCount, 
      autosave: true,
      toolbar:true,//工具栏
      status:false,//底部计数
      initialValue:'',
      spellChecker:false,
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
      },
    })
  }
  render() {
    return (
      <div className="open-wrap">
        <div className="share-nav">
          <Nav pro={this.rout}/>
        </div>
        <div className="open-markdown-title-box">
          <div className="open-markdown-title">{this.state.markdown.label}</div>
        </div>
        <div className="open-markdown-box"> 
          <div className="open-markdown">
            <textarea id="mark" disabled></textarea>
          </div>
          <div className="open-markdown-user">
              <div className="author-name">{this.state.userName}</div>
              <div className="add-time"><i className="el-icon-date"></i>{this.state.time}</div>
              <div className="download-markdown">
                <Button size="small" type="primary" onClick={()=>this.downloadmarkdown()}>下载</Button>
              </div>
          </div>
        </div>
        <ErrorsBox  type={this.state.errors}/>
      </div>
    );
  }
}

export default Open;
