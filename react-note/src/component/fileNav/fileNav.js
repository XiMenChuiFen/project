import React, { Component } from 'react';
// import { Menu } from 'element-react';
import { Tree } from 'element-react';
import { Button } from 'element-react';
import { Input } from 'element-react';
import { Tooltip } from 'element-react';
import { Message } from 'element-react';
import './fileNav.css'
import emitter from '../../util/events';
import 'whatwg-fetch'
import { HashRouter as Router,Route,Link} from 'react-router-dom';
import '../../util/config'
function AddFile(props) {  //文件添加框
    let addfiletype=props.addfiletype;
    // console.log(props.addfiletype);
    if(addfiletype){
      return (
          <div className="add-file-input">
          <div className="add-file-title">新建文件</div>
            <div className="add-file-text">
            <Input placeholder="请输入文件名" name="fileName" onChange={props.onChangeName}/>
            </div>
            <div className="add-file-button">
            <Button type="warning" onClick={props.cancelAddFile}>取消</Button>
            <Button type="success"  onClick={props.confirmAddFile}>确认</Button>
            </div>
          </div>
      );
    }
    return false;
}

function UpdateFileName(props) {  //文件名更新框
  let updatefiletype=props.updatefiletype;
  if(updatefiletype){
    return (
        <div className="add-file-input">
        <div className="add-file-title">修改文件名</div>
          <div className="add-file-text">
          <Input placeholder={props.filename} name="fileName" onChange={props.onChangeName} />
          </div>
          <div className="add-file-button">
          <Button type="warning" onClick={props.cancelUpdateFile}>取消</Button>
          <Button type="success"  onClick={props.confirmUpdateFile}>确认</Button>
          </div>
        </div>
    );
  }
  return false;
}

function FileMenu (props) {
  if(props.id!==1){
    return (
      <div className="menu-icon">
        <i className="el-icon-edit modify"  onClick={()=>props.modifyFile(props.store,props.data)}></i> 
        <i className="el-icon-delete delete"  onClick={()=>props.deleteFile(props.store,props.data)}></i> 
      </div>
    )
  }
  return false;
}


