<?php
// session_start();
$conn = mysqli_connect('localhost','root','','vue-word');
mysqli_set_charset($conn,'utf8');
date_default_timezone_set('PRC');
$sql = "SELECT id,english,chinese1,chinese2,user,type,time FROM word";//,chinese3
    $row =mysqli_query($conn,$sql);
    while ($data=mysqli_fetch_assoc($row)) {
        $word[]=$data;
    }
if(!empty($word)){
    echo json_encode($word);
}else{
    $message=[
      'mes'=>'没有数据',
      'number'=>404,
    ];
    echo json_encode($message);
}
