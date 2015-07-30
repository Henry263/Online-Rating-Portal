<?php

if (isset($_POST['action'])) {
    $action = $_POST['action'];
} else if (isset($_GET['action'])) {
    $action = $_GET['action'];
} else {
    $action = 'index_page';
}

if($action == 'index_page'){
    include('index.html');
}
?>