<?php
/**
获取题目
 */
$conn = mysqli_connect('localhost','root','','vue-word');
mysqli_set_charset($conn,'utf8');
date_default_timezone_set('PRC');
$options=$_GET['options'];//单词表
$time=$_GET['time'];//计时时间
$number=$_GET['number'];//题目数量
$enemy=$_GET['enemy'];//敌方用户
$user=$_GET['user'];//发起者
if(!empty($options) && !empty($time) && !empty($number)){
    if($options=="allword"){//选所有的单词
         $getword="SELECT id,chinese1,chinese2,encryption,english FROM word order by rand() LIMIT $number";
    }else{//选某个人的单词
        $getword="SELECT id,chinese1,chinese2,encryption,english FROM word WHERE user='$options' order by rand() LIMIT $number";
    }

    $row =mysqli_query($conn,$getword);
    while ($data=mysqli_fetch_assoc($row)){
        $word[]=$data;
        $battle[]=$data['id'];//存查到的数据的所有id,多人模式下用到

    }
    if(!empty($word)){
            $message=[
              'data'=>$word,
              'time'=>$time,//转秒
              'number'=>200,
            ];
        if(empty($enemy)){//单人模式

        }else{//多人模式
            // print_r('2');
            $b=implode(",",$battle);
            // $e=implode(",",$enemy);
            $tim=date("Y-m-d H:i:s");
            $in="INSERT INTO battle VALUES ('','$b','$tim','$time','$enemy','$user','false')";
            mysqli_query($conn,$in);
        }
         echo json_encode($message);
    }else{
        $message=[
          'mes'=>'此用户没有单词数据',
          'number'=>404,
        ];
        echo json_encode($message);
    }

}else{
    $message=[
      'mes'=>'参数错误',
      'number'=>404,
    ];
    echo json_encode($message);
}
