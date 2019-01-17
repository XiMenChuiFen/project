// import 'config.js';

$(function(){
// console.log(1);
var userName = '';
  //获取用户信息
  $.ajax({
        type: 'get',
        url: 'http://10.21.40.205/VueWordApi/userss.php?key='+GetQueryString('key')+'',
        dataType: 'jsonp',
        jsonpCallback: 'fun',
        // data: {session: 1},
        success: function(msg){
          userName = msg;
          // $('input').eq(1).val(msg);
            // alert(msg);
          // console.log('10.21.40.40/star2/'+JSON.parse(msg)[2]);
          // $('.user_photo').style.background="#000";
          console.log(userName);
        }
    });
  function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
})