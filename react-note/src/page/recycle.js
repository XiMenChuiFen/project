import React, { Component } from 'react';
import './recycle.css'
import Nav from '../component/nav/nav';
import Errors from '../component/errors/errors'
import { Message } from 'element-react';
import { Button } from 'element-react';


function Lists(props){

  let list=props.list.map((list,index) =>
    <div className="reaycle-list" key={index}>
      <div className="reaycle-file-name">
        <span className={list.type===1?'share-mark-icon':'share-file-icon'}>{list.type===1?'M':'F'}</span>
        <span>{list.label}</span>
      </div>
      <div className="reaycle-file-time">{list.time}</div>
      <div className="reaycle-file-button">
        <Button type="info" onClick={()=>props.restore(list.id,index)}><span>恢复</span></Button>
        <Button type="danger" onClick={()=>props.delect(list.id,index)}><span >删除</span></Button>
      </div>
    </div>
  );
  if(props.list.length===0){
    return (
      <div className="no-list">没有数据!</div>
    )
  }else{
    return list;
  }
}

class Recycle extends Component {

  constructor(props){
    super(props);
    this.rout=props; 
    this.state={
      list:[], //数据渲染
    }
  }
  componentDidMount(){
    this.loginType();
    this.getFile();
  }
  loginType(){ //判断用户
    let _this=this;
    if(localStorage.user!==undefined){
      //7200000
      if(Number(localStorage.time)+7200000>new Date().getTime()){
        fetch(
          global.constants.url+'/autologin',
          { method: 'post',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: `t=${localStorage.user}`
        })
        .then((response )=> response.json())
        .then(data => {
          console.log(data);
          if(data.code!==200){
            this.props.history.push('/');
          }
        })
      }else{
        this.props.history.push('/');
      }

    }else{
      this.props.history.push('/');
    }
  }
  getFile(){
    fetch(
      global.constants.url+`/getrecyclefile?t=${localStorage.user}`,
      { method: 'get',
    })
    .then((response )=> response.json())
    .then(data => {
      console.log(data);
      if(data.code===200){
        this.setState({
          list:data.allfile
        })
      }
    })
  }
  delect(id,index){
    console.log('删除',id,index);
    fetch(
      global.constants.url+'/recycledelect',
      { method: 'post',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `t=${localStorage.user}&id=${id}`
    })
    .then((response )=> response.json())
    .then(data => {
      console.log(data);
      if(data.code===200){

        let list=this.state.list;
        list.splice(index,1);
        console.log(list);
        this.setState({
          list:list
        })

      }else{
        Message({
          message: data.text,
          type: "warning",
        });
      }

    })

    
  }
  restore(id,index){
    console.log('恢复',id,index);
    fetch(
      global.constants.url+'/recyclerestore',
      { method: 'post',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `t=${localStorage.user}&id=${id}`
    })
    .then((response )=> response.json())
    .then(data => {
      console.log(data);
      if(data.code===200){

        let list=this.state.list;
        list.splice(index,1);
        console.log(list);
        this.setState({
          list:list
        })

      }else{
        Message({
          message: data.text,
          type: "warning",
        });
      }

    })

  }
  render(){
    return(
      <div className="reaycle-wrap">
        <div className="share-nav"><Nav pro={this.rout}/></div>
        <div className="reaycle">
          <div className="reaycle-lists-title">
            <div className="reaycle-lists-file-name">文件名</div>
            <div className="reaycle-lists-file-time">修改时间</div>
            <div className="reaycle-lists-file-time">操作</div>
          </div>
          <Lists 
            list={this.state.list} 
            delect={(id,index)=>this.delect(id,index)}
            restore={(id,index)=>this.restore(id,index)}
          />
        </div>
      </div>
      
    )
  }

}
export default Recycle;