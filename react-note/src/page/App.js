import React, { Component } from 'react';
import Nav from '../component/nav/nav';
import FileNav from '../component/fileNav/fileNav';
import FileContent from '../component/fileContent/fileContent';
import Markdown from '../component/markdown/markdown';
import './App.css'
import { Loading } from 'element-react';
function Load (props){
  // console.log(props.load)
  if(props.load){
    return (
      <div className="load">
      <Loading text="加载中，请稍等"  style={{width: '100%',height:'100vh'}}>
      </Loading>
    </div>
  )
  }
  return false
}
class App extends Component {
  constructor(props) {
    super(props);
    this.rout=props; 
    this.state={
      load:false,
    }
    //7200000
    if((localStorage.user===undefined &&  localStorage.username===undefined )||  Number(localStorage.time)+7200000<new Date().getTime()){
      props.history.push('/');
    }
  }
  render() {
    return (
      <div className="wrap">
          <Load load={this.state.load}/> 
          <Nav pro={this.rout}/>
          <div className="content">
              <FileNav />
              <FileContent/>
              <Markdown />
          </div>
      </div>
    );
  }
}

export default App;
