<?php
$conn = mysqli_connect('localhost','root','','vue-word');
mysqli_set_charset($conn,'utf8');
date_default_timezone_set('PRC');
$user=$_GET['user'];
// print_r($user);
if($user=="潘皇璋" || $user=="Admin"){
     $sql = "SELECT id,english,chinese1,chinese2,user,type,time FROM word";//,chinese3
        $row =mysqli_query($conn,$sql);
        while ($data=mysqli_fetch_assoc($row)) {
            $word[]=$data;
        }
          // echo json_encode($word);
}else{
      $sql = "SELECT id,english,chinese1,chinese2,user,type,time FROM word WHERE user='$user'";//chinese3,
        $row =mysqli_query($conn,$sql);
        while ($data=mysqli_fetch_assoc($row)) {
            $word[]=$data;
    }
      // echo json_encode($word);
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
