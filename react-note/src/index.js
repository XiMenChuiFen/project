import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import App from './page/App';
import Login from './page/login';
import Share from './page/share';
import OpenMarkdown from './page/openMarkdown';
import Recycle from './page/recycle';
import 'element-theme-default';
import './index.css';
import { HashRouter as Router,Route,Link} from 'react-router-dom';
ReactDOM.render(
  <Router>
      <div>
        <Route path="/login" component={Login}/>
        <Route exact path="/" component={Login}/>
        <Route path="/index" component={App}/>
        <Route path="/share/:id?" component={Share}/>
        <Route path="/openmarkdown/:shareid?/:id?/:number?" component={OpenMarkdown}/>
        <Route path="/recycle" component={Recycle}/>
      </div>
  </Router>,
    // <App />, 
  document.getElementById('root')
);

