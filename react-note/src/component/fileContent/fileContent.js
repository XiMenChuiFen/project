import React, { Component } from 'react';
import './fileContent.css'
import { Input } from 'element-react';
import { Button } from 'element-react';
import emitter from '../../util/events';
import { Message } from 'element-react';
import 'whatwg-fetch'
class AllListMenu extends Component {
  render(){
    return(
      <div className="all-list-menu">
        <div><span>创建时间</span><span><i className="el-icon-check"></i></span></div>
        <div><span>修改时间</span><span><i className="el-icon-check"></i></span></div>
      </div>
    )
  }
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

function Inputs(props){
// class Inputs extends Component {  //搜索
  // render() {
    return (
      <div className="input">
        <div className="return-top" onClick={()=>props.click()}></div>
        <div  className="input-box"><Input placeholder="请输入内容" icon="search"  onChange={props.change}/></div>
        {/* <i className="el-icon-menu"></i> */}
        {/* <AllListMenu /> */}
      </div>
    );
  // }
// }
}

function ListMenu (props){//list菜单
  if(props.type===0){
    return (
      <div className="list-menu">
        <div className="list-munu-i">
          <i className="el-icon-edit" onClick={()=>props.modifyclick(props.id,props.ind)}></i>     
          <i className="el-icon-delete2" onClick={()=>props.delectclick(props.id,props.ind)}></i> 
          <div className="share" onClick={()=>props.share(props.id,props.type,props.fileId,props.ind)}></div>  
        </div>   
      </div>
    )
  }else{
    return (
      <div className="list-menu">
        <div className="list-munu-i">
          <i className="el-icon-delete2" onClick={()=>props.delectclick(props.id,props.ind)}></i>    
          <div className="share" onClick={()=>props.share(props.id,props.type,props.fileId,props.ind)}></div>  
        </div>
      </div>
    )
  }
}

function ListMess(props){ //列表底部提示
  if(props.list.length===0){
    return (<div className="list-no">{props.searchno}没有文件</div>)
  }else{
    return ( <div className="list-message">到底了</div>)
  }
}

function FileType(props){ //显示不同类型文件
  if(props.type===0){
    return (<div className="list-icon list-icon2">F</div>);
  }else if(props.type===1){
    return (<div className="list-icon">M</div>);
  }

}


function List(props) { //文件列表
    const list = props.list;
    const listItems = list.map((list,index) =>
      <div className="lists-box" key={list.id}>
      <div  onClick={()=>props.click(list,list.id,list.type,list.fileId)}  className={list.id ===props.clickFileId ? 'lists click-lists' : 'lists'}>
        <div className="list-header">
            <div className="list-header-left">
              <FileType type={list.type}/>
              <div className="list-title">{list.label}</div>
            </div>
            {/* <div className="share-type"></div> */}
        </div>
        <div className="list-time">
          <span>{list.time}</span>   
          <div className={list.share===1?'share-type':''}></div> 
        </div>
      </div>
        <ListMenu  
          type={list.type} 
          fileId={list.fileId}
          delectclick={props.delectclick} 
          id={list.id} 
          ind={index} 
          modifyclick={props.modifyclick}
          share={props.shareclick}
          />
      </div>
    );

    return (
        <div className="list-scroll">
          {listItems}
          <ListMess list={list} searchno={props.searchno}/>
        </div>
    );
}


function ListFootAdd (props) {//底部添加按钮
  // console.log(props.pro)
  if(props.pro===0){
    return (
      <div className="list-foot-add">
        <Button type="primary" icon="plus" onClick={props.click} className="add-mar-button" >Markdown</Button>
      </div>
    )
  }else{
    return (
      <div className="list-foot-add">
      </div>
    )
  }
}

function Share (props) { //分享弹窗
  return (
    // <div  style={{display:props.shareBox}}>
    <div className="share-box" style={{display:props.shareBox}}>
      <div className="share-title">分享地址(未完成)</div>
      <div className="share-url">
        <Input placeholder="分享地址" value={props.shareUrl} id="url" />
        <Button type="primary" onClick={props.copyUrl} >复制</Button>
      </div>
      <div className="share-button">
          <Button type="text" className="share-no" onClick={props.shareNo}>取消分享</Button>
          <Button type="text" onClick={props.shareOk}>确认分享</Button>
      </div>
    </div>
    // </div>
  )
}


class FileContent extends Component { 
  constructor(props) {
    super(props);
    this.state = {
        fileList:[],
        selectFileId:1,//点击选中的文件id
        selectFileType:-1, //选中类型   0选中文件 1选中markdow 初始-1什么都没选中
        clickFileId:0,// markdown或子文件id  0和-1 取消选中高亮
        returnid:0,//当前文件的父id
        updatefiletype:false, //修改文件名显示开关
        updatefileindex:0,//下标
        updatefileid:0,//id
        updatefilename:'',//输入的文件
        searchtext:'',//搜索输入的字符
        searchno:'',//搜索为空时
        shareBox:"none",//分享框
        shareUrl:'',//分享链接
        shareId:'',//分享id
        shareIndex:0//分享数组下标
    };
  }
  componentDidMount() {
    // 组件装载完成以后声明一个自定义事件
    //监控根目录选中文件
    this.eventEmitter = emitter.addListener('selectrootfile', (id,forid) => {
      this.setState({
        selectFileId:id,  //选中为文件  id为文件id
        returnid:forid,
      })
      if(id!==1){
        fetch(
          global.constants.url+'/gettypefile',
          { method: 'post',
          headers: {
            'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
          },
          body: `t=${localStorage.user}&fileid=${id}`
        })
        .then((response )=> response.json())
        .then(data => {
          this.setState({
            fileList:data.typefile,
            selectFileType:0,

          })
          // console.log(data);
        })
      }else{
        this.setState({
          fileList:[],
          selectFileType:-1,
        })
      }

    });

    //删除根目录时 清空子目录
    this.delectrootfile = emitter.addListener('delectrootfile', () => {
      this.setState({
        fileList:[],
      })
    })

     this.updatemarkdown=emitter.addListener('updatemarkdown', (data) => {
        console.log(data,'更新markdow后')
        let fileList=this.state.fileList;
        for(let i=0;i<fileList.length;i++){
          if(fileList[i].id=== Number(data.id)){
            fileList[i].label=data.title
            fileList[i].markdown=data.markdown
            fileList[i].time=data.time
          }
        }
        this.setState({
          fileList:fileList
        })
        console.log(this.state.fileList)
      })
    
  }
  addMarkdown(){
    console.log('新建Markdown')
    console.log('父级id:',this.state.selectFileId,'父级类型：',this.state.selectFileType);
    if(this.state.selectFileId!==1 && this.state.selectFileType===0){
      fetch(
        global.constants.url+'/addmarkdown',
        { method: 'post',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `t=${localStorage.user}&fileid=${this.state.selectFileId}`
      })
      .then((response )=> response.json())
      .then(data => {
        let messType="";
        let fileList=this.state.fileList;
        if(data.code===200){
          messType="success";
          fileList.push(data.file);
          this.setState({
            fileList:fileList
          });
        }else{
          messType="warning";
        }
        Message({
          message: data.text,
          type: messType,
        });

      })
    }
  }
  selectFile(file,fileid,filetype,returnid){
    console.log('选中markdown或文件');
    emitter.emit('changefileid',fileid,filetype);//父级id变化
    console.log(file,"选中文件id:",fileid,'选中类型',filetype,'返回id:',returnid,'选中父级id:',this.state.selectFileId)
    this.setState({ 
      clickFileId:fileid,//点击选中子目录markdown或文件id
      // selectFileId:fileid,// markdown或子文件id  
      //selectFileType:filetype,//选中类型  0选中文件 1选中markdow 初始-1什么都没选中
      // returnid:returnid,//当前文件的父id
    })
    if(filetype===0){
      this.setState({
        selectFileId:fileid,// markdown或子文件id  
        returnid:returnid,//当前文件的父id
      })
      emitter.emit('markdown',{},0);//传空的对象到编辑器 0 隐藏编辑器
      fetch(
        global.constants.url+'/gettypefile',
        { method: 'post',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `t=${localStorage.user}&fileid=${fileid}`
      })
      .then((response )=> response.json())
      .then(data => {
        console.log(data);
        this.setState({
          fileList:data.typefile,
        })
      })
    }else if(filetype===1){

      console.log('传markdown对象到编辑组件：',file);
      emitter.emit('markdown',file, 1);
    }

  }
  returnTop(){
    console.log('返回上级文件');
    console.log('返回id',this.state.returnid,'选中父级id:',this.state.selectFileId,'选中类型',this.state.selectFileType);
    if(this.state.returnid===0){
      Message({
        message:'已经是根目录了',
        type: "warning",
      });
    }else{
      emitter.emit('markdown',{}, 0);//传空的对象到编辑器 0 隐藏编辑器
      fetch(
        global.constants.url+'/returnfile',
        { method: 'post',
        headers: {
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: `t=${localStorage.user}&fileid=${this.state.returnid}`
      })
      .then((response )=> response.json())
      .then(data => {
        console.log(data);
        if(data.code===220){
          Message({
            message: data.text,
            type: "warning",
          });
        }else{
          this.setState({
            returnid:data.id, //上级id
            fileList:data.file,
            selectFileType:0, // 恢复选择中文件类型
            selectFileId:data.file[0].fileId, //选中文件id
            clickFileId:-1, //取消高亮,
          })
          emitter.emit('changefileid',data.file[0].fileId,0); //父级id变化
        }
        
      })

    }
  }

  delectFile(id,index){
    console.log('删除文件')
    console.log('文件id',id,'数组下标:',index,this.state.fileList);
    fetch(
      global.constants.url+'/delectfile',
      { method: 'post',
      headers: {
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `t=${localStorage.user}&fileid=${id}`
    })
    .then((response )=> response.json())
    .then(data => {
      console.log(data);
      let list=this.state.fileList;
      list.splice(index,1)
      console.log(list);
      this.setState({
        fileList:list
      },function(){
        Message({
          message: data.text,
          type: "success",
        });
      })
    })
  }
  modifyFile(id,index){
    console.log('修改文件名');
    console.log(id,index);
    let list=this.state.fileList[index].label;
    this.setState({
      updatefiletype:true,
      updatefileindex:index,
      updatefileid:id,
      updatefilename:list
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
      let list=this.state.fileList;
      list[this.state.updatefileindex].label=this.state.updatefilename
      this.setState({
        fileList:list
      },function(){
        Message({
          message: data.text,
          type: "success",
        });
      })
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
  change(e){ //搜索文件
    console.log(e,this.state.fileList);
    // if(e===''){
    //   this.setState({
    //     fileList:[],
    //     searchno:'搜索完成'
    //   })
    // }else{
      fetch(
        global.constants.url+'/searchfile',
        { method: 'post',
        headers: {
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
      },
      body: `t=${localStorage.user}&filename=${e.replace(/^\s*|\s*$/g,"")}`
      })
      .then((response )=> response.json())
      .then(data => {
        console.log(data);
        let text='';
        if(data.code===202){
          text=data.text;
        }
        if(data.code===200){
          this.setState({
            fileList:data.typefile,
            searchno:text,
          })
        }else{
          this.setState({
            fileList:[],
            searchno:text,
          })
        }
        // Message({
        //   message: data.text,
        //   type: "success",
        // });
      })
    // } 
  }

  share(id,type,fileid,index){
    console.log("分享")
    console.log('id:',id,'类型:',type,fileid,index); 
    // console.log(this.state.fileList);
    
    fetch(
      global.constants.url+'/share',
      { method: 'post',
      headers: {
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: `t=${localStorage.user}&fileid=${id}&type=${type}&forid=${fileid}`
    })
    .then((response )=> response.json())
    .then(data => {
      console.log(data);
      if(data.code===200){
        let fileList=this.state.fileList;
        fileList[index].share=1;
        this.setState({
          shareBox:'block',
          shareUrl:global.constants.shareUrl+data.shareId,
          shareId:data.shareId,
          fileList:fileList,
          shareIndex:index
        })
      }
    })
  }
  shareOk(){
    console.log('确认分享');
    this.setState({
      shareBox:'none',
    })
    Message({
      message: "分享成功",
      type: "success",
    });
  }
  shareNo(){
    console.log('取消分享',this.state.shareId);
    fetch(
      global.constants.url+'/shareCancel',
      { method: 'post',
      headers: {
      'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: `t=${localStorage.user}&shareid=${this.state.shareId}`
    })
    .then((response )=> response.json())
    .then(data => {
      console.log(data);
      let type;
      if(data.code===200){
        let fileList=this.state.fileList;
        fileList[this.state.shareIndex].share=0;
        type='success';
        this.setState({
          shareBox:'none',
          fileList:fileList
        })
      }else{
        type='warning';
      }
      Message({
        message: data.text,
        type: type,
      });

    })
  }
  copyUrl(){
    console.log('复制url地址');
     //创建range对象
     const range = document.createRange();
     //selectNode选择选择整个节点，包括子节点 === selectNodeContents 选择节点的子节点
     range.selectNode(document.getElementById('url'));

     //创建selection对象
     const selection = window.getSelection();

     //移除所有的range对象
     if(selection.rangeCount > 0) {

         selection.removeAllRanges()
     };

     //将range添加到selection
     selection.addRange(range);

     //复制内容
     document.execCommand('copy');

  }
  render() {
    return (
      <div className="file-content">
        <UpdateFileName updatefiletype={this.state.updatefiletype} 
        filename={this.state.updatefilename}
        cancelUpdateFile={()=>this.cancelUpdateFile()}
        confirmUpdateFile={()=>this.confirmUpdateFile()}
        onChangeName={(e)=>this.getFileName(e)}
        />
        <Share 
        shareBox={this.state.shareBox}
        shareUrl={this.state.shareUrl}
        shareOk={()=>this.shareOk()}
        shareNo={()=>this.shareNo()}
        copyUrl={()=>this.copyUrl()}
        />
        <Inputs click={()=>this.returnTop()} 
        change={(e)=>this.change(e)} 
        />
        <List list={this.state.fileList}  searchno={this.state.searchno} 
        clickFileId={this.state.clickFileId} 
        click={(e,fileid,filetype,returnid)=>this.selectFile(e,fileid,filetype,returnid)}
        delectclick={(id,ind)=>this.delectFile(id,ind)}
        modifyclick={(id,ind)=>this.modifyFile(id,ind)}
        shareclick={(id,type,fileid,ind)=>this.share(id,type,fileid,ind)}
        />
        <ListFootAdd  
        click={()=>this.addMarkdown()} 
        pro={this.state.selectFileType} 
        />
      </div>
    );
  }
}

export default FileContent;