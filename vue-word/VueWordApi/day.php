<?php
// session_start();
// 历史活跃天数
$conn = mysqli_connect('localhost','root','','vue-word');
mysqli_set_charset($conn,'utf8');
date_default_timezone_set('PRC');
$username=$_GET['username'];
$time=date("Y-m-d");
//更新活跃日数量
$sqls = "SELECT * FROM achievement WHERE name='$username' AND dates!='$time'";
$rows =mysqli_query($conn,$sqls);
$datas=mysqli_fetch_assoc($rows);

if($datas){


}else{
   $days=$datas['day']+1;
  $updatesql = "UPDATE achievement SET day='$days',dates='$time' WHERE name='$username'";
  $row =mysqli_query($conn,$updatesql);
}
//else{
//   $ins="INSERT INTO achievement VALUES ('','$username','1','','$time')";
//   mysqli_query($conn,$ins);
// }


//在每天练习表记录每次的活跃日时间
$da = "SELECT * FROM day WHERE username='$username' AND  days='$time' LIMIT 1";
$drows =mysqli_query($conn,$da);
$ddaya=mysqli_fetch_assoc($drows);
if($ddaya){

}else{
  $ins="INSERT INTO day VALUES ('','$username','$time')";
  mysqli_query($conn,$ins);
}


//查询数据返回
$sqlss = "SELECT * FROM achievement WHERE name='$username'";
$rowss =mysqli_query($conn,$sqlss);
$datass=mysqli_fetch_assoc($rowss);

echo json_encode($datass);
