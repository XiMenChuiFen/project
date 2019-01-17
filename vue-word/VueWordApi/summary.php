<?php
// session_start();
// 输出历史答对单词数
$conn = mysqli_connect('localhost','root','','vue-word');
mysqli_set_charset($conn,'utf8');
$username=$_GET['username'];
// print_r($data);
$sqls = "SELECT * FROM achievement WHERE name='$username' LIMIT 1";
$rows =mysqli_query($conn,$sqls);
$datas=mysqli_fetch_assoc($rows);
echo json_encode($datas);
