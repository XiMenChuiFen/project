<?php

$conn = mysqli_connect('localhost','root','','vue-word');
mysqli_set_charset($conn,'utf8');
date_default_timezone_set('PRC');
$wordid=$_GET['wordid'];
$username=$_GET['username'];
$message=[
    'mes',
    'number',
];
// print_r($username);
$sql = "SELECT * FROM mycollection WHERE  wordid='$wordid' AND username ='$username' LIMIT 1";
$row =mysqli_query($conn,$sql);
$data=mysqli_fetch_assoc($row);
if($data){
  $dele="DELETE FROM mycollection WHERE wordid='$wordid'";
  $dele_row =mysqli_query($conn,$dele);
  $message=[
      'mes'=>'取消收藏',
      'number'=>404,
  ];
  echo json_encode($message);
}else{
   $in="INSERT INTO mycollection VALUES ('','$wordid','$username')";
   mysqli_query($conn,$in);
   $message=[
        'mes'=>'收藏成功',
        'number'=>200,
    ];
    echo json_encode($message);
}

