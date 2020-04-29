<?php

class DB{

  private $host;
  private $db ;
  private $user;
  private $password;

  public function __construct(){
    $this->host = 'us-cdbr-iron-east-01.cleardb.net';
    $this->db = 'heroku_dae83681720043a';
    $this->user = 'bf5099f68ab322';
    $this->password = 'de3a59b7';
  }

  public function connection(){
    try{
      $conn = new PDO("mysql:host={$this->host};dbname={$this->db};", $this->user, $this->password);
      $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
      return $conn;
    }catch (PDOException $exception){
      exit($exception->getMessage());
    }
  }

  //Obtener parametros para updates
 function getParams($input) {
    $filterParams = [];
    foreach($input as $param => $value) {
      $filterParams[] = "$param=:$param";
    }
    return implode(", ", $filterParams);
	}

  //Asociar todos los parametros a un sql
	function bindAllValues($statement, $params)  {
		foreach($params as $param => $value)  {
				$statement->bindValue(':'.$param, $value);
		}
		return $statement;
  }

}