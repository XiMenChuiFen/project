<?php
// session_start();
$conn = mysqli_connect('localhost','root','','vue-word');
mysqli_set_charset($conn,'utf8');
date_default_timezone_set('PRC');
// $jsoncallback = htmlspecialchars($_REQUEST ['callback']);
$english=$_GET['english'];
$chinese1=$_GET['chinese1'];
// $chinese2;
// $type;
$user=$_GET['user'];
$time=date("Y-m-d H:i:s");
$encryption=sha1(date("Y-m-d H:i:s"));
$message=[
    'mes',
    'number',
];
if(empty($english) || empty($chinese1)){ //|| empty($chinese3)
    $message=[
        'mes'=>'还有空项未填',
        'number'=>404,
    ];
echo json_encode($message);
//|| !preg_match("/^[\x7f-\xff]+$/", $chinese3)
}else if(!preg_match('/^[a-zA-Z]+$/',$english) || !preg_match("/^[\x7f-\xff]+$/", $chinese1)){
  $message=[
          'mes'=>'输入有误',
          // 'mes'=>$english,
          'number'=>404,
  ];
  echo json_encode($message);

}else if(strlen($chinese1)>50){
  $message=[
          'mes'=>'中文50个字符',
          'number'=>404,
  ];
  echo json_encode($message);

}else if(strlen($english)>13){
  $message=[
          'mes'=>'英文13个字符',
          'number'=>404,
  ];
  echo json_encode($message);
}else{
  $chinese1=strFilter($chinese1);
  // $chinese2=strFilter($chinese2);
  // $chinese3=strFilter($chinese3);
  // $type=strFilter($type);
   $sql = "SELECT * FROM word WHERE  english='$english' LIMIT 1";
        $row =mysqli_query($conn,$sql);
        $data=mysqli_fetch_assoc($row);
        if($data){
            $message=[
                'mes'=>'已经添加',
                'number'=>404,
            ];
            echo json_encode($message);
        }else{
           // $in="INSERT INTO word VALUES ('','$english','$chinese1','','$user','','$time','$encryption')";
           // mysqli_query($conn,$in);
           $message=[
                'mes'=>'添加成功',
                'number'=>200,
            ];
            echo json_encode($message);
        }
}

function strFilter($str){
    $str = str_replace('`', '', $str);
    $str = str_replace('·', '', $str);
    $str = str_replace('~', '', $str);
    $str = str_replace('!', '', $str);
    $str = str_replace('！', '', $str);
    $str = str_replace('@', '', $str);
    $str = str_replace('#', '', $str);
    $str = str_replace('$', '', $str);
    $str = str_replace('￥', '', $str);
    $str = str_replace('%', '', $str);
    $str = str_replace('^', '', $str);
    $str = str_replace('……', '', $str);
    $str = str_replace('&', '', $str);
    $str = str_replace('*', '', $str);
    $str = str_replace('(', '', $str);
    $str = str_replace(')', '', $str);
    $str = str_replace('（', '', $str);
    $str = str_replace('）', '', $str);
    $str = str_replace('-', '', $str);
    $str = str_replace('_', '', $str);
    $str = str_replace('——', '', $str);
    $str = str_replace('+', '', $str);
    $str = str_replace('=', '', $str);
    $str = str_replace('|', '', $str);
    $str = str_replace('\\', '', $str);
    $str = str_replace('[', '', $str);
    $str = str_replace(']', '', $str);
    $str = str_replace('【', '', $str);
    $str = str_replace('】', '', $str);
    $str = str_replace('{', '', $str);
    $str = str_replace('}', '', $str);
    $str = str_replace(';', '', $str);
    $str = str_replace('；', '', $str);
    $str = str_replace(':', '', $str);
    $str = str_replace('：', '', $str);
    $str = str_replace('\'', '', $str);
    $str = str_replace('"', '', $str);
    $str = str_replace('“', '', $str);
    $str = str_replace('”', '', $str);
    $str = str_replace(',', '', $str);
    $str = str_replace('，', '', $str);
    $str = str_replace('<', '', $str);
    $str = str_replace('>', '', $str);
    $str = str_replace('《', '', $str);
    $str = str_replace('》', '', $str);
    $str = str_replace('.', '', $str);
    $str = str_replace('。', '', $str);
    $str = str_replace('/', '', $str);
    $str = str_replace('、', '', $str);
    $str = str_replace('?', '', $str);
    $str = str_replace('？', '', $str);
    return trim($str);
}