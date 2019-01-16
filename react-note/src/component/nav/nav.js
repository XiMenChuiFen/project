import React, { Component } from 'react';
import './nav.css'
import { HashRouter as Router,Route,Link} from 'react-router-dom';

function User (props){
  // console.log(localStorage.user)
  if((localStorage.user===undefined &&  localStorage.username===undefined)){
    return false
  }else{
    return  (
      <div className="user">
        <div className="user-name">{props.name}</div>
        <div className="out-icon" onClick={props.out}></div>
      </div>
    )
  }
}

function Links(props){
  console.log(props)
  if(props.routerText==='/index'){
    return ( <li><Link to="/index" className={props.routerText==='/index'?'nav-highlight':'nav-highlight-none'}>文件</Link></li>)
  }else if(props.routerText==='/share/:id?'){
    return (<li><Link to="/share" className={props.routerText==='/share/:id?'?'nav-highlight':'nav-highlight-none'}>分享</Link></li>)
  }else if(props.routerText==='/openmarkdown/:shareid?/:id?/:number?'){
    return (<li><Link to="/openmarkdown" className={props.routerText==='/openmarkdown/:shareid?/:id?/:number?'?'nav-highlight':'nav-highlight-none'}>Markdown</Link></li>)
  }else{
    return (<li><Link to="/openmarkdown" className={props.routerText==='/recycle'?'nav-highlight':'nav-highlight-none'}>回收站</Link></li>)
  }
}


class Nav extends Component {
  constructor(props) {
    super(props);
    this.prop=props.pro;
    this.name=localStorage.username;
    this.routerText=this.props.pro.match.path;
    // console.log(props)
  }
  outLogin(e){//退出登录
    // console.log(11);
    localStorage.clear();
    e.history.push('/');
  }
  componentDidMount (){

  }
  render() {
    return (
      <div className="nav-box">
        <div className="nav-left">
          <div className="logo-text"><Link to="/index">个人笔记</Link></div>
          <Router>
            <div className="nav-router">
              <ul>
                <Links routerText={this.routerText}/>
                {/* <li><Link to="/index" className={this.routerText=='/index'?'nav-highlight':'nav-highlight-none'}>文件</Link></li> */}
                {/* <li><Link to="/myshare" className={this.routerText=='/share'?'nav-highlight':'nav-highlight-none'}>分享</Link></li> */}
              </ul>
            </div>
          </Router>
        </div>
        <User out={()=>this.outLogin(this.prop)} name={this.name}/>
      </div>
    );
  }
}


export default Nav;
