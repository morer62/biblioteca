<?php
include_once("../src/libro.m.php");

$libroM = new Libro();

if ($_SERVER['REQUEST_METHOD'] == 'GET')
{
    if (isset($_GET['id']))
    {
      $data = $libroM->getOne($_GET['id']);
      header("HTTP/1.1 200 OK");
      echo json_encode($data);
      exit();
	  }
    else {
      $data = $libroM->getALL();
      header("HTTP/1.1 200 OK");
      echo json_encode($data);
      exit();
	}
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {

  if($_GET["put"] == "0"){
    $data = $libroM->postOne($_POST);
    header("HTTP/1.1 200 OK");
    echo json_encode($data);
  }else{
    $data = $libroM->updateOne($_POST, $_GET['id']);
    header("HTTP/1.1 200 OK");
    echo json_encode($data);
  }
  
  exit();
}

//Borrar
if ($_SERVER['REQUEST_METHOD'] == 'DELETE')  {
  $data = $libroM->deleteOne($_GET['id']);
  header("HTTP/1.1 200 OK");
  echo json_encode($data);
	exit();
}


//En caso de que ninguna de las opciones anteriores se haya ejecutado
header("HTTP/1.1 500 Bad Request");

?>