class FileNav extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      data: [
      {
        id: 1,
        fileId:'1',
        label: '全部文件',
        children: [
          // {
          //   id: 2,
          //   fileId:'1-1',
          //   label: '一级 ',
          //   children: [
          //     {
          //     fileId:'2-1',
          //     id: 3,
          //     label: '二级',
          //   }
          // ]
          // },  
        ]
      }
    ],
      options: {
        children: 'children',
        label: 'label'
      },
      addFileType:false,
      fileName:'',
      selectFileId:1, //选中文件id 1为根文件
      selectFileType:0,
      updatefiletype:false,  //修改文件名框
      updatefilename:'',//文件名
      navDisplay:'block'
    };
    this.id = 100;
  }
  componentDidMount (){
    this.getAllFile();//页面渲染后获取文件
    // 组件装载完成以后声明一个自定义事件
    //监控选中文件

    // //监控选中子文件后父级id变化
    this.eventEmitter = emitter.addListener('changefileid', (id,type) => {
      console.log("选中子文件id：",id,"选中子文件类型："+type);
      this.setState({
        selectFileId:id,
        selectFileType:type
      })
    });

    // document.addEventListener('click', this.wclick);

    this.navType=emitter.addListener('navblock',(type)=>{
      this.setState({
        navDisplay:type,
      })
    })

  }


  renderContent(nodeModel, data, store) {
    return (
      <span>
        <span className="file">
          <span className="file-icon"></span>
          <span className="file-title">{data.label}</span>
        </span>
        <span className="file-menu">
          <FileMenu id={data.id} store={store} data={data} 
            deleteFile={(store,data)=>this.deleteFile(store,data)}
            modifyFile={(store,data)=>this.modifyFile(store,data)}
          />
          {/* <i className="el-icon-menu" onClick={ () => this.fileMenu(store, data) }></i>  */}
        </span>    
      </span>);
  }
  deleteFile(store, data){
    console.log('删除根目录文件')
    console.log(data.id,);
    // let list=this.state.data;
    // let id=data.id;
    fetch(
      global.constants.url+'/delectfile',
      { method: 'post',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `t=${localStorage.user}&fileid=${data.id}`
    })
    .then((response )=> response.json())
    .then(datas => {
      console.log(datas);
      this.getAllFile();
      emitter.emit('delectrootfile');
      Message({
        message: datas.text,
        type: "success",
      });
    })

  }
  modifyFile(store, data) {
    console.log('根目录文件修改窗')
    this.setState({
      updatefiletype:true,
      updatefilename:data.label,
      updatefileid:data.id
    })
  }
  cancelUpdateFile(){
    console.log('取消修改');
    this.setState({
      updatefiletype:false
    })
  }
  confirmUpdateFile(){
    console.log('确认修改');
    this.setState({
      updatefiletype:false
    })
    fetch(
      global.constants.url+'/updatename',
      { method: 'post',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `t=${localStorage.user}&fileid=${this.state.updatefileid}&name=${this.state.updatefilename}`
    })
    .then((response )=> response.json())
    .then(data => {
      console.log(data);
      let messType="";
      if(data.code===200){
        messType="success";
        this.getAllFile();
      }else{
        messType="warning";
      }
      Message({
        message: data.text,
        type: messType,
      });
      
    })
    console.log(this.state)
  }
  getFileName(e){ //获取输入文件名
    console.log(e)
    let name=this.state.updatefilename;
    name=e.replace(/^\s*|\s*$/g,"");
    this.setState({
      updatefilename:name
    })
  }

  addFileButton(){
    console.log('新建文件夹');
    if(this.state.selectFileType===0){
      this.setState({
        addFileType: true,
      }) //恢复初始值
    }else{
      Message({
        message: 'Markdown内不可新建文件夹',
        type: 'warning',
      });
    }
  };
  openNav(e){
    // console.log('展开导航',e);
  };
  clickNav(e){//选中的文件
    emitter.emit('selectrootfile',e.id);
    emitter.emit('nomarkdown',0); //传参数到编辑器作用 隐藏编辑器
    this.setState({
      selectFileId:e.id
    })
    console.log('根目录:',e);
  };
  cancelAddFile(){
    console.log('取消添加');
    this.setState({
      addFileType: false
    })
  }
  confirmAddFile(){ //确认提交到数据库
    console.log('确认添加',this.state.fileName,this.state.selectFileId);
    if(this.state.fileName!=='' && this.state.selectFileId>0){
      fetch(
        global.constants.url+'/addfile',
        { method: 'post',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `t=${localStorage.user}&id=${this.state.selectFileId}&filename=${this.state.fileName}`
      })
      .then((response )=> response.json())
      .then(data => {

        console.log(data);
        let messType="";
        if(data.code===200){
          messType="success";
          this.setState({ //文件夹添加成功
              addFileType: false,
          },this.getAllFile())
          emitter.emit('selectrootfile',this.state.selectFileId,data.file.fileId);  //添加文件后更新子目录文件
        }else{
          messType="warning";
        }
        Message({
          message: data.text,
          type: messType,
        });

      })
    }else{
      Message({
        message: '文件名不可为空',
        type: 'warning',
      });
    }
  }
  onChangeName(e){
    // console.log(e,'获取input输入内容')
    this.setState({
      fileName: e.replace(/^\s*|\s*$/g,"")// 去掉左右空格
    })

  }

  getAllFile(){
    // console.log('获取所有文件夹');
    fetch(
      global.constants.url+'/getfile',
      { method: 'post',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `t=${localStorage.user}`
    })
    .then((response )=> response.json())
    .then(data => {
      console.log(data);
      this.setState({
        data: [
          {
            id: 1,
            fileId:'1',
            label: '全部文件',
            children: data.allfile
          }
        ]
      })

    })
  }
  // navNone(){ 
  //   console.log('隐藏导航');
  //   this.setState({
  //     navDisplay:'none'
  //   })
  //   emitter.emit('navnone',"block");
  // }
  render() {
    const { data, options } = this.state;
    return (
      <div className="file-name">
        <div className="new-file">
          <Button type="primary" icon="plus" onClick={()=>this.addFileButton()}>文件夹</Button>
        </div>
        <AddFile 
          addfiletype={this.state.addFileType} 
          cancelAddFile={()=>this.cancelAddFile()} 
          confirmAddFile={()=>this.confirmAddFile()} 
          onChangeName={(e)=>this.onChangeName(e)}
        />
        <div className="scroll">
        <Tree
          data={data}
          options={options}
          nodeKey="id"
          expandOnClickNode={false}
          highlightCurrent={true}
          defaultExpandAll={true}
          renderContent={(...args)=>this.renderContent(...args)}
          onNodeExpand={(...args)=>this.openNav(...args)}//展开导航
          onNodeClicked={(...args)=>this.clickNav(...args)}//点击导航
        />
        </div>
        <div className="nav-foot">
            {/* <Button type="danger" icon="delete" size="small"> 回收站</Button> */}
            <Link to="/recycle"><Button type="danger" icon="delete" size="small"> 回收站</Button></Link>
        </div>
        <UpdateFileName 
        updatefiletype={this.state.updatefiletype} 
        filename={this.state.updatefilename}
        cancelUpdateFile={()=>this.cancelUpdateFile()}
        confirmUpdateFile={()=>this.confirmUpdateFile()}
        onChangeName={(e)=>this.getFileName(e)}
        />
      </div>
    )
  }

}

export default FileNav;
