<?php
$conn = mysqli_connect('localhost','root','','vue-word');
mysqli_set_charset($conn,'utf8');
$id=$_GET['id'];
$username=$_GET['username'];
// print_r($username);
$message=[
    'mes',
    'number',
];
// print_r($username);
if(empty($username) || empty($id)){
     $message=[
        'mes'=>'删除失败,用户状态出错',
        'number'=>404,
    ];
    echo json_encode($message);
}else if($username=="潘皇璋" || $username=="Admin"){
    $sql ="SELECT * FROM word WHERE id='$id'";
    $row =mysqli_query($conn,$sql);
    $data=mysqli_fetch_assoc($row);
    if($data){
        $dele= "DELETE FROM word WHERE id='$id'";
        $drow =mysqli_query($conn,$dele);
        $message=[
                'mes'=>'删除成功',
                'number'=>200,
        ];
        echo json_encode($message);
    }
}else{
    $sql ="SELECT * FROM word WHERE id='$id' AND user='$username'";
    // print_r($id);
    $row =mysqli_query($conn,$sql);
    $data=mysqli_fetch_assoc($row);
    if($data){
        $dele= "DELETE FROM word WHERE id='$id' AND  user='$username'";
        $drow =mysqli_query($conn,$dele);
        $message=[
            'mes'=>'删除成功',
            'number'=>200,
        ];
        echo json_encode($message);
    }else{
        $message=[
            'mes'=>'删除失败',
            'number'=>404,
        ];
        echo json_encode($message);
    }

}