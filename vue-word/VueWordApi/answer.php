<?php
// session_start();
// 单人模式答案判断
$conn = mysqli_connect('localhost','root','','vue-word');
mysqli_set_charset($conn,'utf8');
date_default_timezone_set('PRC');
$english=$_GET['e'];
$chinese=$_GET['c'];
$id=$_GET['id'];
$encryption=$_GET['encryption'];
$username=$_GET['username'];
// print_r($username);
$time=date("Y-m-d");

$sql = "SELECT * FROM word WHERE id='$id' AND encryption='$encryption' LIMIT 1";
$row =mysqli_query($conn,$sql);
$data=mysqli_fetch_assoc($row);
// print_r($data);
if($data){
    if($english==$data['english'] &&$encryption==$data['encryption']  && $chinese==$data['chinese1'] || $chinese==$data['chinese2'] ){
        $message=[
          'mes'=>'答对了',
          'number'=>200,
          'answer'=>$data['chinese1'].";".$data['chinese2'],
        ];
        $sqls = "SELECT * FROM achievement WHERE name='$username'";
        $rows =mysqli_query($conn,$sqls);
        $datas=mysqli_fetch_assoc($rows);
        // print_r($datas);
        if($datas){//答对单词数
            $words=$datas['wordnumber']+1;
            $updatesql = "UPDATE achievement SET wordnumber='$words',dates='$time' WHERE name='$username'";
            $row =mysqli_query($conn,$updatesql);
        }else{
            $ins="INSERT INTO achievement VALUES ('','$username','0','1','0',$time')";
           mysqli_query($conn,$ins);
        }
    }else{
        $message=[
          'mes'=>'答错了',
          'number'=>220,
           'answer'=>$data['chinese1']." , ".$data['chinese2'],
        ];

        $sqls = "SELECT * FROM achievement WHERE name='$username'";
        $rows =mysqli_query($conn,$sqls);
        $datas=mysqli_fetch_assoc($rows);
        // print_r($datas);
        if($datas){//答对单词数
            $nowords=$datas['nowordnumber']+1;
            $updatesql = "UPDATE achievement SET nowordnumber='$nowords',dates='$time' WHERE name='$username'";
            $row =mysqli_query($conn,$updatesql);
        }else{
            $ins="INSERT INTO achievement VALUES ('','$username','0','0','1','$time')";
           mysqli_query($conn,$ins);
        }

    }
    // print_r($data);
    echo json_encode($message);
}else{
    // print_r('错误');
    $message=[
      'mes'=>'题目数据被修改过',
      'number'=>404,
    ];
    echo json_encode($message);
}


