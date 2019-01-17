<?php
$conn = mysqli_connect('localhost','root','','vue-word');
mysqli_set_charset($conn,'utf8');
$english=$_GET['english'];
$chinese1=$_GET['chinese1'];
$chinese2=$_GET['chinese2'];
// $chinese3=$_GET['chinese3'];
$type=$_GET['type'];
$username=$_GET['username'];
$id=$_GET['id'];
$message=[
    'mes',
    'number',
];
// || empty($chinese3)
if(empty($english) || empty($chinese1) || empty($chinese2) || empty($type)){
    $message=[
        'mes'=>'还有空项未填',
        'number'=>404,
    ];
echo json_encode($message);
// || !preg_match('/^[\x7f-\xff]+$/',$chinese3)
}else if(!preg_match('/^[a-zA-Z]+$/',$english) || !preg_match('/^[\x7f-\xff]+$/',$chinese1) || !preg_match('/^[\x7f-\xff]+$/',$chinese2)){
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
  $chinese2=strFilter($chinese2);
  // $chinese3=strFilter($chinese3);
  // $type=strFilter($type);
  //
    if($username=="潘皇璋" || $username=="Admin"){
       $sql = "SELECT * FROM word WHERE  id='$id'";
    }else{
        $sql = "SELECT * FROM word WHERE  id='$id' AND user='$username' AND english='$english' ";
    }
    // print_r($id);
    $row =mysqli_query($conn,$sql);
    $data=mysqli_fetch_assoc($row);
    if($data){
        // $usql = "SELECT * FROM word WHERE  english='$english'";
        // $urow =mysqli_query($conn,$usql);
        // $udata=mysqli_fetch_assoc($urow);
        // if($udata){
        //   $message=[
        //     'mes'=>'单词重复',
        //     'number'=>404,
        //   ];
        //   echo json_encode($message);
        // }else{
          $updatesql = "UPDATE word SET english='$english',chinese1='$chinese1',chinese2='$chinese2',type='$type' WHERE id='$id'";//,chinese3='$chinese3'
          $row =mysqli_query($conn,$updatesql);
          $message=[
              'mes'=>'修改成功',
              // 'mes'=>$english,
              'number'=>200,
          ];
          echo json_encode($message);
        // }
    }else{
       $message=[
            'mes'=>'修改失败',
            'number'=>400,
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