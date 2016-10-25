<?php

$image =$_POST['image'];
$file_arr = explode(';',$image);
$ext = explode('/',$file_arr[0]);
$ext = $ext[1];
$fileName     = $imgName  = md5(microtime()).'.'.$ext;

$image = str_replace(array('data:image/png;base64,','data:image/jpg;base64,','data:image/jpeg;base64,','data:image/gif;base64,'),array('','','',''),$image);
$file = base64_decode($image);
file_put_contents('../images/'.$fileName, $file);
file_put_contents('../images/thumb/'.$fileName, $file);
//
echo 'images/thumb/'.$fileName;
