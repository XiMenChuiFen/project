import React, { Component } from 'react';
import { Input } from 'element-react';
import { Button } from 'element-react';
import { Message } from 'element-react';
import { Loading } from 'element-react';
import 'whatwg-fetch'
import './login.css'
import '../util/config'
function Load (props){
  // console.log(props.load)
  if(props.load){
    return (
      <div className="load">
      <Loading text="登录中"  style={{width: '100%',height:'100vh'}}>
      </Loading>
    </div>
  )
  }
  return false
}

class Login extends Component {
  constructor(props) {
    super(props);
    // this.apiUrl='http://10.21.40.205/MyNoteApi/public'
    this.state={
      name:'',
      pass:'',
      load:false,
    }
  }
  componentDidMount (){
    this.autoLogin();
  }
  autoLogin(){
    let _this=this;
    if(localStorage.user!==undefined){
      // console.log(localStorage.user) 
      //7200000
      if(Number(localStorage.time)+7200000>new Date().getTime()){
        this.setState({
          load: true,  //显示自动登录加载
        })
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
        // console.log(data);
        let messType="";
        if(data.code===200){
          messType="success";
          _this.props.history.push('/index');
        }else{
          _this.setState({
            load: false,  //显示自动登录加载
          })
          messType="warning";
        }
        Message({
          message: data.text,
          type: messType,
        });
      })
    }else{
      Message({
            message: '账号登录过期,请登录!',
            type: 'warning',
          });
          this.setState({
            load: false,  //显示自动登录加载
          })
    }

    }

  }
  loginButton(){  //登录
    if(this.state.name==="" || this.state.pass===""){
      Message({
        message: '账号与密码不可为空',
        type: 'warning',
      });
    }else{
      // console.log('登录按钮：',this.state); 
      fetch(
        global.constants.url+'/login',
      { method: 'post',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `name=${this.state.name}&pass=${this.state.pass}`
      })
      .then((response )=> response.json())
      .then(data => {
        // console.log(data)
        let messType="";
        if(data.code===200){
          localStorage.user=data.userT;
          localStorage.time=new Date().getTime();
          localStorage.username=data.user.name;
          this.props.history.push('/index');
          // console.log(global.constants.type)
          messType="success";
        }else {
          messType="warning";
        }
        Message({
          message: data.text,
          type: messType,
        });

      })
    }
  }
  name(e){
    // console.log('账号：',e)
    this.setState({
      name: e.replace(/^\s*|\s*$/g,"")// 去掉左右空格
    })
  }
  pass(e){
    // console.log('密码：',e)
    this.setState({
      pass: e.replace(/^\s*|\s*$/g,"")// 去掉左右空格
    })
  }
  render() {
    return (
      <div>
      <Load load={this.state.load}/> 
      <div className="login-wrap">
        <div className="login">
          <h5>登录 <span>测试账号admin,密码admin</span></h5>
          <div className="login-input"><span>账号</span><Input placeholder="请输入账号"  onChange={(e)=>this.name(e)}/></div>
          <div className="login-input"><span>密码</span><Input placeholder="请输入密码" type="password" onChange={(e)=>this.pass(e)}/></div>
          <div className="login-button">
            <Button type="primary" onClick={()=>this.loginButton()} disabled={this.state.name!=="" && this.state.pass!==""?false:true }>登录</Button>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Login;
