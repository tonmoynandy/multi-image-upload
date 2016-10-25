<?php

$image = $_POST['image'];
@unlink('../'.$image);
$image = str_replace('thumb/','',$image);
@unlink('../'.$image);