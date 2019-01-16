import React, { Component } from 'react';
import './errors.css'
import { HashRouter as Router,Route,Link} from 'react-router-dom';
class Errors extends Component {
  render() {
    return (
      <div className="errors-text">非法URL，请点击返回<Link to="/index" >首页</Link></div>
    )
  }
}

export default Errors;