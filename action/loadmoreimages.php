<?php


$files = glob('../images/thumb/*');
$totalImages = count($files);
$offset = $_POST['offset'];
$limit  = $_POST['limit'];

$output = array_slice($files, $offset, $limit);
$images = [];
foreach($output as $o){
    $images[] = str_replace('../','',$o);
}
echo json_encode(['total'=>$totalImages,'photo'=>$images]);
exit;