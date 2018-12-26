<?php 
header('Access-Control-Allow-Origin: *');
if(!empty($_POST['row'])) {
    $data = $_POST['row'];
    
    $fname = "clienti.csv";

    $file = fopen("documents/" .$fname, 'a');
    fwrite($file, $data ."\n");
    fclose($file);
}
?>
