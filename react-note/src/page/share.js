import React, { Component } from 'react';
import './share.css'
import Nav from '../component/nav/nav';
import Errors from '../component/errors/errors';
import { Message } from 'element-react';
import { Button } from 'element-react';
import { Breadcrumb } from 'element-react';
import 'whatwg-fetch'

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

function Breadcrumbs(props){  //面包屑导航
  let lists=props.nav;
  let listItems=lists.map((list,index) =>
    <Breadcrumb.Item key={index}>
      <span  onClick={()=>props.clicknav(list.fileId,list.title,list.openId,index)}>{list.title}</span>
    </Breadcrumb.Item>
  )
  return listItems
}

function ShareNav(props){

  if(props.user===null){
    return false;
  }else{
    return (
      <div className={'share-content-nav '+props.navclassname}>
        <div className="share-file-nav">
          {/* <div className="share-file-name">{props.filename}</div> */}
          <div className="breadcrumb">
            <Breadcrumb separator="/">
              <Breadcrumbs nav={props.navlist} clicknav={props.click}/>
            </Breadcrumb>
          </div>
          <div className="share-name"><span>{props.user}</span>的分享</div>
        </div>
      </div>
     )
  }

}

//下载按钮
function Download(props){
  if(props.type===1){
    return (
      <Button size="small" type="text" onClick={()=>props.download(props.downloadId,props.type,props.name)}>下载</Button>
    )
  }
  
  return false
}

function File(props){
  if(props.list.length===0){
    return false;
  }else{
    let list=props.list;
    let listItems=list.map((list,index) =>
      <div className="share-list-file" key={index}>
        <div className="share-file-name" onClick={()=>props.open(list.id,list.type,list.openId,list.label)}>
          <span className={list.type===1?'share-mark-icon':'share-file-icon'}>{list.type===1?'M':'F'}</span>
          <span>{list.label}</span>
        </div>
        <div className="share-file-download">
          <Download 
            type={list.type}  
            name={list.label}
            id={list.id}
            downloadId={list.downloadId}
            download={props.download}
          />
        </div>
        <div className="share-file-time">{list.time}</div>
      </div>
    )
  
    return (
      <div className="share-content-box"> 
        <div className="share-list-box">
            <div className="share-lists-title">
              <div className="share-lists-file-name">文件名</div>
              <div className="share-lists-file-download"></div>
              <div className="share-lists-file-time">修改时间</div>
            </div>
            {listItems}
            <div className="share-lists-foot-text">没有啦!</div>
        </div>
      </div>
    )
  }
}

class Share extends Component {
  constructor(props) {
    super(props);
    // console.log(props)
    this.rout=props; 
    this.state={
      shareId:props.match.params.id, //路由参数
      errors:false,// 错误层
      navClassName:'',
      shareList:[], //文件数组
      userName:null,//分享者名
      shareFile:'',//分享根目录名 
      shareNumbers:0,//分享唯一数字
      Breadcrumb:[],//面包屑导航
    }
  }

  componentWillMount(){
    this.getInto();
    this.getFile();
    window.addEventListener('scroll', ()=>this.handleScroll()); //滚动事件
  }

  
  getInto() {
    // console.log(this.state.shareId);
    //路径有参数
    if(this.state.shareId!==undefined){
      this.setState({
        errors:false
      })
    }else{
      this.setState({
        errors:true
      })
    }

  }

  handleScroll(){
    console.log('浏览器滚动事件');
    let nScroll = document.documentElement.scrollTop || document.body.scrollTop;
    console.log(nScroll);
    if(nScroll<5){
      this.setState({
        navClassName:'',
      })
    }else{
      this.setState({
        navClassName:'share-content-nav2',
      })
    }
  }

  getFile(){
    console.log('url参数：',this.state.shareId);
    fetch(
      global.constants.url+`/getshare?shareid=${this.state.shareId}`,
      { method: 'get',}
    )
    .then((response )=> response.json())
    .then(data => {
      console.log(data);
      if(data.code===200){
        let breadcrumb=[{
          "fileId":data.shareContent[0].fileId,
          "title":data.shareFileName.slice(0,5)+'...',
          "openId":data.openId
        }];
        console.log(breadcrumb)
        this.setState({
          userName:data.shareUser,
          shareFile:data.shareFileName,
          shareList:data.shareContent,
          shareNumbers:data.shareNumbers,
          Breadcrumb:breadcrumb
        })
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

  downloadmarkdown(id,type,name){
    console.log('下载');
    console.log(id,type,name);
    fetch(
      global.constants.url+'/downloadmarkdown',
      { method: 'post',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `id=${id}&type=${type}`
    })
    .then((response )=> response.json())
    .then(data => {
      console.log(data);
      let messType;
      if(data.code===200){
        messType="success";
        let a = document.createElement('a')
        a.href =  global.constants.downloadurl+data.name+'.md';
        a.download = name+'.md'
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

  OpenFile(id,type,openid,name){
    console.log('打开分享的Markdown或分享的文件','id:',id,'类型:',type,'打开：',openid,'文件名：',name);
    if(type===1){ //打开Markdown
      window.open(global.constants.openMarkdownUrl+this.state.shareId+"/"+openid+'/'+this.state.shareNumbers, '_blank');//打开Markdown
    }else{ //打开文件夹     
      fetch(
        global.constants.url+`/getsharefile?fileid=${id}`,
        { method: 'get',}
      )
      .then((response )=> response.json())
      .then(data => {
        console.log(data);
        if(data.code===200){
          let breadcrumb=this.state.Breadcrumb;
          let nav={
            "fileId":id,
            "title":name.slice(0,5)+'...',
            'openId':openid
          }
          breadcrumb.push(nav)
          this.setState({
            shareList:data.typefile,
            Breadcrumb:breadcrumb
          })
        }else{
          Message({
            message: data.text,
            type: 'warning',
          });
        }
      })
    }

  }

  clickNav(fileId,title,openId,index){//点击面包屑导航
    let breadcrumb=this.state.Breadcrumb; 
    console.log('面包屑导航',fileId,title,openId,index);
    if(fileId===breadcrumb[breadcrumb.length-1].fileId){
      
    }else{
      breadcrumb.splice(index+1,breadcrumb.length);
      console.log(breadcrumb)
      fetch(
        global.constants.url+`/getsharefilenav?fileId=${fileId}&openId=${openId}`,
        { method: 'get',}
      )
      .then((response )=> response.json())
      .then(data => {
        console.log(data);
        if(data.code===200){
          this.setState({
            shareList:data.typefile,
            Breadcrumb:breadcrumb
          })
        }else{
          Message({
            message: data.text,
            type: 'warning',
          });
        }

      })
    }

  }
  render() {
    return (
      <div className="share-wrap">
        <div className="share-nav"><Nav pro={this.rout}/></div>
        <ShareNav 
          navclassname={this.state.navClassName}
          user={this.state.userName}
          filename={this.state.shareFile}
          navlist={this.state.Breadcrumb}
          click={(fileId,title,openId,index)=>this.clickNav(fileId,title,openId,index)}
        />
        <File  
          list={this.state.shareList} 
          download={(id,type,name)=>this.downloadmarkdown(id,type,name)}
          open={(id,type,openid,neme)=>this.OpenFile(id,type,openid,neme)}
        />
        <ErrorsBox  type={this.state.errors}/>
      </div>
    );
  }
}

export default Share;
