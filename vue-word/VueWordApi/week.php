<?php
// session_start();
// 输出一周活跃日
$conn = mysqli_connect('localhost','root','','vue-word');
mysqli_set_charset($conn,'utf8');
$username=$_GET['username'];
// print_r($data);
$sqls = "SELECT * FROM day WHERE username='$username' ORDER BY days LIMIT 7";
$row =mysqli_query($conn,$sqls);
while ($data=mysqli_fetch_assoc($row)) {
        $word[]=$data;
}
if(!empty($word)){
    echo json_encode($word);
}
// }

